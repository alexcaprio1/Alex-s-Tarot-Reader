// 1. Cleaned Deck Data
const deck = [
  { name: "0. The Fool", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg", upright: { vibe: "taking a leap of faith", example: "Saying yes to an opportunity before feeling 100% ready." }, reversed: { vibe: "hesitation or rushing in blindly", example: "Overthinking a choice until you miss the chance entirely." } },
  { name: "I. The Magician", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg", upright: { vibe: "using the tools you already have", example: "Realizing you already have the skills to pull this off." }, reversed: { vibe: "self-doubt or wasted energy", example: "Doubting your abilities despite having all the facts." } },
  { name: "II. The High Priestess", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", upright: { vibe: "trusting your inner gut feeling", example: "Knowing a decision is right before you can even explain why." }, reversed: { vibe: "ignoring your instincts", example: "Talking yourself out of a strong gut feeling." } },
  { name: "III. The Empress", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg", upright: { vibe: "patience and self-care", example: "Nurturing an idea step-by-step instead of forcing it." }, reversed: { vibe: "burnout from over-giving", example: "Feeling drained from doing all the heavy lifting for others." } },
  { name: "IV. The Emperor", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg", upright: { vibe: "clear boundaries and structure", example: "Saying a firm 'no' to protect your time and energy." }, reversed: { vibe: "rigidity or over-control", example: "Trying to micro-manage details you should delegate." } },
  { name: "V. The Hierophant", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg", upright: { vibe: "proven methods and trusted advice", example: "Following a tried-and-true playbook that works." }, reversed: { vibe: "outdated rules holding you back", example: "Breaking away from 'how it's always been done.'" } },
  { name: "VI. The Lovers", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg", upright: { vibe: "aligning with your core values", example: "Making a choice based on what actually matters to you." }, reversed: { vibe: "misaligned priorities", example: "Staying in a situation that clashes with your values." } },
  { name: "VII. The Chariot", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg", upright: { vibe: "focused determination and momentum", example: "Powering through distractions to finish a goal." }, reversed: { vibe: "scattered effort or dead ends", example: "Spinning your wheels on something hitting a dead end." } },
  { name: "VIII. Strength", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg", upright: { vibe: "quiet patience and emotional composure", example: "Keeping your cool during a tense moment." }, reversed: { vibe: "temporary self-doubt", example: "Letting stress convince you that you can't handle it." } },
  { name: "IX. The Hermit", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg", upright: { vibe: "stepping back to gain clarity", example: "Taking quiet time away from others to clear your head." }, reversed: { vibe: "isolation or overthinking", example: "Hiding away instead of facing reality." } },
  { name: "X. Wheel of Fortune", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg", upright: { vibe: "embracing a natural momentum shift", example: "A sudden lucky break opening a new door." }, reversed: { vibe: "resisting temporary delays", example: "Stressing over unexpected timing out of your control." } },
  { name: "XI. Justice", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg", upright: { vibe: "honesty and clear objectivity", example: "Having a frank conversation where both sides own their part." }, reversed: { vibe: "avoiding responsibility", example: "Blaming circumstances instead of owning a mistake." } },
  { name: "XII. The Hanged Man", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg", upright: { vibe: "pausing to shift your perspective", example: "Stepping away from a problem so the answer comes naturally." }, reversed: { vibe: "forcing action too soon", example: "Pushing for a result before the timing is right." } },
  { name: "XIII. Death", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg", upright: { vibe: "closing an expired chapter", example: "Ending an old habit that no longer serves you." }, reversed: { vibe: "holding onto what's comfortable", example: "Clinging to an old routine long after outgrowing it." } },
  { name: "XIV. Temperance", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg", upright: { vibe: "finding a healthy middle ground", example: "Balancing hard work with real downtime." }, reversed: { vibe: "extreme highs and lows", example: "Going 100 mph for days until you completely crash." } },
  { name: "XV. The Devil", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg", upright: { vibe: "recognizing self-imposed loops", example: "Realizing you're staying in a comfort zone out of habit." }, reversed: { vibe: "breaking a pattern holding you back", example: "Finally cutting off a habit that kept you stuck." } },
  { name: "XVI. The Tower", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg", upright: { vibe: "a radical shift in perspective", example: "Learning a truth that instantly shifts your plans." }, reversed: { vibe: "avoiding an inevitable truth", example: "Ignoring a clear issue hoping it fixes itself." } },
  { name: "XVII. The Star", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg", upright: { vibe: "renewed hope and long-term vision", example: "Getting your spark back after a tough stretch." }, reversed: { vibe: "short-term discouragement", example: "Focusing so much on a setback that you lose the big picture." } },
  { name: "XVIII. The Moon", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg", upright: { vibe: "navigating uncertainty with instinct", example: "Moving carefully when you don't have the full story." }, reversed: { vibe: "clearing up lingering confusion", example: "Finally seeing through the noise on a tricky issue." } },
  { name: "XIX. The Sun", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg", upright: { vibe: "unfiltered optimism and clear progress", example: "A moment where everything just flows effortlessly." }, reversed: { vibe: "overthinking good moments", example: "Getting a win but immediately stressing over the next thing." } },
  { name: "XX. Judgement", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg", upright: { vibe: "leveling up from past lessons", example: "Learning from a past mistake and making a mature upgrade." }, reversed: { vibe: "harsh self-criticism", example: "Second-guessing a choice you already made." } },
  { name: "XXI. The World", image: "https://upload.wikimedia.org/wikipedia/commons/ff/f4/RWS_Tarot_21_World.jpg", upright: { vibe: "full-circle completion", example: "Finishing a long-term goal with complete satisfaction." }, reversed: { vibe: "unfinished loose ends", example: "Being 95% done with something but dragging your feet on the end." } }
];

// 2. DOM Elements & State
let selectedFocus = null;
let selectedIntention = null;
let chargeSequence = [];
let isFullyCharged = false;

const optionBtns = document.querySelectorAll(".option-btn");
const dialsContainer = document.getElementById("dials-container");
const chargeWrapper = document.getElementById("charge-wrapper");
const chargeBtn = document.getElementById("charge-btn");
const cardsContainer = document.getElementById("cards-container");
const instruction = document.getElementById("instruction");
const cardDisplay = document.getElementById("card-display");
const cardBacks = document.querySelectorAll(".card-back");

// 3. Dial Selection Logic
optionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    const value = btn.getAttribute("data-value");

    document.querySelectorAll(`.option-btn[data-type="${type}"]`).forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    if (type === "focus") selectedFocus = value;
    if (type === "intention") selectedIntention = value;

    if (selectedFocus && selectedIntention) {
      chargeWrapper.classList.remove("hidden");
      instruction.innerText = "Dials calibrated. Press and hold to charge.";
      instruction.style.color = "#d4af37";
    }
  });
});

// 4. Breathing & Charging Sequence
function startCharging(e) {
  if (isFullyCharged) return;
  e.preventDefault(); // Prevent text selection on mobile
  
  chargeWrapper.classList.add("is-charging");
  instruction.style.color = "#fff";
  
  // Sequence of text changes
  instruction.innerText = "Think about your question...";
  
  chargeSequence.push(setTimeout(() => {
    instruction.innerText = "Breathe in...";
  }, 1000));
  
  chargeSequence.push(setTimeout(() => {
    instruction.innerText = "Breathe out...";
  }, 2000));
  
  // 3 seconds total
  chargeSequence.push(setTimeout(() => {
    isFullyCharged = true;
    chargeWrapper.classList.remove("is-charging");
    dialsContainer.classList.add("hidden");
    chargeWrapper.classList.add("hidden");
    cardsContainer.classList.remove("hidden");
    instruction.innerText = "Energy captured. Select a card.";
    instruction.style.color = "#d4af37";
  }, 3000));
}

function stopCharging(e) {
  if (isFullyCharged) return;
  e.preventDefault();
  
  // Clear all timers if let go too early
  chargeSequence.forEach(clearTimeout);
  chargeSequence = [];
  chargeWrapper.classList.remove("is-charging");
  
  instruction.innerText = "Focus interrupted. Hold until the circle completes.";
  instruction.style.color = "#ff4444";
}

// Mouse & Touch events for holding
chargeBtn.addEventListener("mousedown", startCharging);
chargeBtn.addEventListener("touchstart", startCharging);

chargeBtn.addEventListener("mouseup", stopCharging);
chargeBtn.addEventListener("mouseleave", stopCharging);
chargeBtn.addEventListener("touchend", stopCharging);

// 5. Reading Generator
function generateAccessibleReading(card, isReversed, focus, intention) {
  const details = isReversed ? card.reversed : card.upright;
  let takeaway = "";
  
  if (intention === "Overcoming a Block") {
    takeaway = `To unblock your **${focus}**, address **${details.vibe}**.`;
  } else if (intention === "Seeking Clarity") {
    takeaway = `Regarding your **${focus}**, pay attention to **${details.vibe}**.`;
  } else if (intention === "Next Move") {
    takeaway = `For your next step in **${focus}**, focus on **${details.vibe}**.`;
  }

  return { takeaway: takeaway, example: details.example };
}

// 6. Card Draw Logic
cardBacks.forEach((card) => {
  card.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];
    const isReversed = Math.random() < 0.5;

    cardsContainer.classList.add("hidden");
    cardDisplay.classList.remove("hidden");
    instruction.innerText = "Your Calibration Complete";
    instruction.style.color = "#666";

    const reading = generateAccessibleReading(drawnCard, isReversed, selectedFocus, selectedIntention);

    cardDisplay.innerHTML = `
      <div class="reading-meta">${selectedFocus} &nbsp;|&nbsp; ${selectedIntention}</div>
      <h2 class="card-title">${drawnCard.name}</h2>
      <p class="card-status">${isReversed ? "Reversed" : "Upright"}</p>
      
      <img src="${drawnCard.image}" alt="${drawnCard.name}" class="tarot-img ${isReversed ? "reversed" : ""}" />
      
      <div class="reading-text">
        <p><strong>The Focus:</strong><br>${reading.takeaway.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
        <p><strong>Real-World Example:</strong><br>${reading.example}</p>
      </div>
    `;
  });
});
