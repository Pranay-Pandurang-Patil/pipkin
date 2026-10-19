// Procedural, pivot-based animation rig for the assembled Pipkin (STL parts have no skeleton — this is NOT a skinned rig).
// Pivots are derived from the real geometry (assembled space, Z up, front = -Y, left = +X):
//   hip = centroid of the body's lowest slab, neck = head's lowest slab, shoulders = arms' highest slab.
// Hierarchy:  root ─ legs (planted) ─ torso@hip ─ body, neck@neck ─ head/eyes/nose, shoulderL/R@shoulder ─ arms
import * as THREE from 'three';
import gsap from 'gsap';
import { PARTS } from '../../data/pipkinAssembly.js';

const V = new THREE.Vector3();
function slabCentroid(geo, part, top, thick = 3.5) {
  const m = new THREE.Matrix4().compose(new THREE.Vector3(...part.asm), new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rot)), new THREE.Vector3(1, 1, 1));
  const a = geo.attributes.position, n = a.count, xyz = new Float32Array(n * 3); let ext = top ? -Infinity : Infinity;
  for (let i = 0; i < n; i++) { V.fromBufferAttribute(a, i).applyMatrix4(m); xyz.set([V.x, V.y, V.z], i * 3); ext = top ? Math.max(ext, V.z) : Math.min(ext, V.z); }
  const c = new THREE.Vector3(); let k = 0;
  for (let i = 0; i < n; i++) if (Math.abs(xyz[i * 3 + 2] - ext) <= thick) { c.x += xyz[i * 3]; c.y += xyz[i * 3 + 1]; c.z += xyz[i * 3 + 2]; k++; }
  return c.divideScalar(k || 1);
}

