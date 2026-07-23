// ==========================================
// 1. TAROT DECK ARRAY (Local Images Path)
// ==========================================
const deck = [
  { name: "0. The Fool", image: "./Tarot Images/RWS_Tarot_00_Fool.jpg", upright: "New beginnings, innocence, spontaneity.", reversed: "Recklessness, risk-taking, inconsideration." },
  { name: "I. The Magician", image: "./Tarot Images/RWS_Tarot_01_Magician.jpg", upright: "Manifestation, resourcefulness, power.", reversed: "Illusion, manipulation, unused talent." },
  { name: "II. The High Priestess", image: "./Tarot Images/RWS_Tarot_02_High_Priestess.jpg", upright: "Intuition, sacred knowledge, subconscious.", reversed: "Secrets, disconnected intuition, withdrawal." },
  { name: "III. The Empress", image: "./Tarot Images/RWS_Tarot_03_Empress.jpg", upright: "Femininity, beauty, nature, abundance.", reversed: "Creative block, dependence on others." },
  { name: "IV. The Emperor", image: "./Tarot Images/RWS_Tarot_04_Emperor.jpg", upright: "Authority, structure, control, stability.", reversed: "Tyranny, rigidity, coldness." },
  { name: "V. The Hierophant", image: "./Tarot Images/RWS_Tarot_05_Hierophant.jpg", upright: "Spiritual wisdom, tradition, institutions.", reversed: "Rebellion, subversion, new approaches." },
  { name: "VI. The Lovers", image: "./Tarot Images/RWS_Tarot_06_Lovers.jpg", upright: "Love, harmony, relationships, choices.", reversed: "Self-love, disharmony, imbalance." },
  { name: "VII. The Chariot", image: "./Tarot Images/RWS_Tarot_07_Chariot.jpg", upright: "Control, willpower, success, action.", reversed: "Self-doubt, lack of direction, aggression." },
  { name: "VIII. Strength", image: "./Tarot Images/RWS_Tarot_08_Strength.jpg", upright: "Courage, passion, persuasion, patience.", reversed: "Inner strength, self-doubt, raw emotion." },
  { name: "IX. The Hermit", image: "./Tarot Images/RWS_Tarot_09_Hermit.jpg", upright: "Soul-searching, introspection, inner guidance.", reversed: "Loneliness, isolation, paranoia." },
  { name: "X. Wheel of Fortune", image: "./Tarot Images/RWS_Tarot_10_Wheel_of_Fortune.jpg", upright: "Good luck, karma, life cycles, destiny.", reversed: "Bad luck, resistance to change, breaking cycles." },
  { name: "XI. Justice", image: "./Tarot Images/RWS_Tarot_11_Justice.jpg", upright: "Justice, fairness, truth, cause and effect.", reversed: "Unfairness, lack of accountability, dishonesty." },
  { name: "XII. The Hanged Man", image: "./Tarot Images/RWS_Tarot_12_Hanged_Man.jpg", upright: "Pause, surrender, letting go, new perspectives.", reversed: "Delays, resistance, stalling, indecision." },
  { name: "XIII. Death", image: "./Tarot Images/RWS_Tarot_13_Death.jpg", upright: "Endings, change, transformation, transition.", reversed: "Resistance to change, personal transformation, inner purging." },
  { name: "XIV. Temperance", image: "./Tarot Images/RWS_Tarot_14_Temperance.jpg", upright: "Balance, moderation, patience, purpose.", reversed: "Imbalance, excess, self-healing, re-alignment." },
  { name: "XV. The Devil", image: "./Tarot Images/RWS_Tarot_15_Devil.jpg", upright: "Shadow self, attachment, restriction, passion.", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment." },
  { name: "XVI. The Tower", image: "./Tarot Images/RWS_Tarot_16_Tower.jpg", upright: "Sudden change, upheaval, chaos, awakening.", reversed: "Personal transformation, averting disaster, delaying inevitability." },
  { name: "XVII. The Star", image: "./Tarot Images/RWS_Tarot_17_Star.jpg", upright: "Hope, faith, purpose, renewal, spirituality.", reversed: "Lack of faith, despair, self-trust, disconnection." },
  { name: "XVIII. The Moon", image: "./Tarot Images/RWS_Tarot_18_Moon.jpg", upright: "Illusion, fear, anxiety, subconscious, intuition.", reversed: "Release of fear, repressed emotion, inner confusion." },
  { name: "XIX. The Sun", image: "./Tarot Images/RWS_Tarot_19_Sun.jpg", upright: "Positivity, fun, warmth, success, vitality.", reversed: "Inner child, feeling down, overly optimistic." },
  { name: "XX. Judgement", image: "./Tarot Images/RWS_Tarot_20_Judgement.jpg", upright: "Judgement, rebirth, inner calling, absolution.", reversed: "Self-doubt, inner critic, ignoring the call." },
  { name: "XXI. The World", image: "./Tarot Images/RWS_Tarot_21_World.jpg", upright: "Completion, integration, accomplishment, travel.", reversed: "Seeking personal closure, short-cuts, delays." }
];

// App State
let selectedFocus = null;
let selectedIntention = null;
let drawnCards = [];

// DOM Elements
const chargeWrapper = document.getElementById('charge-wrapper');
const dialsContainer = document.getElementById('dials-container');
const cardsContainer = document.getElementById('cards-container');
const cardDisplay = document.getElementById('card-display');
const instruction = document.getElementById('instruction');

// ==========================================
// 2. DIAL SELECTION LOGIC
// ==========================================
document.querySelectorAll('.option-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    const value = e.target.dataset.value;

    // Highlight selected button in group
    const parentGroup = e.target.closest('.dial-group');
    parentGroup.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Save selection
    if (type === 'focus') selectedFocus = value;
    if (type === 'intention') selectedIntention = value;

    // Check if both selections are made, then reveal Hold button
    if (selectedFocus && selectedIntention) {
      chargeWrapper.classList.remove('hidden');
      instruction.textContent = "Press and hold to charge your reading.";
    }
  });
});

