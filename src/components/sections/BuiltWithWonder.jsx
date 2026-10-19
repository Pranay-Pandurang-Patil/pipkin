import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronsDown } from 'lucide-react';
import { ASSETS } from '../../data/assets';
import { CAPTIONS } from '../../data/pipkinAssembly';
import { createPipkinAssembly, webglAvailable } from '../build/pipkinScene';

/** "Built with Wonder": the pinned section IS the 3D stage — Pipkin assembles from the real STL parts as the user scrolls. */
export default function BuiltWithWonder() {
  const sectionRef = useRef(null), stageRef = useRef(null), mountRef = useRef(null), barRef = useRef(null), capsRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [progress, setProgress] = useState(0);
  const [reduced] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!webglAvailable()) { setStatus('error'); return; }
    const api = createPipkinAssembly({
      section: sectionRef.current, stage: stageRef.current, mount: mountRef.current, bar: barRef.current,
      captions: Array.from(capsRef.current.querySelectorAll('.build-cap')),
      onProgress: p => setProgress(Math.round(p * 100)), onReady: () => setStatus('ready'), onError: () => setStatus('error'),
    });
    // lazy: only fetch the ~15 MB of STLs when the section is within ~1.5 screens
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { api.startLoading(); io.disconnect(); } }, { rootMargin: '150% 0px' });
    io.observe(sectionRef.current);
    return () => { io.disconnect(); api.dispose(); };
  }, []);

  return (
    <section id="build" ref={sectionRef} className="section-build-full" aria-labelledby="build-heading">
      <div id="wonder" style={{ position: 'absolute', top: 0, left: 0 }} />
      <div ref={stageRef} className="build-stage">
        <div className="build-glow build-glow-peach" /><div className="build-glow build-glow-violet" />
        <div ref={mountRef} className="build-canvas-mount" role="img" aria-label="3D model of Pipkin assembling from separate parts as you scroll" />

        <div className="build-copy">
          <div className="build-badge"><Sparkles size={14} /><span>01 — Concept &amp; Assembly</span></div>
          <h2 id="build-heading" className="build-title">Built with Wonder</h2>
          <p className="build-lead">Pipkin comes together piece by piece — a blend of creativity, curiosity and a love for detail.</p>
          <div ref={capsRef} className="build-caps" aria-live="polite">
            {CAPTIONS.map((c, i) => <p key={i} className="build-cap" style={{ opacity: reduced ? (i === CAPTIONS.length - 1 ? 1 : 0) : i === 0 ? 0 : 0 }}>{c}</p>)}
          </div>
        </div>

        {status === 'loading' && <div className="build-status" role="status">Gathering Pipkin’s pieces… {progress}%</div>}
        {status === 'error' && (
          <div className="build-status build-fallback" role="status">
            <img src={ASSETS.character} alt="Illustration of Pipkin" />
            <p>The 3D model couldn’t load here — Pipkin is shown as an illustration instead.</p>
          </div>
        )}
        {!reduced && status === 'ready' && <div className="build-scroll-hint" aria-hidden="true"><ChevronsDown size={16} /> Scroll to assemble</div>}
        {!reduced && <div className="build-progress" aria-hidden="true"><div ref={barRef} className="build-progress-fill" /></div>}
      </div>

      <style>{`
        .section-build-full{position:relative;background:#080d1a;color:#f8fafc;width:100%}
        .build-stage{position:relative;width:100%;height:100vh;height:100svh;overflow:hidden;background:#080d1a}
        .build-glow{position:absolute;width:560px;height:560px;border-radius:50%;pointer-events:none}
        .build-glow-peach{top:12%;right:8%;background:radial-gradient(circle,rgba(255,181,155,.16) 0%,rgba(8,13,26,0) 70%)}
        .build-glow-violet{bottom:-10%;left:-6%;background:radial-gradient(circle,rgba(129,140,248,.14) 0%,rgba(8,13,26,0) 70%)}
        .build-canvas-mount{position:absolute;inset:0;touch-action:pan-y}.build-canvas-mount canvas{display:block;width:100%;height:100%}
        .build-copy{position:absolute;z-index:2;left:max(4vw,1.5rem);top:50%;transform:translateY(-50%);max-width:min(420px,42vw);display:flex;flex-direction:column;gap:1.1rem;pointer-events:none}
        .build-badge{display:inline-flex;align-items:center;gap:.5rem;width:fit-content;padding:.4rem 1rem;border-radius:var(--border-radius-pill);background:rgba(255,181,155,.12);border:1px solid rgba(255,181,155,.3);color:#ffedd5;font-size:.82rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
        .build-title{font-family:var(--font-serif);font-size:clamp(2.4rem,4.5vw,4rem);font-weight:800;color:#fff;line-height:1.1}
        .build-lead{font-size:1.15rem;line-height:1.6;color:#fbcfe8;font-weight:500}
        .build-caps{position:relative;min-height:3.4rem;margin-top:.6rem}
        .build-cap{position:absolute;inset:0 0 auto;margin:0;font-family:var(--font-hand);font-size:clamp(1.5rem,2.4vw,2.1rem);color:#fde68a;line-height:1.2}
        .build-status{position:absolute;inset:0;z-index:3;display:grid;place-items:center;align-content:center;gap:1rem;text-align:center;color:#fbcfe8;font-family:var(--font-hand);font-size:1.6rem;pointer-events:none}
        .build-fallback img{width:min(320px,60vw)}.build-fallback p{font-size:1.1rem;font-family:var(--font-sans);color:#94a3b8;margin:0}
        .build-scroll-hint{position:absolute;z-index:2;bottom:2.2rem;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:.4rem;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;pointer-events:none}
        .build-progress{position:absolute;z-index:2;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.08)}
        .build-progress-fill{height:100%;background:linear-gradient(90deg,#fb923c,#ec4899);transform:scaleX(0);transform-origin:left}
        @media(max-width:899px){
          .build-copy{left:0;right:0;top:5.5rem;transform:none;max-width:none;padding:0 1.5rem;text-align:center;align-items:center;gap:.7rem}
          .build-lead{font-size:1rem;display:none}.build-caps{position:absolute;top:calc(100svh - 11rem);left:1.5rem;right:1.5rem;margin:0;text-align:center}
          .build-scroll-hint{bottom:1.2rem}
        }
        @media(prefers-reduced-motion:reduce){.build-stage{height:auto;min-height:100svh;display:block}.build-canvas-mount{height:100svh}}
      `}</style>
    </section>
  );
}
