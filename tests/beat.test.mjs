import test from 'node:test';
import assert from 'node:assert/strict';
import { tracks, createState, activateFound, audible, toggle } from '../public/assets/beat-state.mjs';
test('discovery is pending until a bar boundary, and unlock happens only once', () => {
  const s = createState();
  tracks.forEach(id => s.found.add(id));
  assert.equal(s.unlocked, false);
  assert.equal(audible(s, 'drums'), false);
  assert.equal(activateFound(s), true);
  assert.equal(audible(s, 'drums'), true);
  assert.equal(activateFound(s), false);
});
test('multiple solos combine, mute wins, and removing solos restores other tracks', () => {
  const s = createState(); tracks.forEach(id => s.found.add(id)); activateFound(s);
  toggle(s.solo, 'drums'); toggle(s.solo, 'bass');
  assert.deepEqual(tracks.filter(id => audible(s, id)), ['drums','bass']);
  toggle(s.muted, 'bass'); assert.deepEqual(tracks.filter(id => audible(s, id)), ['drums']);
  toggle(s.solo, 'drums'); toggle(s.solo, 'bass');
  assert.deepEqual(tracks.filter(id => audible(s, id)), ['drums','hats','keys']);
});
test('reset clears discovery, mixing state, and unlock', () => {
  const s = createState(); tracks.forEach(id => s.found.add(id)); activateFound(s); s.solo.add('keys');
  Object.assign(s, createState());
  assert.equal(s.unlocked, false); assert.equal(s.solo.size, 0); assert.equal(s.found.size, 0);
});
