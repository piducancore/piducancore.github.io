export const tracks = ['drums', 'hats', 'bass', 'keys'];
export function createState() {
  return { found: new Set(), active: new Set(), muted: new Set(), solo: new Set(), unlocked: false };
}
export function audible(state, id) {
  return state.active.has(id) && !state.muted.has(id) && (!state.solo.size || state.solo.has(id));
}
export function activateFound(state) {
  state.active = new Set(state.found);
  const newlyUnlocked = !state.unlocked && tracks.every(id => state.active.has(id));
  if (newlyUnlocked) state.unlocked = true;
  return newlyUnlocked;
}
export function toggle(set, id) { if (set.has(id)) set.delete(id); else set.add(id); }
