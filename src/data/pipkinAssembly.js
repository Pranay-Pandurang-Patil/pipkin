// ONE place to tune the assembly. Coordinates are in the STLs' own space (Z up, mm; pony faces -Y).
// "verified": centre measured from the STL itself and shares the body/head coordinate space.
// "estimated": limbs are exported at print-plate offsets, so their seat on the body is a best guess — tweak `asm`/`rot`.
export const SCALE = 0.016;
export const MODEL_BASE = '/models/pipkin/';
export const PARTS = [
  // t = start time on the master timeline, d = duration, off = how far the piece floats away (mm)
  {id:'body',  file:'TakaraStandardBody2.stl',   asm:[0,-3.5,62.5],     rot:[0,0,0], off:[0,0,-70],  t:0,   d:1.2, color:'#DCA5A5', status:'verified', cap:0},
  {id:'legL',  file:'TakaraLegLegtWithpegs.stl', asm:[12,-3.5,27.3],    rot:[0,0,0], off:[90,0,-40], t:1.4, d:1,   color:'#C7BCE5', status:'estimated', cap:1},
  {id:'legR',  file:'TakaraLegRightWithpegs.stl',asm:[-12,-3.5,27.3],   rot:[0,0,0], off:[-90,0,-40],t:1.6, d:1,   color:'#C7BCE5', status:'estimated', cap:1},
  {id:'armL',  file:'TakaraArmLeftWithpegs.stl', asm:[27,-3.5,68],      rot:[Math.PI/2,0,0], off:[100,0,30], t:2.8, d:1, color:'#B8C9AC', status:'estimated', cap:2},
  {id:'armR',  file:'TakaraArmRightWithpegs.stl',asm:[-27,-3.5,68],     rot:[Math.PI/2,0,0], off:[-100,0,30],t:3,   d:1, color:'#B8C9AC', status:'estimated', cap:2},
  {id:'head',  file:'Takaraponyhead2.stl',       asm:[0,-2.3,115],      rot:[0,0,0], off:[0,0,90],   t:4.4, d:1.2, color:'#FFF1DD', status:'verified', cap:3},
  {id:'eyeL',  file:'TakaraLeftEye2.stl',        asm:[24.1,-13.8,106.5],rot:[0,0,0], off:[40,-80,10],t:6,   d:.7, color:'#2A2030', status:'verified', cap:4},
  {id:'eyeR',  file:'TakaraRightEye2.stl',       asm:[-24.2,-13.8,106.5],rot:[0,0,0],off:[-40,-80,10],t:6.2,d:.7, color:'#2A2030', status:'verified', cap:4},
  {id:'nose',  file:'TakaraNoseWithMouthhole2.stl',asm:[0,-37.4,105],  rot:[0,0,0], off:[0,-90,0],  t:6.5, d:.8, color:'#F0D78D', status:'verified', cap:4},
];
export const CAPTIONS=['First, a little heart.','Every adventure needs somewhere to begin.','Made for curious little discoveries.','And suddenly, someone is here.','A little personality changes everything.','Hello, world. I\'m Pipkin.'];
export const CAPTION_AT=[0,1.4,2.8,4.4,6,7.6]; // seconds on timeline
export const TOTAL=8.6;
