// --- STATE MANAGEMENT ---
let selectedFocus = null;
let selectedIntention = null;
let holdTimer = null;
let holdProgress = 0;
const HOLD_DURATION = 2000; // 2 seconds to charge

// --- TAROT DECK DATA SAMPLE ---
// Each card includes its image, interpretation, and interactive symbol coordinates (percentages)
const tarotDeck = [
  {
    name: "The Fool",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    vibe: "New beginnings, innocence, spontaneous action.",
    meaning: "Stepping off the cliff into the unknown with pure trust. Clear the path for fresh perspective.",
    symbols: [
      { top: "78%", left: "75%", title: "White Dog", desc: "Symbol of protection, loyalty, and instinct warning of danger." },
      { top: "18%", left: "68%", title: "White Sun", desc: "Represents conscious awareness, clarity, and divine guidance." },
      { top: "38%", left: "42%", title: "White Rose", desc: "Purity of intention and freedom from base desires." }
    ]
  },
  {
    name: "The Magician",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    vibe: "Manifestation, resourcefulness, power, inspired action.",
    meaning: "You have all the tools required at your disposal. Align your will with purpose.",
    symbols: [
      { top: "12%", left: "50%", title: "Lemniscate (Infinity)", desc: "Infinite potential and mastery over the spiritual and material realms." },
      { top: "62%", left: "48%", title: "Altar Tools", desc: "Wand, Cup, Sword, and Pentacle representing the four classical elements." }
    ]
  },
  {
    name: "The Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    vibe: "Hope, faith, purpose, renewal, inspiration.",
    meaning: "A calm light guiding you forward after hardship. Trust the clarity taking shape.",
    symbols: [
      { top: "18%", left: "50%", title: "Large Golden Star", desc: "Core hope, guidance, and spiritual alignment." },
      { top: "58%", left: "38%", title: "Water Pitchers", desc: "Nourishing both the conscious mind (land) and unconscious intuition (water)." }
    ]
  }
];

// --- DOM ELEMENTS ---
const optionBtns = document.querySelectorAll('.option-btn');
const chargeBtn = document.getElementById('charge-btn');
const chargeFill = document.getElementById('charge-fill');
const chargeText = document.getElementById('charge-text');
const instructionText = document.getElementById('instruction');
const cardsContainer = document.getElementById('cards-container');
const cardDisplay = document.getElementById('card-display');

// Spotlight DOM elements
const mainImg = document.getElementById('main-tarot-img');
const cosmicLens = document.getElementById('cosmic-lens');
const symbolDotsContainer = document.getElementById('symbol-hint-dots');
const sparkRing = document.getElementById('spark-ring');
const breathingPrompts = [
  "Inhale focus...",
  "Hold clarity...",
  "Exhale noise...",
  "Aligning intention..."
];
let promptIndex = 0;
let sparkInterval = null;

// --- EVENT LISTENERS: DIALS ---
optionBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const type = btn.getAttribute('data-type');
    const value = btn.getAttribute('data-value');

    // Deselect siblings in the same dial group
    const parentGroup = btn.closest('.dial-group');
    parentGroup.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

    // Select clicked button
    btn.classList.add('selected');

    if (type === 'focus') selectedFocus = value;
    if (type === 'intention') selectedIntention = value;

    checkDialCompletion();
  });
});

function checkDialCompletion() {
  if (selectedFocus && selectedIntention) {
    chargeBtn.disabled = false;
    chargeBtn.classList.remove('disabled-btn');
    chargeBtn.classList.add('ready-btn');
    instructionText.textContent = "Hold the button down to charge the deck with your focus.";
  }
}

// --- HOLD-TO-CHARGE LOGIC ---
function createSparkle() {
  if (!sparkRing) return;
  const spark = document.createElement('div');
  spark.className = 'portal-spark';
  
  // Randomize placement along the ring boundary
  const angle = Math.random() * Math.PI * 2;
  const radius = 40 + Math.random() * 20; // Matches button ring radius
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  spark.style.left = `calc(50% + ${x}px)`;
  spark.style.top = `calc(50% + ${y}px)`;
  
  sparkRing.appendChild(spark);
  
  // Remove particle after animation finishes
  setTimeout(() => spark.remove(), 800);
}

