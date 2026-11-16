import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const source = readFileSync('public/assets/theme.js','utf8');
function setup(saved, dark = false, blocked = false) {
  const events = {}, handlers = {}, store = new Map(saved ? [['piducan-theme',saved]] : []);
  const root = {dataset:{}}, meta = {}, select = {value:'',addEventListener:(name,fn)=>handlers[name]=fn};
  const control = {hidden:true,querySelector:()=>select};
  const media = {matches:dark,addEventListener:(_,fn)=>events.system=fn};
  runInNewContext(source, {window:{matchMedia:()=>media,addEventListener:(name,fn)=>events[name]=fn},document:{documentElement:root,querySelector:s=>s.startsWith('meta')?meta:s.includes('select')?select:control,addEventListener:(_,fn)=>events.ready=fn},localStorage:{getItem:k=>{if(blocked)throw Error();return store.get(k)},setItem:(k,v)=>{if(blocked)throw Error();store.set(k,v)},removeItem:k=>store.delete(k)}});
  events.ready();
  return {root,meta,select,media,events,store,choose:value=>{select.value=value;handlers.change()}};
}
test('system follows OS changes; explicit preference overrides until reset',()=>{
 const t=setup(null,true);assert.equal(t.root.dataset.theme,'dark');
 t.choose('light');assert.equal(t.root.dataset.theme,'light');assert.equal(t.store.get('piducan-theme'),'light');
 t.events.system();assert.equal(t.root.dataset.theme,'light');
 t.choose('system');assert.equal(t.store.size,0);assert.equal(t.root.dataset.theme,'dark');
 t.media.matches=false;t.events.system();assert.equal(t.root.dataset.theme,'light');
});
test('saved preference applies before controls initialize and synchronizes tabs',()=>{
 const t=setup('dark',false);assert.equal(t.root.dataset.theme,'dark');assert.equal(t.select.value,'dark');
 t.events.storage({key:'piducan-theme',newValue:'light'});assert.equal(t.root.dataset.theme,'light');assert.equal(t.select.value,'light');
});
test('invalid preferences and blocked storage remain usable',()=>{
 assert.equal(setup('invalid',true).root.dataset.theme,'dark');
 const t=setup(null,false,true);t.choose('dark');assert.equal(t.root.dataset.theme,'dark');
});
