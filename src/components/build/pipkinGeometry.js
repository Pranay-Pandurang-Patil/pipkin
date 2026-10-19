// Loads the nine Pipkin STL geometries once and shares them (Build assembly + Play emotes). Geometries are centred.
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { PARTS, MODEL_BASE } from '../../data/pipkinAssembly.js';
let cache = null;
export function loadPipkinGeometries(onProgress) {
  if (cache) return cache.then(g => { onProgress?.(1); return g; });
  const loader = new STLLoader(), frac = PARTS.map(() => 0);
  cache = Promise.all(PARTS.map((p, i) => loader.loadAsync(MODEL_BASE + p.file, ev => {
    if (ev.lengthComputable) { frac[i] = ev.loaded / ev.total; onProgress?.(frac.reduce((a, b) => a + b, 0) / frac.length); } })))
    .then(gs => { gs.forEach(g => g.center()); return gs; })
    .catch(e => { cache = null; throw e; });
  return cache;
}