// ==========================================
// 3. HOLD-TO-CHARGE MECHANICS (SVG RING)
// ==========================================
const chargeBtn = document.getElementById('charge-btn');
const progressCircle = document.querySelector('.progress-ring__circle');
let chargeTimer = null;
let progress = 0;

function startCharge() {
  progress = 0;
  if (progressCircle) progressCircle.style.strokeDashoffset = '0';
  
  chargeTimer = setInterval(() => {
    progress += 5;
    if (progress >= 100) {
      clearInterval(chargeTimer);
      completeCharge();
    }
  }, 100);
}

function stopCharge() {
  clearInterval(chargeTimer);
  progress = 0;
  if (progressCircle) progressCircle.style.strokeDashoffset = '400';
}

function completeCharge() {
  dialsContainer.classList.add('hidden');
  chargeWrapper.classList.add('hidden');
  cardsContainer.classList.remove('hidden');
  instruction.textContent = "Select a card to reveal your reading.";
  
  // Pick 3 unique random cards
  const shuffled = [...deck].sort(() => 0.5 - Math.random());
  drawnCards = shuffled.slice(0, 3);
}

if (chargeBtn) {
  chargeBtn.addEventListener('mousedown', startCharge);
  chargeBtn.addEventListener('mouseup', stopCharge);
  chargeBtn.addEventListener('mouseleave', stopCharge);
  chargeBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startCharge(); });
  chargeBtn.addEventListener('touchend', stopCharge);
}

// ==========================================
// 4. CARD REVEAL & DISPLAY
// ==========================================
document.querySelectorAll('.card-back').forEach(cardElem => {
  cardElem.addEventListener('click', (e) => {
    const cardIndex = e.target.dataset.cardIndex;
    const selectedCard = drawnCards[cardIndex];
    const isReversed = Math.random() < 0.5;

    // Display selected reading
    cardsContainer.classList.add('hidden');
    cardDisplay.classList.remove('hidden');

    const meaning = isReversed ? selectedCard.reversed : selectedCard.upright;
    const orientationText = isReversed ? "Reversed" : "Upright";

    cardDisplay.innerHTML = `
      <div class="reading-result">
        <h2>${selectedCard.name} (${orientationText})</h2>
        <img src="${selectedCard.image}" alt="${selectedCard.name}" class="${isReversed ? 'reversed' : ''}">
        <p><strong>Focus:</strong> ${selectedFocus} | <strong>Intention:</strong> ${selectedIntention}</p>
        <p class="meaning-text">${meaning}</p>
        <button id="reset-btn" class="option-btn">Read Again</button>
      </div>
    `;

    document.getElementById('reset-btn').addEventListener('click', resetApp);
  });
});

function resetApp() {
  selectedFocus = null;
  selectedIntention = null;
  drawnCards = [];

  document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
  cardDisplay.classList.add('hidden');
  cardsContainer.classList.add('hidden');
  chargeWrapper.classList.add('hidden');
  dialsContainer.classList.remove('hidden');
  instruction.textContent = "Calibrate your focus and intention.";
}