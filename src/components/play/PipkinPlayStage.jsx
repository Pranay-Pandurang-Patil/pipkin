import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as THREE from 'three';
import { SCALE } from '../../data/pipkinAssembly.js';
import { ASSETS } from '../../data/assets';
import { loadPipkinGeometries } from '../build/pipkinGeometry.js';
import { createPipkinRig } from './pipkinRig.js';

const MODEL_H = 143, CENTER_Z = 77;
/** Real 3D Pipkin for the Play stage. Call ref.play('wave'|'nod'|'dance'|'collect'|'explore'). */
const PipkinPlayStage = forwardRef(function PipkinPlayStage(_, ref) {
  const wrap = useRef(null), rigRef = useRef(null);
  const [status, setStatus] = useState('loading');
  useImperativeHandle(ref, () => ({ play: n => rigRef.current?.play(n) ?? false }), []);

  useEffect(() => {
    let disposed = false, renderer, raf = 0, visible = false, ro, io, camera, scene, started = false;
    const mount = wrap.current;
    try { const c = document.createElement('canvas'); if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw 0; } catch { setStatus('error'); return; }

    function init() {
      if (started || disposed) return; started = true;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); mount.appendChild(renderer.domElement);
      scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
      scene.add(new THREE.HemisphereLight(0xfff1f2, 0xbfe3c8, 1.3));
      const key = new THREE.DirectionalLight(0xffe4d0, 2.2); key.position.set(3, 5, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0xf9a8d4, 1.2); rim.position.set(-4, 2, -3); scene.add(rim);
      const resize = () => { const w = mount.clientWidth || 1, h = mount.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h;
        const tanH = Math.tan(THREE.MathUtils.degToRad(17)); camera.position.set(0, 0, Math.max((MODEL_H * SCALE / 0.86) / (2 * tanH), 1.7 / (2 * tanH * camera.aspect))); camera.updateProjectionMatrix(); };
      ro = new ResizeObserver(resize); ro.observe(mount); resize();
      loadPipkinGeometries().then(geos => {
        if (disposed) return;
        const rig = createPipkinRig(geos); rigRef.current = rig;
        rig.root.rotation.x = -Math.PI / 2; rig.root.scale.setScalar(SCALE); rig.root.position.y = -CENTER_Z * SCALE; scene.add(rig.root); setStatus('ready');
      }).catch(() => !disposed && setStatus('error'));
      const tick = () => { raf = 0; if (disposed || !visible) return; renderer.render(scene, camera); raf = requestAnimationFrame(tick); };
      io2 = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(tick); }); io2.observe(mount);
    }
    let io2;
    io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { init(); io.disconnect(); } }, { rootMargin: '100% 0px' }); io.observe(mount);
    return () => { disposed = true; io.disconnect(); io2?.disconnect(); ro?.disconnect(); cancelAnimationFrame(raf); rigRef.current?.dispose(); rigRef.current = null;
      if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } };
  }, []);

  return (
    <div className="play-stage-3d">
      <div ref={wrap} className="play-stage-mount" role="img" aria-label="3D Pipkin reacting to the selected emote" />
      {status === 'loading' && <div className="play-stage-note" role="status">Gathering Pipkin…</div>}
      {status === 'error' && <img src={ASSETS.play} alt="Pipkin reacting playfully" className="play-character-img" />}
    </div>
  );
});
export default PipkinPlayStage;
