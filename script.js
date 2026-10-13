// ====== CONFIGURACIÓN ======
const WHATSAPP_NUMBER = "573125456301"; // +57 312 545 6301 (Colombia)
const PROMO_END = new Date("2026-10-31T23:59:59-05:00");

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

// ====== PRODUCTOS ======
const shoeSVG = (main, accent, sole) => `
<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 118 Q18 92 40 86 L92 70 Q112 40 140 34 Q160 32 168 50 Q186 74 226 82 Q272 90 282 112 L284 122 Z" fill="${main}"/>
  <path d="M150 52 L120 104 M168 60 L138 108 M186 70 L158 110" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
  <path d="M96 72 Q110 66 128 66" stroke="${accent}" stroke-width="3" fill="none" stroke-dasharray="4 5"/>
  <circle cx="60" cy="98" r="5" fill="${accent}"/>
  <path d="M14 118 L290 118 Q292 136 270 138 L34 138 Q12 138 14 118 Z" fill="${sole}"/>
  <path d="M30 128 L276 128" stroke="rgba(0,0,0,.25)" stroke-width="2" stroke-dasharray="6 6"/>
</svg>`;

const hoodieSVG = (main, accent) => `
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M110 24 Q150 6 190 24 L250 52 L282 140 L246 150 L232 104 L232 190 L68 190 L68 104 L54 150 L18 140 L50 52 Z" fill="${main}"/>
  <path d="M118 26 Q150 70 182 26" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="6"/>
  <path d="M136 120 l12 -10 l12 10 l-12 14 z M128 110 l6 -8 M172 110 l-6 -8" fill="${accent}" stroke="${accent}" stroke-width="3"/>
  <path d="M60 60 L84 160 M70 56 L94 158 M80 52 L104 156" stroke="${accent}" stroke-width="5" opacity=".9"/>
  <rect x="100" y="150" width="100" height="30" rx="8" fill="rgba(0,0,0,.25)"/>
</svg>`;

const capSVG = (main, accent) => `
<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M60 120 Q60 40 150 36 Q240 40 240 120 Z" fill="${main}"/>
  <path d="M40 120 L280 120 Q290 140 250 144 L60 140 Q30 138 40 120 Z" fill="${accent}"/>
  <circle cx="150" cy="38" r="8" fill="${accent}"/>
  <path d="M130 70 l8 20 M150 64 l8 26 M170 70 l8 20" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
</svg>`;

const products = [
  { id: 1, name: "Ultraboost Pumpkin Glow", cat: "running", price: 899900, off: 40, glow: "rgba(255,122,26,.45)",
    desc: "Amortiguación máxima con detalles reflectivos naranja que brillan con la luz de la luna.",
    svg: shoeSVG("#1b1b1f", "#ff7a1a", "#ff9c4a"), sizes: [36, 37, 38, 39, 40, 41, 42, 43] },
  { id: 2, name: "Samba Midnight Witch", cat: "lifestyle", price: 549900, off: 30, glow: "rgba(139,92,246,.5)",
    desc: "El clásico de siempre en morado brujería, con suela de caucho translúcida.",
    svg: shoeSVG("#3b1d6e", "#f4f1ff", "#b9a4ff"), sizes: [36, 37, 38, 39, 40, 41, 42] },
  { id: 3, name: "Forum Low Zombie", cat: "lifestyle", price: 599900, off: 25, glow: "rgba(182,255,59,.35)",
    desc: "Cuero premium verde ácido con costuras tipo ‘cicatriz’. Para los que vuelven a la vida.",
    svg: shoeSVG("#2a3a12", "#b6ff3b", "#e8ffd0"), sizes: [37, 38, 39, 40, 41, 42, 43, 44] },
  { id: 4, name: "Adizero Ghost Runner", cat: "running", price: 749900, off: 35, glow: "rgba(255,255,255,.3)",
    desc: "Ligera como un fantasma. Upper blanco que brilla en la oscuridad (glow in the dark).",
    svg: shoeSVG("#eceaf5", "#8b5cf6", "#ffffff"), sizes: [36, 37, 38, 39, 40, 41, 42, 43] },
  { id: 5, name: "Hoodie Night Run Bat", cat: "ropa", price: 329900, off: 40, glow: "rgba(255,122,26,.35)",
    desc: "Buzo con capucha en algodón french terry y estampado de murciélago reflectivo.",
    svg: hoodieSVG("#16141c", "#ff7a1a"), sizes: ["XS", "S", "M", "L", "XL"] },
  { id: 6, name: "Gorra Spooky Trefoil", cat: "ropa", price: 129900, off: 20, glow: "rgba(139,92,246,.4)",
    desc: "Gorra ajustable edición Halloween con visera naranja.",
    svg: capSVG("#241640", "#ff7a1a"), sizes: ["Única"] },
];