export function createPipkinRig(geos, { onSparkle } = {}) {
  const idx = id => PARTS.findIndex(p => p.id === id), P = id => PARTS[idx(id)], G = id => geos[idx(id)];
  const mats = [], root = new THREE.Group();
  const mesh = (id, pivot) => { const m = new THREE.Mesh(G(id), new THREE.MeshStandardMaterial({ color: P(id).color, roughness: 0.5 })); mats.push(m.material);
    m.rotation.set(...P(id).rot); m.position.set(...P(id).asm).sub(pivot); return m; };
  const at = (parent, world, parentWorld) => { const g = new THREE.Group(); g.position.copy(world).sub(parentWorld); parent.add(g); return g; };

  const hip = slabCentroid(G('body'), P('body'), false), neckW = slabCentroid(G('head'), P('head'), false),
    shLW = slabCentroid(G('armL'), P('armL'), true), shRW = slabCentroid(G('armR'), P('armR'), true), ORIGIN = new THREE.Vector3();
  ['legL', 'legR'].forEach(id => root.add(mesh(id, ORIGIN)));                       // legs stay planted
  const torso = at(root, hip, ORIGIN); torso.add(mesh('body', hip));
  const neck = at(torso, neckW, hip); ['head', 'eyeL', 'eyeR', 'nose'].forEach(id => neck.add(mesh(id, neckW)));
  const shL = at(torso, shLW, hip); shL.add(mesh('armL', shLW));
  const shR = at(torso, shRW, hip); shR.add(mesh('armR', shRW));
  const hipPos = hip.clone(), rots = [neck.rotation, shL.rotation, shR.rotation, torso.rotation];

  // collection sparkle (small Points burst in front of the feet)
  const N = 18, sp = new Float32Array(N * 3), seeds = Array.from({ length: N }, () => [Math.random() * 6.28, 8 + Math.random() * 16, 10 + Math.random() * 25]);
  const cv = document.createElement('canvas'); cv.width = cv.height = 32; const cx = cv.getContext('2d'), gr = cx.createRadialGradient(16, 16, 1, 16, 16, 16);
  gr.addColorStop(0, 'rgba(255,240,150,1)'); gr.addColorStop(1, 'rgba(255,200,60,0)'); cx.fillStyle = gr; cx.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(cv), pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const pm = new THREE.PointsMaterial({ map: tex, size: 9, transparent: true, depthWrite: false, opacity: 0 }), pts = new THREE.Points(pg, pm); pts.frustumCulled = false; root.add(pts);
  const prog = { v: 0 };
  function sparkle() { gsap.killTweensOf(prog); gsap.fromTo(prog, { v: 0 }, { v: 1, duration: 1, ease: 'power2.out',
    onUpdate() { seeds.forEach(([a, r, h], i) => { sp[i * 3] = Math.cos(a) * r * prog.v; sp[i * 3 + 1] = -48 + Math.sin(a) * r * prog.v * .6; sp[i * 3 + 2] = 22 + h * prog.v; }); pg.attributes.position.needsUpdate = true; pm.opacity = 1 - prog.v * prog.v; },
    onComplete() { pm.opacity = 0; } }); }

  const restTL = d => gsap.timeline().to(rots, { x: 0, y: 0, z: 0, duration: d, ease: 'power2.inOut' }, 0).to(torso.position, { x: hipPos.x, y: hipPos.y, z: hipPos.z, duration: d, ease: 'power2.inOut' }, 0);
  const snap = () => { rots.forEach(r => r.set(0, 0, 0)); torso.position.copy(hipPos); }; // exact canonical pose
  const S = 'sine.inOut';
  const EMOTES = {
    wave() { const t = gsap.timeline();   // left arm (+X) raised up-and-out about its shoulder (angles chosen so the arm clears the head by >=3 mm, measured on the STLs)
      t.to(shL.rotation, { y: -1.45, duration: .55, ease: 'power2.out' }, 0)
       .to(shL.rotation, { y: -1.7, duration: .2, ease: S, repeat: 5, yoyo: true }, .55).add(restTL(.6), '+=.1'); return t; },
    nod() { const t = gsap.timeline(); t.to(neck.rotation, { x: .3, duration: .3, ease: S, repeat: 5, yoyo: true }).add(restTL(.4), '+=.1'); return t; },
    dance() { const t = gsap.timeline(), B = .5;
      t.to(torso.position, { z: hipPos.z + 2.5, duration: B / 2, ease: 'sine.out', repeat: 15, yoyo: true }, 0)
       .to(torso.rotation, { y: .05, duration: B, ease: S, repeat: 7, yoyo: true }, 0)
       .to(neck.rotation, { y: .12, x: .06, duration: B, ease: S, repeat: 7, yoyo: true }, 0);
      for (let i = 0; i < 8; i++) t.to(i % 2 ? shR.rotation : shL.rotation, { y: i % 2 ? 1.2 : -1.2, duration: B / 2, ease: S, repeat: 1, yoyo: true }, i * B);
      t.add(restTL(.5), '+=.05'); return t; },
    collect() { const t = gsap.timeline();
      t.to(neck.rotation, { x: .45, duration: .5, ease: 'power2.out' }, 0).to(shR.rotation, { x: -.8, duration: .5, ease: 'power2.out' }, 0).to(torso.rotation, { x: .05, duration: .5, ease: S }, 0)
       .call(() => onSparkle?.(), null, .55).call(sparkle, null, .55).to(shR.rotation, { x: -.5, duration: .2, ease: S, repeat: 1, yoyo: true }, .55)
       .add(restTL(.6), 1.5); return t; },
    explore() { const t = gsap.timeline();
      t.to(neck.rotation, { z: .55, y: .15, duration: .6, ease: 'power2.out' }, 0).to(torso.rotation, { y: .05, duration: .6, ease: S }, 0).to(torso.position, { x: hipPos.x + .8, duration: .6, ease: S }, 0).to(shL.rotation, { x: -.35, duration: .5, ease: S }, .2)
       .to(neck.rotation, { z: -.55, y: -.15, duration: .9, ease: S }, 1.2).to(torso.rotation, { y: -.05, duration: .9, ease: S }, 1.2).to(torso.position, { x: hipPos.x - .8, duration: .9, ease: S }, 1.2)
       .to(shL.rotation, { x: 0, duration: .4, ease: S }, 1.2).to(shR.rotation, { x: -.35, duration: .5, ease: S }, 1.4).add(restTL(.7), '+=.4'); return t; },
  };
  let tl = null;
  return {
    root, pivots: { hip, neck: neckW, shoulderL: shLW, shoulderR: shRW },
    play(name) { if (!EMOTES[name]) return false; tl?.kill();   // cancel current emote; ease from the current pose back to rest, then play the new one
      tl = gsap.timeline({ onComplete: () => { snap(); tl = null; } }); tl.add(restTL(.25)).add(EMOTES[name]()); return true; },
    dispose() { tl?.kill(); gsap.killTweensOf([...rots, torso.position, prog]); mats.forEach(m => m.dispose()); pg.dispose(); pm.dispose(); tex.dispose(); }, // geometries are shared & cached
  };
}
