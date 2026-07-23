// Complete Major Arcana Deck Array linked to local Tarot Images folder
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

// App State Variables
let selectedFocus = "General";
let selectedIntention = "Clarity";

// 1. Dial Selection Setup
document.querySelectorAll('.dial-option').forEach(option => {
  option.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    parent.querySelectorAll('.dial-option').forEach(opt => opt.classList.remove('active'));
    e.target.classList.add('active');
    
    if (parent.dataset.type === "focus") {
      selectedFocus = e.target.dataset.value;
    } else if (parent.dataset.type === "intention") {
      selectedIntention = e.target.dataset.value;
    }
  });
});

// 2. Hold-to-Charge Ritual Mechanics
const chargeBtn = document.getElementById('charge-btn');
const progressFill = document.getElementById('progress-fill');
let chargeTimer = null;
let holdDuration = 0;
const REQUIRED_HOLD = 3000; // 3 seconds hold

function startCharging() {
  holdDuration = 0;
  progressFill.style.transition = 'width 3s linear';
  progressFill.style.width = '100%';

  chargeTimer = setTimeout(() => {
    completeCharging();
  }, REQUIRED_HOLD);
}

function stopCharging() {
  clearTimeout(chargeTimer);
  progressFill.style.transition = 'width 0.3s ease';
  progressFill.style.width = '0%';
}

function completeCharging() {
  document.getElementById('ritual-screen').style.display = 'none';
  document.getElementById('reading-screen').style.display = 'block';
  generateReading();
}

if (chargeBtn) {
  chargeBtn.addEventListener('mousedown', startCharging);
  chargeBtn.addEventListener('mouseup', stopCharging);
  chargeBtn.addEventListener('mouseleave', stopCharging);
  chargeBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startCharging(); });
  chargeBtn.addEventListener('touchend', stopCharging);
}

// 3. Card Selection & Reading Generator
function generateReading() {
  // Shuffle & Draw Card
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  const isReversed = Math.random() < 0.5;

  // DOM Elements
  const cardImg = document.getElementById('card-image');
  const cardNameElem = document.getElementById('card-name');
  const orientationElem = document.getElementById('card-orientation');
  const tagsElem = document.getElementById('reading-tags');
  const focusElem = document.getElementById('reading-focus');
  const exampleElem = document.getElementById('reading-example');

  // Set Card Display Info
  cardImg.src = card.image;
  cardImg.alt = card.name;
  
  if (isReversed) {
    cardImg.classList.add('reversed');
    orientationElem.textContent = "Reversed";
  } else {
    cardImg.classList.remove('reversed');
    orientationElem.textContent = "Upright";
  }

  cardNameElem.textContent = card.name;
  tagsElem.textContent = `${selectedFocus.toUpperCase()} | ${selectedIntention.toUpperCase()}`;

  // Plain-English Reading Logic
  const meaningText = isReversed ? card.reversed : card.upright;
  focusElem.innerHTML = `To unblock your <strong>${selectedFocus}</strong>, address <strong>${meaningText.toLowerCase()}</strong>.`;
  exampleElem.textContent = `Applying this to ${selectedIntention.toLowerCase()}: focus on practical, grounded steps to align with this energy.`;
}

// Reset / Read Again Button
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    document.getElementById('reading-screen').style.display = 'none';
    document.getElementById('ritual-screen').style.display = 'block';
    progressFill.style.width = '0%';
  });
}