import { tracks, createState, audible, activateFound, toggle } from './beat-state.mjs';
const state = createState();
const symbols = { drums: '●', hats: '×', bass: '~', keys: '◇' };
let engine, running = false, starting = false, panelOpen = false, step = 0, generation = 0;
const dock = document.createElement('aside');
dock.className = 'beat-dock'; dock.hidden = true; dock.setAttribute('aria-label', 'Hidden beat controls');
dock.innerHTML = `<div class="beat-bar"><span class="beat-progress" role="status" aria-live="polite">Listen closely.</span><button data-beat="play">Pause</button><label class="beat-volume">Volume <input aria-label="Beat volume" type="range" min="-36" max="-6" step="1" value="-14"></label><meter class="beat-meter" min="0" max="1" value="0" aria-label="Audio output level"></meter><button data-beat="mixer" hidden aria-expanded="false" aria-controls="beat-mixer">Mixer</button><button data-beat="reset">Reset</button></div><section id="beat-mixer" hidden aria-label="Beat mixer"><div class="mixer-heading"><h2>You found the beat.</h2><span>84 BPM · synth sketch</span></div><div class="beat-tracks">${tracks.map(id => `<div class="beat-track" data-strip="${id}"><span class="track-symbol" aria-hidden="true">${symbols[id]}</span><h3>${id}</h3><button data-mute="${id}" aria-label="Mute ${id}" aria-pressed="false">Mute</button><button data-solo="${id}" aria-label="Solo ${id}" aria-pressed="false">Solo</button></div>`).join('')}</div><fieldset class="beat-effects"><legend>Master effects</legend><label>Filter <input aria-label="Filter cutoff" data-effect="filter" type="range" min="0" max="100" value="100"><output data-output="filter">Open</output></label><label>Delay <input aria-label="Delay amount" data-effect="delay" type="range" min="0" max="50" value="0"><output data-output="delay">0%</output></label><label>Drive <input aria-label="Distortion amount" data-effect="drive" type="range" min="0" max="40" value="0"><output data-output="drive">0%</output></label><button data-beat="bypass" aria-pressed="false">Bypass effects</button></fieldset><p class="mixer-note">A temporary synthesized beat. Try soloing a layer, then bringing the others back.</p></section>`;
document.body.append(dock);
const progress = dock.querySelector('.beat-progress');
function update() {
  document.querySelectorAll('[data-track]').forEach(button => {
    button.hidden = false;
    button.dataset.found = String(state.found.has(button.dataset.track));
    button.setAttribute('aria-pressed', String(state.found.has(button.dataset.track)));
  });
  for (const id of tracks) {
    dock.querySelector(`[data-mute="${id}"]`).setAttribute('aria-pressed', String(state.muted.has(id)));
    dock.querySelector(`[data-solo="${id}"]`).setAttribute('aria-pressed', String(state.solo.has(id)));
    dock.querySelector(`[data-strip="${id}"]`).dataset.audible = String(running && audible(state, id));
  }
  dock.querySelector('[data-beat="play"]').textContent = running ? 'Pause' : 'Play';
  dock.querySelector('[data-beat="mixer"]').hidden = !state.unlocked;
  dock.querySelector('[data-beat="mixer"]').setAttribute('aria-expanded', String(panelOpen));
  dock.querySelector('#beat-mixer').hidden = !panelOpen;
  document.body.classList.toggle('has-beat', !dock.hidden);
  if (!running) progress.textContent = state.unlocked ? 'Beat paused.' : `${state.found.size} / 4 found · paused`;
  else if (state.unlocked) progress.textContent = 'All four layers found.';
  else if (state.found.size > state.active.size) progress.textContent = `${state.found.size} / 4 found · joining next bar…`;
  else progress.textContent = `${state.found.size} / 4 playing · explore the pages`;
}
function mix(time) {
  if (!engine) return;
  for (const id of tracks) engine.gains[id].gain.setTargetAtTime(audible(state, id) ? 1 : 0, time, .012);
}
function initialize() {
  const T = window.Tone;
  if (!T) throw new Error('The audio library could not load. Reload and try again.');
  const transport = T.getTransport();
  transport.bpm.value = 84;
  const filter = new T.Filter(18000, 'lowpass');
  const drive = new T.Distortion({ distortion: .45, wet: 0, oversample: '2x' });
  const delay = new T.FeedbackDelay({ delayTime: '8n.', feedback: .28, wet: 0 });
  const limiter = new T.Limiter(-3);
  const master = new T.Volume(-14).toDestination();
  const bus = new T.Gain(1);
  const processed = new T.Gain(1), dry = new T.Gain(0);
  bus.chain(filter, drive, delay, processed, limiter, master);
  bus.chain(dry, limiter);
  const meter = new T.Meter({ normalRange: true, smoothing: .75 });
  master.connect(meter);
  const meterTimer = setInterval(() => { dock.querySelector('.beat-meter').value = running ? meter.getValue() : 0; }, 100);
  const gains = Object.fromEntries(tracks.map(id => [id, new T.Gain(0).connect(bus)]));
  const kick = new T.MembraneSynth({ pitchDecay: .035, octaves: 5, envelope: { attack: .001, decay: .25, sustain: 0, release: .08 }, volume: -8 }).connect(gains.drums);
  const snare = new T.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: .001, decay: .12, sustain: 0, release: .03 }, volume: -16 }).connect(gains.drums);
  const hatFilter = new T.Filter(7000, 'highpass').connect(gains.hats);
  const hat = new T.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: .001, decay: .025, sustain: 0, release: .01 }, volume: -24 }).connect(hatFilter);
  const bass = new T.MonoSynth({ oscillator: { type: 'triangle' }, filter: { Q: 1, type: 'lowpass', rolloff: -24 }, envelope: { attack: .008, decay: .16, sustain: .25, release: .1 }, filterEnvelope: { attack: .001, decay: .2, sustain: .1, release: .1, baseFrequency: 110, octaves: 2 }, volume: -15 }).connect(gains.bass);
  const keys = new T.PolySynth(T.Synth, { oscillator: { type: 'sine' }, envelope: { attack: .015, decay: .4, sustain: .12, release: .45 }, volume: -23 }).connect(gains.keys);
  engine = { T, transport, gains, kick, snare, hat, bass, keys, filter, drive, delay, master, processed, dry };
  const sequenceId = transport.scheduleRepeat(time => {
    if (step % 16 === 0) {
      // Audio changes at scheduled time; the reveal follows the audible boundary.
      const snapshot = new Set(state.found);
      for (const id of tracks) {
        if (snapshot.has(id) && !state.active.has(id)) gains[id].gain.setTargetAtTime(1, time, .012);
      }
      const token = generation;
      T.getDraw().schedule(() => {
        if (!running || token !== generation) return;
        const currentFound = state.found;
        state.found = snapshot;
        const reveal = activateFound(state);
        state.found = currentFound;
        if (reveal) panelOpen = true;
        update();
      }, time);
    }
    const s = step % 32;
    if ([0, 6, 10, 16, 22, 27].includes(s)) kick.triggerAttackRelease('C1', '16n', time, s % 16 === 0 ? .95 : .7);
    if ([4, 12, 20, 28].includes(s)) snare.triggerAttackRelease('16n', time, .8);
    if (s % 2 === 0 || s === 15 || s === 31) hat.triggerAttackRelease('32n', time + (s % 4 === 2 ? .025 : 0), s % 4 === 0 ? .7 : .4);
    const notes = { 0: 'D2', 6: 'D2', 10: 'A1', 14: 'C2', 16: 'Bb1', 22: 'F2', 26: 'A1', 30: 'C2' };
    if (notes[s]) bass.triggerAttackRelease(notes[s], '8n', time, .8);
    if (s === 2) keys.triggerAttackRelease(['D3', 'F3', 'A3', 'C4'], '4n.', time, .65);
    if (s === 18) keys.triggerAttackRelease(['Bb2', 'D3', 'F3', 'A3'], '4n.', time, .65);
    step++;
  }, '16n');
  const context = T.getContext().rawContext;
  const onContextChange = () => { if (context.state !== 'running' && running) pause(); };
  context.addEventListener('statechange', onContextChange);
  engine.dispose = () => {
    transport.stop(); transport.clear(sequenceId); clearInterval(meterTimer);
    context.removeEventListener('statechange', onContextChange);
    for (const node of [kick, snare, hat, bass, keys, hatFilter, ...Object.values(gains), bus, processed, dry, filter, drive, delay, limiter, master, meter]) node.dispose();
    dock.querySelector('.beat-meter').value = 0;
  };
}
async function play() {
  if (!engine) initialize();
  const startingEngine = engine;
  await startingEngine.T.start();
  if (engine !== startingEngine || running || !state.found.size) return;
  running = true; generation++;
  engine.transport.start('+0.08');
  mix(engine.T.now()); update();
}
function pause() {
  if (!engine) return;
  running = false; generation++;
  engine.transport.pause();
  // Ramp the final output down, including delay tails.
  engine.master.volume.rampTo(-Infinity, .04);
  update();
}
async function safePlay() {
  if (starting) return;
  starting = true;
  try {
    await play();
    if (engine && running) engine.master.volume.rampTo(Number(dock.querySelector('[aria-label="Beat volume"]').value), .05);
  } catch (error) {
    running = false; update(); progress.textContent = `Audio unavailable. ${error.message}`;
  } finally { starting = false; }
}
function effects() {
  const bypass = dock.querySelector('[data-beat="bypass"]').getAttribute('aria-pressed') === 'true';
  const values = Object.fromEntries([...dock.querySelectorAll('[data-effect]')].map(input => [input.dataset.effect, Number(input.value)]));
  const cutoff = 180 * Math.pow(100, values.filter / 100);
  dock.querySelector('[data-output="filter"]').textContent = values.filter === 100 ? 'Open' : `${Math.round(cutoff)} Hz`;
  for (const id of ['delay', 'drive']) dock.querySelector(`[data-output="${id}"]`).textContent = `${values[id]}%`;
  if (!engine) return;
  engine.processed.gain.rampTo(bypass ? 0 : 1, .03);
  engine.dry.gain.rampTo(bypass ? 1 : 0, .03);
  engine.filter.frequency.rampTo(cutoff, .06);
  engine.delay.wet.rampTo(values.delay / 100, .06);
  engine.drive.wet.rampTo(values.drive / 100, .06);
}
document.addEventListener('click', async event => {
  const trigger = event.target.closest('[data-track]');
  if (trigger) {
    if (!tracks.includes(trigger.dataset.track)) return;
    state.found.add(trigger.dataset.track); dock.hidden = false; update(); await safePlay(); return;
  }
  const button = event.target.closest('.beat-dock button');
  if (!button) return;
  if (button.dataset.mute) toggle(state.muted, button.dataset.mute);
  if (button.dataset.solo) toggle(state.solo, button.dataset.solo);
  if (button.dataset.mute || button.dataset.solo) { mix(engine.T.now()); update(); return; }
  switch (button.dataset.beat) {
    case 'play': if (running) pause(); else await safePlay(); break;
    case 'mixer': panelOpen = !panelOpen; update(); break;
    case 'bypass': button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true')); effects(); break;
    case 'reset': {
      pause(); engine?.dispose(); engine = undefined; step = 0;
      Object.assign(state, createState()); panelOpen = false;
      dock.querySelector('[data-effect="filter"]').value = 100;
      dock.querySelector('[data-effect="delay"]').value = 0;
      dock.querySelector('[data-effect="drive"]').value = 0;
      dock.querySelector('[data-beat="bypass"]').setAttribute('aria-pressed', 'false'); effects();
      update(); progress.textContent = 'Reset. Find the four sounds again.';
      break;
    }
  }
});
dock.addEventListener('input', event => {
  if (event.target.matches('[data-effect]')) effects();
  else if (event.target.matches('[aria-label="Beat volume"]') && engine && running) engine.master.volume.rampTo(Number(event.target.value), .04);
});
// Keep a single engine across the two root-site pages, never intercept child projects.
let navigation = 0;
async function navigate(url, push = true) {
  const ticket = ++navigation;
  try {
    const response = await fetch(url.pathname);
    if (!response.ok) throw new Error('Page unavailable');
    const page = new DOMParser().parseFromString(await response.text(), 'text/html');
    if (ticket !== navigation) return;
    const main = page.querySelector('main');
    if (!main) throw new Error('Page unavailable');
    document.querySelector('main').replaceWith(main);
    document.title = page.title;
    document.querySelector('link[rel="canonical"]').href = page.querySelector('link[rel="canonical"]').href;
    if (push) history.pushState({}, '', url);
    document.querySelectorAll('.header nav a').forEach(link => {
      if (url.pathname === '/downloads/' && link.getAttribute('href') === '/downloads/') link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.dispatchEvent(new Event('site:navigated'));
    update();
    const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : main;
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); target.scrollIntoView({ behavior: 'instant' }); }
  } catch { if (ticket === navigation) location.href = url.href; }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin || !['/', '/downloads/'].includes(url.pathname) || url.pathname === location.pathname) return;
  event.preventDefault(); navigate(url);
});
window.addEventListener('popstate', () => navigate(new URL(location.href), false));
window.addEventListener('pagehide', pause);
document.addEventListener('site:navigated', update);
update();