const grid = document.getElementById("productGrid");
const likes = new Set();

function renderProducts(filter = "all") {
  grid.innerHTML = "";
  products
    .filter((p) => filter === "all" || p.cat === filter)
    .forEach((p, i) => {
      const final = Math.round((p.price * (100 - p.off)) / 100 / 100) * 100;
      const card = document.createElement("article");
      card.className = "card";
      card.tabIndex = 0;
      card.style.animationDelay = `${i * 70}ms`;
      card.style.setProperty("--glow", p.glow);
      card.innerHTML = `
        <div class="card-img">
          <span class="badge">-${p.off}%</span>
          <button class="like ${likes.has(p.id) ? "on" : ""}" aria-label="Me gusta">${likes.has(p.id) ? "🧡" : "🤍"}</button>
          ${p.svg}
        </div>
        <div class="card-body">
          <p class="cat">${p.cat}</p>
          <h3>${p.name}</h3>
          <p class="price"><span class="old">${formatCOP(p.price)}</span><span class="new">${formatCOP(final)}</span></p>
        </div>`;
      card.querySelector(".like").addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        if (likes.has(p.id)) { likes.delete(p.id); btn.textContent = "🤍"; btn.classList.remove("on"); }
        else { likes.add(p.id); btn.textContent = "🧡"; btn.classList.add("on"); }
      });
      card.addEventListener("click", () => openModal(p, final));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") openModal(p, final); });
      grid.appendChild(card);
    });
}

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderProducts(chip.dataset.filter);
  })
);
renderProducts();

// ====== MODAL ======
const modal = document.getElementById("modal");
const modalWa = document.getElementById("modalWa");
let selected = { product: null, size: null, final: 0 };

function updateModalWa() {
  const { product, size, final } = selected;
  const msg = `¡Hola! 🎃 Quiero pedir el ${product.name}${size ? ` en talla ${size}` : ""} (precio promo ${formatCOP(final)}). ¿Está disponible?`;
  modalWa.href = waLink(msg);
  modalWa.target = "_blank";
  modalWa.rel = "noopener";
}

function openModal(p, final) {
  selected = { product: p, size: null, final };
  document.getElementById("modalImg").innerHTML = p.svg;
  document.getElementById("modalImg").style.setProperty("--glow", p.glow);
  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalOld").textContent = formatCOP(p.price);
  document.getElementById("modalNew").textContent = formatCOP(final);
  const sizes = document.getElementById("modalSizes");
  sizes.innerHTML = "";
  p.sizes.forEach((s) => {
    const b = document.createElement("button");
    b.className = "size";
    b.textContent = s;
    b.addEventListener("click", () => {
      sizes.querySelectorAll(".size").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      selected.size = s;
      updateModalWa();
    });
    sizes.appendChild(b);
  });
  updateModalWa();
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

// ====== ENLACES DE WHATSAPP GENÉRICOS ======
document.querySelectorAll(".js-wa[data-msg]").forEach((a) => {
  a.href = waLink(a.dataset.msg);
  a.target = "_blank";
  a.rel = "noopener";
});

// ====== CUENTA REGRESIVA ======
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  const diff = Math.max(0, PROMO_END - new Date());
  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff / 36e5) % 24);
  const m = Math.floor((diff / 6e4) % 60);
  const s = Math.floor((diff / 1e3) % 60);
  document.getElementById("cd-days").textContent = pad(d);
  document.getElementById("cd-hours").textContent = pad(h);
  document.getElementById("cd-mins").textContent = pad(m);
  document.getElementById("cd-secs").textContent = pad(s);
}
tick();
setInterval(tick, 1000);

