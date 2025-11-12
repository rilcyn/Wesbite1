// Canvas particle network animation
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
let W, H, points;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  points = Array.from({length: Math.min(120, Math.floor(W*H/12000))}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-.5)*0.6, vy:(Math.random()-.5)*0.6
  }));
}
resize();
window.addEventListener('resize', resize);

function step(){
  ctx.clearRect(0,0,W,H);
  for(const p of points){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
    ctx.fillStyle = 'rgba(170,200,255,.8)';
    ctx.fillRect(p.x, p.y, 1.5, 1.5);
  }
  // connections
  for(let i=0;i<points.length;i++){
    for(let j=i+1;j<points.length;j++){
      const a=points[i], b=points[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d2 = dx*dx+dy*dy;
      if(d2<120*120){
        ctx.strokeStyle = 'rgba(120,190,255,'+ (1 - d2/14400) +')';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(step);
}
step();

// Typewriter headline
const lines = [
  "I like solving complex problems.",
  "I understand the importance of security within network systems.",
  "Measure. Improve. Repeat."
];
let li=0, ci=0, del=false;
const el = document.getElementById('typer');
const caret = document.querySelector('.caret');

function type(){
  const line = lines[li];
  if(!del){
    ci++;
    if(ci === line.length+1){ del = true; setTimeout(type, 900); return; }
  }else{
    ci--;
    if(ci === 0){ del=false; li=(li+1)%lines.length; }
  }
  el.textContent = line.slice(0, ci);
  setTimeout(type, del?40:70);
}
type();

// Scroll reveal
const io = new IntersectionObserver(entries => {
  for(const e of entries){
    if(e.isIntersecting){ e.target.classList.add('shown'); io.unobserve(e.target); }
  }
}, {threshold: .2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));


// (code section removed per user request)

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
