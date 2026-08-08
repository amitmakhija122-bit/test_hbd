/* Ruth's birthday website — vanilla JS
 * Scene 0 = cake, 1 = hero, 2..7 = chapters, 8 = finale
 *
 * Cloudflare R2: set R2_BASE_URL below to your public bucket URL and upload
 * images with the keys listed in each chapter's `r2Key`. Leave it empty ("")
 * to use the local files in ./images/.
 */
const R2_BASE_URL = "";

function img(localFile, r2Key) {
  return R2_BASE_URL ? R2_BASE_URL.replace(/\/$/, "") + "/" + r2Key : "images/" + localFile;
}

const chapters = [
  {
    eyebrow: "Chapter One",
    title: "Malli Poo Girl",
    message:
      "Some people wear perfume. You wear jasmine — and somehow the whole room turns softer. Every time I see malli poo in Mumbai, my brain says one word: Junior.",
    image: img("jasmine-bg.jpg", "ruth/jasmine.jpg"),
    alt: "Jasmine flowers on pink silk",
  },
  {
    eyebrow: "Chapter Two",
    title: "Chennai Ponnu",
    message:
      "Marina breeze, filter coffee, that unbeatable Chennai attitude. You carry your city with you everywhere — and you make everyone around you love it too.",
    image: img("beach.jpg", "ruth/beach.jpg"),
    alt: "Sunrise over the beach with gentle waves",
  },
  {
    eyebrow: "Chapter Three",
    title: "Biryani > Everything",
    message:
      "There are two moods in this world: hungry, and biryani. Ask you anything at 1 PM and the answer is always the same. Today, extra raita and no sharing — birthday rules.",
    image: img("biryani.jpg", "ruth/biryani.jpg"),
    alt: "South Indian biryani served on a banana leaf",
  },
  {
    eyebrow: "Chapter Four",
    title: "K-Drama Queen",
    message:
      "Your Korean actors will never know you exist, and honestly that's their loss. Meanwhile you narrate every episode like it's breaking news — and I listen to all of it.",
    image: img("kdrama.jpg", "ruth/kdrama.jpg"),
    alt: "Cozy k-drama night with fairy lights and popcorn",
  },
  {
    eyebrow: "Chapter Five",
    title: "Blessed & Grace-Full",
    message:
      "Your faith is quiet but it's the strongest thing about you. May this new year be full of God's grace, peace, and answered prayers. Numbers 6:24 — 'The Lord bless you and keep you.'",
    image: img("faith.jpg", "ruth/faith.jpg"),
    alt: "Church interior with lilies, candles and stained glass",
  },
  {
    eyebrow: "Chapter Six",
    title: "Mumbai ↔ Chennai",
    message:
      "Same company, different pipelines, 1,300 km apart. Two DevOps engineers debugging life over chat. Zero downtime friendship — no rollback needed.",
    image: img("devops.jpg", "ruth/devops.jpg"),
    alt: "Illustration of two engineers working from Mumbai and Chennai",
  },
];

const HERO = 1;
const FIRST_CHAPTER = 2;
const TOTAL = FIRST_CHAPTER + chapters.length + 1; // 9

/* ---------- build chapter sections ---------- */
const chaptersRoot = document.getElementById("chapters");
chapters.forEach((c, i) => {
  const s = document.createElement("section");
  s.className = "scene";
  s.id = "scene-chapter-" + i;
  s.innerHTML = `
    <div class="chapter-row${i % 2 ? " flip" : ""}">
      <div class="chapter-img-wrap rise">
        <span class="glow"></span>
        <img class="chapter-img" src="${c.image}" alt="${c.alt}" loading="lazy" />
      </div>
      <div class="chapter-card glass rise" style="animation-delay:.2s">
        <p class="eyebrow rose">${c.eyebrow}</p>
        <h2>${c.title}</h2>
        <p>${c.message}</p>
      </div>
    </div>`;
  chaptersRoot.appendChild(s);
});

/* ---------- scene switching ---------- */
const scenes = [
  document.getElementById("scene-cake"),
  document.getElementById("scene-hero"),
  ...chapters.map((_, i) => document.getElementById("scene-chapter-" + i)),
  document.getElementById("scene-finale"),
];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsEl = document.getElementById("dots");

for (let i = 1; i < TOTAL; i++) {
  const d = document.createElement("span");
  d.className = "dot";
  dotsEl.appendChild(d);
}

let scene = 0;

function replayAnimations(el) {
  el.querySelectorAll(".rise").forEach((n) => {
    n.style.animation = "none";
    void n.offsetWidth;
    n.style.animation = "";
  });
}

