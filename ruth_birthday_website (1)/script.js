/* =========================================================
   CONFIG — put your Cloudflare R2 public URLs here.
   Each key needs a full https URL, e.g:
   hero: "https://<your-r2-public-domain>/hero.jpg"
   If a URL is left blank or fails to load, a soft placeholder
   is shown instead so the site never looks broken.
   ========================================================= */
const IMAGES = {
  hero:        "", // main birthday portrait
  jasmine:     "", // her with jasmine flowers / temple
  biryani:     "", // her with biryani
  beach:       "", // her at the beach
  kdrama:      "", // her + her favourite K-drama / actor edit
  friendship:  "", // the two of you / devops meme photo
  wish:        ""  // closing photo
};

/* ---------- CHAPTER CONTENT ---------- */
const CHAPTERS = [
  {
    key:"jasmine",
    tag:'origin.set("Chennai, Tamil Nadu")',
    title:"Malligai Girl 🌼",
    icon:"🌼",
    accent:"212,175,55",
    message:"From the heart of Chennai, always with a string of jasmine in her hair — because some things are simply non-negotiable, mullapoo included. Faith, family, and a little bit of temple-gopuram grandeur in the way she carries herself."
  },
  {
    key:"biryani",
    tag:'craving.status = "always"',
    title:"Certified Biryani Whisperer 🍚",
    icon:"🍚",
    accent:"255,138,101",
    message:"She doesn't just eat biryani, she evaluates it — aroma, dum, masala balance, the works. Somewhere there's a mental leaderboard of every biryani place she's tried, and it's more rigorous than any sprint retro."
  },
  {
    key:"beach",
    tag:'happy_place == "Marina Beach"',
    title:"Beach Baby 🌊",
    icon:"🌊",
    accent:"14,124,134",
    message:"Give her sand under her feet and the Bay of Bengal in front of her and she's unstoppable. Sunset, sea breeze, and probably a plate of something fried nearby — that's her kind of peace."
  },
  {
    key:"kdrama",
    tag:'watchlist.length == "∞"',
    title:"Certified K-Drama Enthusiast 🎬",
    icon:"🎬",
    accent:"214,51,108",
    message:"Ask her about her current K-drama and clear your evening — she has opinions, ranked favourites, and yes, a favourite actor she will absolutely defend till the end of the episode."
  },
  {
    key:"friendship",
    tag:"mumbai.connect(chennai) // status: online",
    title:"Junior & Chief 🚀",
    icon:"🚀",
    accent:"168,23,83",
    message:"Two DevOps engineers, one Mumbai, one Chennai, same org, different city, zero excuse not to be this close. Through every deploy, every 2am page, every ridiculous work call — she's been the one constant good thing. My Junior, my Princess, my favourite colleague by far."
  }
];

/* ---------- BUILD CHAPTER SLIDES ---------- */
const stage = document.getElementById('stage');

function garlandHTML(){
  const petal = `<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" fill="#FFFDF6"/><circle cx="4" cy="10" r="2.6" fill="#FFFDF6"/><circle cx="16" cy="10" r="2.6" fill="#FFFDF6"/><circle cx="10" cy="4" r="2.6" fill="#FFFDF6"/><circle cx="10" cy="16" r="2.6" fill="#FFFDF6"/><circle cx="10" cy="10" r="1.6" fill="#D4AF37"/></svg>`;
  let s = "";
  for(let i=0;i<14;i++) s += `<span>${petal}</span>`;
  return s;
}

CHAPTERS.forEach((c, i) => {
  const section = document.createElement('section');
  section.className = 'slide chapter-slide' + (i % 2 === 0 ? ' tilt-left' : ' tilt-right');
  section.dataset.index = i + 2;
  section.style.background = `radial-gradient(circle at 12% 15%, rgba(${c.accent},0.14), transparent 45%), radial-gradient(circle at 88% 85%, rgba(${c.accent},0.12), transparent 40%), linear-gradient(180deg, var(--cream) 0%, var(--cream-2) 100%)`;
  section.innerHTML = `
    <div class="garland">${garlandHTML()}</div>
    <div class="content">
      <span class="tag reveal" style="color:rgb(${c.accent}); border-color:rgba(${c.accent},0.35); background:rgba(${c.accent},0.08);">${c.tag}</span>
      <div class="frame polaroid reveal" data-img="${c.key}" style="--accent:rgb(${c.accent})">
        <div class="fallback">${c.title}</div>
        <span class="frame-badge" style="background:rgb(${c.accent})">${c.icon}</span>
      </div>
      <h2 class="subtitle chapter-headline reveal" style="color:rgb(${c.accent})">${c.title}</h2>
      <div class="divider reveal" style="background:linear-gradient(90deg, var(--gold), rgb(${c.accent}))"></div>
      <p class="message reveal">${c.message}</p>
    </div>`;
  stage.appendChild(section);
});

/* ---------- FINAL SLIDE ---------- */
const finalSection = document.createElement('section');
finalSection.className = 'slide final-slide';
finalSection.dataset.index = CHAPTERS.length + 2;
finalSection.innerHTML = `
  <div class="garland">${garlandHTML()}</div>
  <div class="content">
    <span class="tag reveal">deploy.status("birthday_wishes") // SUCCESS ✅</span>
    <div class="frame reveal" data-img="wish"><div class="fallback">Ruth<br>Mariya S</div></div>
    <h1 class="title reveal">Happy Birthday, Junior 💗</h1>
    <div class="divider reveal"></div>
    <p class="message reveal">Here's to more biryani debates, more beach evenings you deserve, more jasmine-scented good days, and many more years of being ridiculously easy to be friends with. Mumbai to Chennai, always rooting for you. Love, your favourite colleague.</p>
    <div class="icon-row reveal">🌼 🍚 🌊 🎬 💻</div>
  </div>`;
