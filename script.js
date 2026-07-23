// --- Major Arcana Dataset ---
const TAROT_DECK = [
  { id: 0, name: "00 // THE FOOL", upright: "New Beginnings, Potential, Pure Risk", reversed: "Hesitation, Recklessness, Naivety" },
  { id: 1, name: "01 // THE MAGICIAN", upright: "Agency, Resource Alignment, Focused Will", reversed: "Unrealized Talent, Misdirection, Inertia" },
  { id: 2, name: "02 // THE HIGH PRIESTESS", upright: "Intuition, Subconscious Signal, Pattern Recognition", reversed: "Suppressed Knowing, Noise, Surface Focus" },
  { id: 3, name: "03 // THE EMPRESS", upright: "Generative Growth, Synthesis, Abundance", reversed: "Creative Block, System Drain, Stagnation" },
  { id: 4, name: "04 // THE EMPEROR", upright: "Structural Control, Stability, Architecture", reversed: "Rigidity, Over-regulation, Friction" },
  { id: 5, name: "05 // THE HIEROPHANT", upright: "Frameworks, Established Method, Knowledge Transmission", reversed: "Dogma, Outdated Protocols, Blind Conformity" },
  { id: 6, name: "06 // THE LOVERS", upright: "Alignment, Value Selection, Mutual Resonance", reversed: "Misalignment, Conflicting Vectors, Imbalance" },
  { id: 7, name: "07 // THE CHARIOT", upright: "Vector Momentum, Focused Drive, Convergence", reversed: "Loss of Direction, Mechanical Strain, Burnout" },
  { id: 8, name: "08 // STRENGTH", upright: "Calibrated Control, Equilibrium, Resilience", reversed: "Internal Friction, Reactionary Drift, Exhaustion" },
  { id: 9, name: "09 // THE HERMIT", upright: "Isolation Protocol, Deep Calibration, Internal Light", reversed: "Withdrawal Decay, Isolation Loop, Analysis Paralysis" },
  { id: 10, name: "10 // WHEEL OF FORTUNE", upright: "Cyclic Shift, External Variables, Adaptation", reversed: "Resistance to Shift, Uncontrolled Variables, Drag" },
  { id: 11, name: "11 // JUSTICE", upright: "Calibrated Reality, Truth, Cause & Effect", reversed: "Systemic Asymmetry, Biased Input, Rationalization" },
  { id: 12, name: "12 // THE HANGED MAN", upright: "Perspective Inversion, Strategic Pause, Re-evaluation", reversed: "Fruitless Resistance, Delusional Delay, Inertia" },
  { id: 13, name: "13 // DEATH", upright: "System Reset, Pruning, State Transformation", reversed: "Decay Resistance, Stagnant Legacy, Attachment" },
  { id: 14, name: "14 // TEMPERANCE", upright: "Dynamic Modulation, Integration, Smooth Flow", reversed: "System Volatility, Boundary Dissolution, Turbulence" },
  { id: 15, name: "15 // THE DEVIL", upright: "Systemic Entanglement, Sub-optimal Traps, Shadow Drives", reversed: "Breaking Dependencies, Detachment, Protocol Liberation" },
  { id: 16, name: "16 // THE TOWER", upright: "Structural Rupture, Paradigm Shift, Reality Injection", reversed: "Averted Collapse, Fragile Patching, Imminent Disruption" },
  { id: 17, name: "17 // THE STAR", upright: "Coherent Trajectory, Renewed Signal, Clarity", reversed: "Desynchronization, Loss of Signal, Hopelessness" },
  { id: 18, name: "18 // THE MOON", upright: "Ambiguity, Distortion, Hidden Variables", reversed: "Illusion Dissolution, Signal Recovery, Unmasking" },
  { id: 19, name: "19 // THE SUN", upright: "High Fidelity, Output Vitality, Illumination", reversed: "Obscured Clarity, Partial Burnout, Temporary Dimming" },
  { id: 20, name: "20 // JUDGEMENT", upright: "Evaluative Synthesis, Final Integration, Rebirth", reversed: "Self-Critical Loops, Unresolved Audits, Hesitation" },
  { id: 21, name: "21 // THE WORLD", upright: "System Completion, Total Synthesis, Equilibrium", reversed: "Incomplete Loops, Unresolved Margins, Near-Miss" }
];

// --- App State ---
let drawnCards = [];
let isCharging = false;

// --- DOM Elements ---
const chargeBtn = document.getElementById('charge-btn');
const chargeStatus = document.getElementById('charge-status');
const progressCircle = document.getElementById('progress-circle');
const spreadSection = document.getElementById('spread-section');
const readingOutput = document.getElementById('reading-output');
const resetBtn = document.getElementById('reset-btn');
const focusSelect = document.getElementById('focus-area');
const stanceSelect = document.getElementById('intention-stance');