function render() {
  scenes.forEach((s, i) => s.classList.toggle("active", i === scene));
  replayAnimations(scenes[scene]);
  prevBtn.classList.toggle("show", scene > HERO);
  nextBtn.classList.toggle("show", scene > 0 && scene < TOTAL - 1);
  dotsEl.classList.toggle("show", scene > 0);
  [...dotsEl.children].forEach((d, i) => d.classList.toggle("on", i + 1 === scene));
  window.scrollTo({ top: 0 });
}

function go(n) {
  scene = Math.max(scene === 0 ? 0 : HERO, Math.min(n, TOTAL - 1));
  render();
}

nextBtn.addEventListener("click", () => go(scene + 1));
prevBtn.addEventListener("click", () => go(scene - 1));
document.addEventListener("keydown", (e) => {
  if (scene === 0) return;
  if (e.key === "ArrowRight") go(scene + 1);
  if (e.key === "ArrowLeft") go(scene - 1);
});
document.getElementById("restartBtn").addEventListener("click", () => {
  scene = 0;
  blown = false;
  resetCandles();
  render();
});

/* ---------- petals ---------- */
const petalsRoot = document.getElementById("petals");
for (let i = 0; i < 18; i++) {
  const p = document.createElement("span");
  const size = 10 + Math.random() * 18;
  p.className = "petal";
  p.style.left = Math.random() * 100 + "%";
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.animationDelay = -Math.random() * 18 + "s";
  p.style.animationDuration = 14 + Math.random() * 14 + "s";
  p.style.setProperty("--drift", (Math.random() * 2 - 1) * 120 + "px");
  p.style.setProperty("--spin", (Math.random() > 0.5 ? 540 : -540) + "deg");
  petalsRoot.appendChild(p);
}

/* ---------- confetti ---------- */
const confettiRoot = document.getElementById("confetti");
const CONFETTI_COLORS = ["#e8629a", "#f083ac", "#e8c07d", "#fdf6e6", "#c03a72"];
function burstConfetti() {
  confettiRoot.innerHTML = "";
  for (let i = 0; i < 90; i++) {
    const b = document.createElement("span");
    b.className = "confetti-bit";
    b.style.left = Math.random() * 100 + "%";
    b.style.width = 6 + Math.random() * 6 + "px";
    b.style.height = 10 + Math.random() * 8 + "px";
    b.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    b.style.animationDelay = Math.random() * 1.5 + "s";
    b.style.animationDuration = 3 + Math.random() * 2.5 + "s";
    confettiRoot.appendChild(b);
  }
  setTimeout(() => (confettiRoot.innerHTML = ""), 7000);
}

/* ---------- cake / candles ---------- */
const cakeBtn = document.getElementById("cakeBtn");
const flamesEl = document.getElementById("flames");
const hintEl = document.getElementById("cakeHint");
let blown = false;

function resetCandles() {
  [...flamesEl.children].forEach((holder) => {
    holder.innerHTML = '<i class="flame"></i>';
  });
  hintEl.textContent = "Make a wish, Princess — tap the cake to blow out the candles.";
  cakeBtn.querySelector(".ring").style.display = "";
  listenForBlow();
}

function blowOut() {
  if (blown) return;
  blown = true;
  [...flamesEl.children].forEach((holder, i) => {
    holder.innerHTML = '<i class="smoke" style="animation-delay:' + i * 0.1 + 's"></i>';
  });
  cakeBtn.querySelector(".ring").style.display = "none";
  hintEl.textContent = "Wish locked in. Don't tell anyone what it was ✨";
  stopMic();
  setTimeout(() => {
    burstConfetti();
    go(HERO);
  }, 2200);
}

cakeBtn.addEventListener("click", blowOut);

/* real breath detection via microphone (optional, needs permission) */
let micCtx, micStream, micRaf;
function stopMic() {
  cancelAnimationFrame(micRaf);
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
  if (micCtx) micCtx.close();
  micCtx = micStream = undefined;
}

async function listenForBlow() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 512;
    micCtx.createMediaStreamSource(micStream).connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    hintEl.textContent = "Close your eyes, make a wish… then blow into your mic 🎂";
    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += (v - 128) ** 2;
      if (Math.sqrt(sum / data.length) > 26) blowOut();
      else micRaf = requestAnimationFrame(tick);
    };
    tick();
  } catch (e) {
    /* no mic permission — tapping the cake still works */
  }
}

listenForBlow();
render();