function startCharge(e) {
  e.preventDefault();
  if (!selectedFocus || !selectedIntention) return;

  chargeBtn.classList.add('charging');
  holdProgress = 0;
  promptIndex = 0;
  
  let startTime = Date.now();

  // Set initial breathing prompt
  chargeText.textContent = breathingPrompts[0];

  holdTimer = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    holdProgress = Math.min((elapsedTime / HOLD_DURATION) * 100, 100);
    chargeFill.style.width = `${holdProgress}%`;

    // Rotate breathing prompts based on progress percentage
    const step = Math.floor((holdProgress / 100) * breathingPrompts.length);
    if (step < breathingPrompts.length && step !== promptIndex) {
      promptIndex = step;
      chargeText.textContent = breathingPrompts[promptIndex];
    }

    // Spawn sparkles during charge progress
    createSparkle();

    if (holdProgress >= 100) {
      completeCharge();
    }
  }, 20);
}

function cancelCharge() {
  if (holdProgress < 100) {
    clearInterval(holdTimer);
    holdProgress = 0;
    chargeFill.style.width = '0%';
    chargeBtn.classList.remove('charging');
    chargeText.textContent = "Hold to Charge Deck";
    if (sparkRing) sparkRing.innerHTML = ''; // Clean up remaining sparkles
  }
}

function completeCharge() {
  clearInterval(holdTimer);
  chargeText.textContent = "Deck Charged!";
  instructionText.textContent = "Select a card to reveal your alignment.";
  if (sparkRing) sparkRing.innerHTML = '';
  
  // Hide controls & show face-down card deck
  setTimeout(() => {
    document.querySelectorAll('.dial-group').forEach(d => d.classList.add('hidden'));
    document.querySelector('.charge-wrapper').classList.add('hidden');
    cardsContainer.classList.remove('hidden');
    attachCardClickHandlers();
  }, 600);
}

chargeBtn.addEventListener('mousedown', startCharge);
chargeBtn.addEventListener('mouseup', cancelCharge);
chargeBtn.addEventListener('mouseleave', cancelCharge);
chargeBtn.addEventListener('touchstart', startCharge);
chargeBtn.addEventListener('touchend', cancelCharge);

// --- DRAW & DISPLAY CARD ---
function attachCardClickHandlers() {
  const cardBacks = cardsContainer.querySelectorAll('.card-back');
  cardBacks.forEach(card => {
    card.addEventListener('click', () => {
      // Pick a random card from deck
      const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
      revealCard(randomCard);
    });
  });
}

function revealCard(card) {
  cardsContainer.classList.add('hidden');
  cardDisplay.classList.remove('hidden');

  // Populate metadata and reading text
  const headerMeta = cardDisplay.querySelector('.reading-header-meta');
  const textOutput = cardDisplay.querySelector('.reading-text-output');

  headerMeta.innerHTML = `
    <p class="reading-context">Focus: <strong>${selectedFocus}</strong> | Stance: <strong>${selectedIntention}</strong></p>
    <h2>${card.name}</h2>
  `;

  textOutput.innerHTML = `
    <p class="vibe-tag"><em>${card.vibe}</em></p>
    <p class="meaning-body">${card.meaning}</p>
  `;

  // Set image source
  mainImg.src = card.image;
  mainImg.alt = card.name;

  // Initialize Cosmic Lens & Symbol Hotspots
  setupCosmicLens(card);
}

// --- COSMIC LENS & SYMBOL HOTSPOT SYSTEM ---
function setupCosmicLens(card) {
  const wrapper = document.querySelector('.interactive-tarot-focus-wrapper');
  
  // Set cosmic lens background to card image for smooth zoom effect
  cosmicLens.style.backgroundImage = `url('${card.image}')`;
  
  // Generate hotspot dots for this card's symbols
  symbolDotsContainer.innerHTML = '';
  symbolDotsContainer.classList.remove('hidden');

  card.symbols.forEach((sym) => {
    const dot = document.createElement('div');
    dot.className = 'symbol-hotspot';
    dot.style.top = sym.top;
    dot.style.left = sym.left;

    // Hotspot Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'hotspot-tooltip';
    tooltip.innerHTML = `<strong>${sym.title}</strong><br>${sym.desc}`;
    dot.appendChild(tooltip);

    symbolDotsContainer.appendChild(dot);
  });

  // Mouse Move Event for Spotlight Cursor Tracking
  wrapper.addEventListener('mousemove', (e) => {
    cosmicLens.classList.remove('hidden');

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside container
    const y = e.clientY - rect.top;  // y position inside container

    // Center the lens over cursor
    cosmicLens.style.left = `${x}px`;
    cosmicLens.style.top = `${y}px`;

    // Calculate background zoom positioning percentages
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    cosmicLens.style.backgroundPosition = `${percentX}% ${percentY}%`;
    cosmicLens.style.backgroundSize = `${rect.width * 2.5}px ${rect.height * 2.5}px`;
  });

  wrapper.addEventListener('mouseleave', () => {
    cosmicLens.classList.add('hidden');
  });
}