// ====== LINTERNA EN EL HERO ======
const hero = document.querySelector(".hero");
const heroDark = document.getElementById("heroDark");
function moveLight(x, y) {
  const r = hero.getBoundingClientRect();
  heroDark.style.setProperty("--x", `${x - r.left}px`);
  heroDark.style.setProperty("--y", `${y - r.top}px`);
}
hero.addEventListener("mousemove", (e) => moveLight(e.clientX, e.clientY));
hero.addEventListener("touchmove", (e) => moveLight(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
hero.addEventListener("mouseleave", () => {
  heroDark.style.setProperty("--x", "50%");
  heroDark.style.setProperty("--y", "40%");
});

// ====== MURCIÉLAGOS ======
const batsLayer = document.querySelector(".bats");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function spawnBat() {
  const bat = document.createElement("span");
  bat.className = "bat";
  bat.textContent = "🦇";
  bat.style.top = `${Math.random() * 70 + 5}vh`;
  bat.style.setProperty("--s", (Math.random() * 0.8 + 0.6).toFixed(2));
  bat.style.animationDuration = `${Math.random() * 6 + 7}s`;
  batsLayer.appendChild(bat);
  bat.addEventListener("animationend", () => bat.remove());
}
if (!reduceMotion) {
  for (let i = 0; i < 3; i++) setTimeout(spawnBat, i * 1200);
  setInterval(spawnBat, 4500);
}

// ====== RULETA ======
const prizes = [
  { label: "10% OFF", code: "BOO10", color: "#ff7a1a" },
  { label: "Envío gratis", code: "GHOSTSHIP", color: "#3b1d6e" },
  { label: "15% OFF", code: "WITCH15", color: "#2a3a12" },
  { label: "Gorra gratis", code: "SPOOKYCAP", color: "#c2410c" },
  { label: "20% OFF", code: "ZOMBIE20", color: "#5b21b6" },
  { label: "¡Truco! 5%", code: "TRICK5", color: "#1b1b1f" },
];
const wheel = document.getElementById("wheel");
const seg = 360 / prizes.length;
wheel.style.background = `conic-gradient(${prizes
  .map((p, i) => `${p.color} ${i * seg}deg ${(i + 1) * seg}deg`)
  .join(",")})`;
prizes.forEach((p, i) => {
  const label = document.createElement("div");
  label.className = "wheel-label";
  // conic-gradient arranca arriba (−90° en coordenadas CSS)
  label.style.transform = `rotate(${i * seg + seg / 2 - 90}deg)`;
  label.textContent = p.label;
  wheel.appendChild(label);
});

let rotation = 0;
let spinning = false;
const spinBtn = document.getElementById("spinBtn");
spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  const idx = Math.floor(Math.random() * prizes.length);
  // Ángulo para dejar el centro del premio bajo el puntero (arriba)
  const target = 360 - (idx * seg + seg / 2);
  const current = ((rotation % 360) + 360) % 360;
  rotation += 360 * 6 + ((target - current + 360) % 360);
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const p = prizes[idx];
    const box = document.getElementById("spinResult");
    document.getElementById("spinText").innerHTML =
      `🎉 ¡Ganaste <strong>${p.label}</strong>! Tu código: <code>${p.code}</code>`;
    const wa = document.getElementById("spinWa");
    wa.href = waLink(`¡Hola! 🎃 Gané "${p.label}" en la ruleta de Halloween adidas. Mi código es ${p.code}. ¿Cómo lo uso?`);
    wa.target = "_blank";
    wa.rel = "noopener";
    box.hidden = false;
    confetti();
    spinning = false;
    spinBtn.disabled = false;
    spinBtn.textContent = "Girar otra vez";
  }, 5100);
});

function confetti() {
  if (reduceMotion) return;
  const icons = ["🎃", "👻", "🦇", "🍬", "🕷️", "💀"];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = icons[i % icons.length];
    c.style.left = `${Math.random() * 100}vw`;
    c.style.animationDuration = `${Math.random() * 2 + 2.5}s`;
    c.style.animationDelay = `${Math.random() * 0.6}s`;
    document.body.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

// ====== FORMULARIO → WHATSAPP ======
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const lines = [
    "¡Hola! 🎃 Quiero más información sobre la promo de Halloween adidas.",
    `• Nombre: ${f.get("nombre")}`,
    f.get("ciudad") ? `• Ciudad: ${f.get("ciudad")}` : null,
    `• Me interesa: ${f.get("interes")}`,
    f.get("mensaje") ? `• Mensaje: ${f.get("mensaje")}` : null,
  ].filter(Boolean);
  window.open(waLink(lines.join("\n")), "_blank", "noopener");
});

// ====== MENÚ MÓVIL ======
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ====== BURBUJA DEL BOTÓN FLOTANTE ======
const waFloat = document.querySelector(".wa-float");
setTimeout(() => {
  waFloat.classList.add("show-bubble");
  setTimeout(() => waFloat.classList.remove("show-bubble"), 4000);
}, 3000);