// Ring geometry calculation
const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// --- Initialization ---
function init() {
  chargeBtn.addEventListener('click', startChargingSequence);
  resetBtn.addEventListener('click', resetApp);
}

// --- Charging & Calibration Sequence ---
function startChargingSequence() {
  if (isCharging) return;
  isCharging = true;
  chargeBtn.disabled = true;

  // Reset display
  spreadSection.classList.add('hidden');
  readingOutput.classList.add('hidden');
  resetCardsState();

  const states = [
    { text: "Breathing in... Aligning vector matrix...", progress: 0.33 },
    { text: "Exhaling... Filtering baseline signal...", progress: 0.66 },
    { text: "Calibrating complete. Drawing archetypes...", progress: 1.0 }
  ];

  let step = 0;
  
  function runStep() {
    if (step < states.length) {
      chargeStatus.textContent = states[step].text;
      const offset = CIRCUMFERENCE - (states[step].progress * CIRCUMFERENCE);
      progressCircle.style.strokeDashoffset = offset;
      step++;
      setTimeout(runStep, 1000);
    } else {
      isCharging = false;
      chargeBtn.disabled = false;
      chargeStatus.textContent = "Calibration complete.";
      drawSpread();
    }
  }

  runStep();
}

// --- Card Drawing Logic ---
function drawSpread() {
  const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
  drawnCards = shuffled.slice(0, 3).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5
  }));

  spreadSection.classList.remove('hidden');

  drawnCards.forEach((card, idx) => {
    const cardEl = document.getElementById(`card-${idx}`);
    const titleEl = document.getElementById(`card-${idx}-title`);
    const orientEl = document.getElementById(`card-${idx}-orient`);
    const keywordsEl = document.getElementById(`card-${idx}-keywords`);

    titleEl.textContent = card.name;
    orientEl.textContent = card.isReversed ? "REVERSED" : "UPRIGHT";
    orientEl.className = `card-orient ${card.isReversed ? 'reversed' : 'upright'}`;
    keywordsEl.textContent = card.isReversed ? card.reversed : card.upright;

    setTimeout(() => {
      cardEl.classList.add('flipped');
    }, 400 + (idx * 300));
  });

  setTimeout(() => {
    generateDiagnosticSynthesis();
    readingOutput.classList.remove('hidden');
  }, 1600);
}

// --- Deep Diagnostic Synthesis ---
function generateDiagnosticSynthesis() {
  const focus = focusSelect.value;
  const stance = stanceSelect.value;

  const card1 = drawnCards[0];
  const card2 = drawnCards[1];
  const card3 = drawnCards[2];

  document.getElementById('synthesis-title').textContent = `${focus} • ${stance}`;

  document.getElementById('diag-overview').textContent = 
    `Analyzing current state through the lens of ${stance.toLowerCase()}. The initial condition (${card1.name.split('//')[1].trim()} - ${card1.isReversed ? 'Reversed' : 'Upright'}) indicates an underlying operational pattern where ${card1.isReversed ? 'blocked momentum or unaligned variables' : 'primary energy and structural focus'} predominate your ${focus.toLowerCase()} vector.`;

  document.getElementById('diag-catalyst').textContent = 
    `The immediate friction point is signaled by ${card2.name.split('//')[1].trim()} (${card2.isReversed ? 'Reversed' : 'Upright'}). Rather than treating this as static noise, observe how it acts as a dynamic recalibration point within your system. Focus on ${card2.isReversed ? 'resolving internal entanglements before taking outward action' : 'leveraging current structural clarity to drive progress'}.`;

  document.getElementById('diag-directive').textContent = 
    `To align with your projected state (${card3.name.split('//')[1].trim()} - ${card3.isReversed ? 'Reversed' : 'Upright'}), your actionable directive is: ${card3.isReversed ? 'Release perfectionist friction and simplify the current architecture.' : 'Execute with deliberate intention and consolidate your energy across key priorities.'}`;
}

// --- Reset Functions ---
function resetCardsState() {
  for (let i = 0; i < 3; i++) {
    const cardEl = document.getElementById(`card-${i}`);
    cardEl.classList.remove('flipped');
  }
  progressCircle.style.strokeDashoffset = CIRCUMFERENCE;
}

function resetApp() {
  resetCardsState();
  spreadSection.classList.add('hidden');
  readingOutput.classList.add('hidden');
  chargeStatus.textContent = "Calibrating matrix... Press to begin";
}

document.addEventListener('DOMContentLoaded', init);
