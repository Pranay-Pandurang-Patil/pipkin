// Vanilla Three.js + GSAP assembly of the real Pipkin STL parts (config: src/data/pipkinAssembly.js).
import * as THREE from 'three';
import { loadPipkinGeometries } from './pipkinGeometry.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARTS, SCALE, MODEL_BASE, TOTAL, CAPTION_AT } from '../../data/pipkinAssembly.js';
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true }); // stable pin height when mobile browser bars show/hide

const MODEL_H = 143, CENTER_Z = 77; // mm: feet at z≈5, head top ≈148 (measured from the STLs)

export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

/** Creates renderer + pinned ScrollTrigger immediately; call startLoading() to fetch the STLs. Returns { startLoading, dispose }. */
export function createPipkinAssembly({ section, stage, mount, captions, bar, onProgress, onReady, onError }) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  mount.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  scene.add(new THREE.HemisphereLight(0xfff1f2, 0x4338ca, 1.1));
  const key = new THREE.DirectionalLight(0xffd1dc, 2.2); key.position.set(3, 5, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x818cf8, 1.6); rim.position.set(-4, 2, -3); scene.add(rim);

  const yaw = new THREE.Group(), root = new THREE.Group(); // yaw = pointer tilt; root = Z-up STL space -> Y-up scene
  root.rotation.x = -Math.PI / 2; root.scale.setScalar(SCALE); root.position.y = -CENTER_Z * SCALE; yaw.add(root); scene.add(yaw);

  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const rg = g.createRadialGradient(32, 32, 2, 32, 32, 32); rg.addColorStop(0, 'rgba(0,0,0,.5)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
  const shadowTex = new THREE.CanvasTexture(c);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.15, 32), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = (-CENTER_Z + 5.3) * SCALE; scene.add(shadow); // sits under the feet

  function resize() {
    const w = mount.clientWidth || 1, h = mount.clientHeight || 1, aspect = w / h, wide = w >= 900;
    renderer.setSize(w, h, false); camera.aspect = aspect;
    const fill = wide ? 0.8 : 0.62, tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dH = (MODEL_H * SCALE / fill) / (2 * tanH), dW = (1.6 / 0.92) / (2 * tanH * aspect); // fit height, and the arm span in portrait
    const d = Math.max(dH, dW); camera.position.set(0, 0, d); camera.updateProjectionMatrix();
    const visH = 2 * d * tanH, visW = visH * aspect;
    yaw.position.set(wide ? visW * 0.2 : 0, wide ? 0 : -visH * 0.09, 0); shadow.position.set(yaw.position.x, (-CENTER_Z + 5.3) * SCALE + yaw.position.y, 0);
  }
  const ro = new ResizeObserver(resize); ro.observe(mount); resize();

  // visibility-gated render loop (no per-frame React state)
  let visible = false, raf = 0, disposed = false, assembled = false, tx = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !disposed) raf = requestAnimationFrame(tick); }, { rootMargin: '10%' }); io.observe(stage);
  const onMove = e => { const r = stage.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; };
  stage.addEventListener('pointermove', onMove);
  const clock = new THREE.Clock();
  function tick() {
    raf = 0; if (disposed || !visible) return;
    yaw.rotation.y += (THREE.MathUtils.clamp(tx, -1, 1) * 0.35 - yaw.rotation.y) * 0.08;
    renderer.render(scene, camera); raf = requestAnimationFrame(tick);
  }

  // master timeline: ScrollTrigger is created immediately so pin spacing never shifts after loading
  const meshes = {}, geos = [], mats = [];
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ paused: reduce, scrollTrigger: reduce ? undefined : { trigger: section, start: 'top top', end: () => `+=${innerWidth < 768 ? 220 : 320}%`, pin: stage, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: s => { bar.style.transform = `scaleX(${s.progress})`; } } });
    tl.to({}, { duration: TOTAL }, 0); // fixes total length so late-added tweens don't change scroll mapping
    stage._tl = tl;
    if (!reduce) captions.forEach((el, i) => { tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, CAPTION_AT[i]); if (i < captions.length - 1) tl.to(el, { opacity: 0, duration: 0.3 }, CAPTION_AT[i + 1] - 0.3); });
  }, section);

  function addParts(loaded) {
    PARTS.forEach((p, i) => {
      const geo = loaded[i]; geo.center(); geos.push(geo);
      const mat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.5 }); mats.push(mat);
      const m = new THREE.Mesh(geo, mat); m.rotation.set(...p.rot); root.add(m); meshes[p.id] = m;
      if (reduce) { m.position.set(...p.asm); return; }
      m.position.set(p.asm[0] + p.off[0], p.asm[1] + p.off[1], p.asm[2] + p.off[2]); m.rotation.z = p.rot[2] + 0.9; // exploded start
    });
    if (!reduce) ctx.add(() => {
      const tl = stage._tl;
      PARTS.forEach(p => { const m = meshes[p.id];
        tl.fromTo(m.position, { x: p.asm[0] + p.off[0], y: p.asm[1] + p.off[1], z: p.asm[2] + p.off[2] }, { x: p.asm[0], y: p.asm[1], z: p.asm[2], duration: p.d, ease: 'power2.out', immediateRender: true }, p.t);
        tl.fromTo(m.rotation, { z: p.rot[2] + 0.9 }, { z: p.rot[2], duration: p.d, ease: 'power2.out', immediateRender: true }, p.t); });
    });
    assembled = true;
  }

  let started = false;
  function startLoading() {
    if (started || disposed) return; started = true;
    loadPipkinGeometries(onProgress)
      .then(loaded => { if (disposed) return; addParts(loaded); onProgress?.(1); onReady?.(); ScrollTrigger.refresh(); })
      .catch(err => { if (!disposed) onError?.(err); });
  }

  function dispose() {
    disposed = true; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); stage.removeEventListener('pointermove', onMove);
    ctx.revert(); // kills the timeline + pin and restores DOM
    mats.forEach(x => x.dispose()); shadow.geometry.dispose(); shadow.material.dispose(); shadowTex.dispose();
    renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
  }
  return { startLoading, dispose, isReduced: reduce };
}
