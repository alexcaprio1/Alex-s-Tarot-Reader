// ==========================================
// 1. TAROT DECK ARRAY
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

// ==========================================
// 2. DOM ELEMENTS & STATE
// ==========================================
let selectedFocus = null;
let selectedIntention = null;

const optionBtns = document.querySelectorAll('.option-btn');
const chargeWrapper = document.getElementById('charge-wrapper');
const chargeBtn = document.getElementById('charge-btn');
const progressRing = document.querySelector('.progress-ring-circle');

// Progress ring calculations
const radius = progressRing ? progressRing.r.baseVal.value : 0;
const circumference = 2 * Math.PI * radius;

if (progressRing) {
  progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
  progressRing.style.strokeDashoffset = circumference;
}

// ==========================================
// 3. OPTION SELECTION LOGIC
// ==========================================
optionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group; // 'focus' or 'intention'

    // Unselect other buttons in the same group
    document.querySelectorAll(`.option-btn[data-group="${group}"]`).forEach(b => {
      b.classList.remove('selected', 'active');
    });

    // Mark clicked button as active
    btn.classList.add('selected', 'active');

    // Save state
    if (group === 'focus') {
      selectedFocus = btn.innerText;
    } else if (group === 'intention') {
      selectedIntention = btn.innerText;
    }

    // Reveal charge button if both are selected
    if (selectedFocus && selectedIntention) {
      if (chargeWrapper) chargeWrapper.classList.remove('hidden');
    }
  });
});

// ==========================================
// 4. HOLD TO CHARGE LOGIC
// ==========================================
let holdTimer = null;
let progress = 0;
const holdDuration = 2000; // 2 seconds
const intervalTime = 20;

function setProgress(percent) {
  if (!progressRing) return;
  const offset = circumference - (percent / 100) * circumference;
  progressRing.style.strokeDashoffset = offset;
}

function startCharging() {
  progress = 0;
  holdTimer = setInterval(() => {
    progress += (intervalTime / holdDuration) * 100;
    if (progress >= 100) {
      progress = 100;
      setProgress(100);
      clearInterval(holdTimer);
      revealCards();
    } else {
      setProgress(progress);
    }
  }, intervalTime);
}

function stopCharging() {
  clearInterval(holdTimer);
  progress = 0;
  setProgress(0);
}

if (chargeBtn) {
  // Mouse events
  chargeBtn.addEventListener('mousedown', startCharging);
  chargeBtn.addEventListener('mouseup', stopCharging);
  chargeBtn.addEventListener('mouseleave', stopCharging);

  // Touch events (for mobile)
  chargeBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startCharging(); });
  chargeBtn.addEventListener('touchend', stopCharging);
}

// ==========================================
// 5. REVEAL CARDS FUNCTION
// ==========================================
function revealCards() {
  const readingSection = document.getElementById('reading-section');
  if (readingSection) readingSection.classList.remove('hidden');

  // Shuffle deck and pick 3 cards
  const shuffled = [...deck].sort(() => 0.5 - Math.random());
  const selectedCards = shuffled.slice(0, 3);

  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach((cardEl, index) => {
    const cardData = selectedCards[index];
    const isReversed = Math.random() < 0.3; // 30% chance reversed

    const imgEl = cardEl.querySelector('img');
    const titleEl = cardEl.querySelector('.card-title');
    const descEl = cardEl.querySelector('.card-desc');

    if (imgEl) {
      imgEl.src = cardData.image;
      imgEl.alt = cardData.name;
      if (isReversed) imgEl.classList.add('reversed');
    }
    if (titleEl) {
      titleEl.innerText = `${cardData.name} ${isReversed ? '(Reversed)' : ''}`;
    }
    if (descEl) {
      descEl.innerText = isReversed ? cardData.reversed : cardData.upright;
    }
  });
}