stage.appendChild(finalSection);

/* also add garlands to slides 0 and 1 dynamically for the flower motif */
document.querySelectorAll('.garland').forEach(g=>{
  if(!g.innerHTML) g.innerHTML = garlandHTML();
});

/* ---------- LOAD IMAGES WITH FALLBACK ---------- */
document.querySelectorAll('.frame, .hero-photo-frame').forEach(frame=>{
  const key = frame.dataset.img;
  const url = IMAGES[key];
  if(url){
    const img = document.createElement('img');
    img.src = url;
    img.alt = key;
    img.onerror = () => { img.remove(); }; // fallback text stays visible
    frame.insertBefore(img, frame.firstChild);
  }
});

/* ---------- NAVIGATION ---------- */
const slides = () => Array.from(document.querySelectorAll('.slide'));
let current = 0;

function renderDots(){
  const dots = document.getElementById('dots');
  dots.innerHTML = '';
  slides().forEach((s,i)=>{
    const d = document.createElement('div');
    d.className = 'dot' + (i===current ? ' active':'');
    dots.appendChild(d);
  });
}

function goTo(index){
  const all = slides();
  if(index < 0 || index >= all.length) return;
  all.forEach((s,i)=>{
    s.classList.remove('active','prev');
    if(i === index) s.classList.add('active');
    else if(i < index) s.classList.add('prev');
  });
  current = index;
  renderDots();
  document.getElementById('prevBtn').disabled = (current === 0);
  document.getElementById('nextBtn').classList.remove('hint');
  document.getElementById('nextBtn').disabled = false;
  playReveal(all[index]);
}

/* staggered fade/rise-in for the active slide's key elements */
function playReveal(slideEl){
  const items = slideEl.querySelectorAll('.reveal');
  items.forEach(el=>{
    el.classList.remove('reveal-play');
    void el.offsetWidth; /* restart animation */
    el.classList.add('reveal-play');
  });
}

document.getElementById('nextBtn').addEventListener('click', ()=> goTo(current+1));
document.getElementById('prevBtn').addEventListener('click', ()=> goTo(current-1));

/* keyboard + swipe */
window.addEventListener('keydown', e=>{
  if(e.key === 'ArrowRight') goTo(current+1);
  if(e.key === 'ArrowLeft') goTo(current-1);
});
let touchX = null;
stage.addEventListener('touchstart', e=> touchX = e.touches[0].clientX, {passive:true});
stage.addEventListener('touchend', e=>{
  if(touchX===null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(Math.abs(dx) > 50){ dx < 0 ? goTo(current+1) : goTo(current-1); }
  touchX = null;
}, {passive:true});

renderDots();
document.getElementById('prevBtn').disabled = true;
playReveal(slides()[0]);

/* ---------- CANDLE BLOW LOGIC ---------- */
const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
const wishMade = document.getElementById('wishMade');
let blown = false;

function extinguish(){
  if(blown) return;
  blown = true;
  flame.classList.add('out');
  wishMade.classList.add('show');
  blowBtn.style.display = 'none';
  launchConfetti();
  setTimeout(()=> goTo(1), 1900);
}

blowBtn.addEventListener('click', extinguish);

/* optional real microphone blow-detection (best effort, silently ignored if blocked) */
(async function initMic(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    (function check(){
      if(blown){ stream.getTracks().forEach(t=>t.stop()); return; }
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a,b)=>a+b,0)/data.length;
      if(avg > 55) extinguish();
      requestAnimationFrame(check);
    })();
  }catch(err){ /* mic unavailable or denied — button still works */ }
})();

/* ---------- CONFETTI ---------- */
const canvas = document.getElementById('confetti');
const ctx2d = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function launchConfetti(strength = 1){
  const colors = ['#D6336C','#D4AF37','#FF8A65','#FFFDF6','#0E7C86'];
  const shapes = ['rect','circle','ribbon'];
  const count = Math.round(130 * strength);
  const pieces = Array.from({length:count}, ()=>({
    x: canvas.width/2 + (Math.random()-0.5)*100,
    y: canvas.height*0.42,
    vx: (Math.random()-0.5)*9.5,
    vy: Math.random()*-9.5 - 3,
    size: Math.random()*6+4,
    color: colors[Math.floor(Math.random()*colors.length)],
    shape: shapes[Math.floor(Math.random()*shapes.length)],
    rot: Math.random()*360,
    vr: (Math.random()-0.5)*14,
    life: 0
  }));
  function frame(){
    ctx2d.clearRect(0,0,canvas.width,canvas.height);
    let alive = false;
    pieces.forEach(p=>{
      if(p.life > 150) return;
      alive = true;
      p.vy += 0.27;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
      ctx2d.save();
      ctx2d.translate(p.x,p.y);
      ctx2d.rotate(p.rot*Math.PI/180);
      ctx2d.fillStyle = p.color;
      if(p.shape === 'circle'){
        ctx2d.beginPath();
        ctx2d.arc(0,0,p.size/2,0,Math.PI*2);
        ctx2d.fill();
      } else if(p.shape === 'ribbon'){
        ctx2d.fillRect(-p.size*0.18, -p.size*1.1, p.size*0.36, p.size*2.2);
      } else {
        ctx2d.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.6);
      }
      ctx2d.restore();
    });
    if(alive) requestAnimationFrame(frame);
    else ctx2d.clearRect(0,0,canvas.width,canvas.height);
  }
  frame();
}
