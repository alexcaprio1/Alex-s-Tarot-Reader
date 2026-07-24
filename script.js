// 1. Deck Data
const deck = [
  { name: "0. The Fool", image: "./Tarot Images/RWS_Tarot_00_Fool.jpg", upright: { vibe: "taking a leap of faith and starting fresh", example: "Saying yes to a new opportunity before feeling 100% ready." }, reversed: { vibe: "hesitating out of fear or rushing in blindly", example: "Overthinking a choice until you miss the chance entirely." } },
  { name: "I. The Magician", image: "./Tarot Images/RWS_Tarot_01_Magician.jpg", upright: { vibe: "having all the tools you need to make it happen", example: "Realizing you already have the skills to pull this off." }, reversed: { vibe: "feeling unprepared or wasting energy on distractions", example: "Doubting your abilities despite having all the facts." } },
  { name: "II. The High Priestess", image: "./Tarot Images/RWS_Tarot_02_High_Priestess.jpg", upright: { vibe: "trusting your gut before asking for opinions", example: "Knowing a decision is right for you before you can even explain why." }, reversed: { vibe: "ignoring your inner voice and letting outside noise confuse you", example: "Talking yourself out of a strong gut feeling." } },
  { name: "III. The Empress", image: "./Tarot Images/RWS_Tarot_03_Empress.jpg", upright: { vibe: "giving things time to grow naturally and taking care of yourself", example: "Nurturing an idea step-by-step instead of forcing it." }, reversed: { vibe: "feeling drained from giving too much", example: "Feeling burnt out from doing all the heavy lifting for others." } },
  { name: "IV. The Emperor", image: "./Tarot Images/RWS_Tarot_04_Emperor.jpg", upright: { vibe: "setting clear boundaries and taking control", example: "Saying a firm 'no' to protect your time and energy." }, reversed: { vibe: "being too rigid or trying to force control", example: "Trying to micro-manage details you should probably delegate." } },
  { name: "V. The Hierophant", image: "./Tarot Images/RWS_Tarot_05_Hierophant.jpg", upright: { vibe: "sticking to proven methods and trusted advice", example: "Following a tried-and-true playbook that works." }, reversed: { vibe: "questioning old rules that don't fit you anymore", example: "Breaking away from 'how it's always been done.'" } },
  { name: "VI. The Lovers", image: "./Tarot Images/RWS_Tarot_06_Lovers.jpg", upright: { vibe: "choosing what aligns with your true values", example: "Making a choice based on what actually matters to you." }, reversed: { vibe: "facing a conflict between your heart and your head", example: "Staying in a situation that clashes with your values." } },
  { name: "VII. The Chariot", image: "./Tarot Images/RWS_Tarot_07_Chariot.jpg", upright: { vibe: "pushing forward with clear focus and determination", example: "Powering through distractions to finish a goal." }, reversed: { vibe: "losing control or pushing hard in the wrong direction", example: "Spinning your wheels on something hitting a dead end." } },
  { name: "VIII. Strength", image: "./Tarot Images/RWS_Tarot_08_Strength.jpg", upright: { vibe: "handling tough situations with quiet confidence", example: "Keeping your cool during a tense moment." }, reversed: { vibe: "letting self-doubt or frustration take over", example: "Letting temporary stress convince you that you can't handle it." } },
  { name: "IX. The Hermit", image: "./Tarot Images/RWS_Tarot_09_Hermit.jpg", upright: { vibe: "stepping back from the noise to figure out your next step", example: "Taking quiet time away from others to clear your head." }, reversed: { vibe: "isolating yourself too much or overthinking alone", example: "Hiding away instead of facing reality." } },
  { name: "X. Wheel of Fortune", image: "./Tarot Images/RWS_Tarot_10_Wheel_of_Fortune.jpg", upright: { vibe: "a natural shift where things fall into place", example: "A sudden lucky break opening a new door." }, reversed: { vibe: "resisting a change you can't control", example: "Stressing over unexpected delays out of your hands." } },
  { name: "XI. Justice", image: "./Tarot Images/RWS_Tarot_11_Justice.jpg", upright: { vibe: "looking at facts clearly and accepting fair outcomes", example: "Having an honest, clear conversation where both sides take responsibility." }, reversed: { vibe: "avoiding your own part in a problem", example: "Blaming circumstances instead of owning a mistake." } },
  { name: "XII. The Hanged Man", image: "./Tarot Images/RWS_Tarot_12_Hanged_Man.jpg", upright: { vibe: "hitting pause to look at things from a new angle", example: "Stepping away from a problem so the answer can hit you naturally." }, reversed: { vibe: "forcing a move when you really just need to wait", example: "Pushing for a result before the timing is right." } },
  { name: "XIII. Death", image: "./Tarot Images/RWS_Tarot_13_Death.jpg", upright: { vibe: "closing one chapter so a better one can start", example: "Ending an old habit that no longer serves you." }, reversed: { vibe: "clinging to something just because it's familiar", example: "Holding onto an old routine long after outgrowing it." } },
  { name: "XIV. Temperance", image: "./Tarot Images/RWS_Tarot_14_Temperance.jpg", upright: { vibe: "finding a healthy middle ground and pacing yourself", example: "Balancing hard work with real downtime." }, reversed: { vibe: "swinging between overdoing it and total burnout", example: "Going 100 mph for days until you completely crash." } },
  { name: "XV. The Devil", image: "./Tarot Images/RWS_Tarot_15_Devil.jpg", upright: { vibe: "spotting bad habits or loops that make you feel stuck", example: "Realizing you're staying in a comfort zone out of habit." }, reversed: { vibe: "breaking free from a pattern holding you back", example: "Finally cutting off a habit that kept you stuck." } },
  { name: "XVI. The Tower", image: "./Tarot Images/RWS_Tarot_16_Tower.jpg", upright: { vibe: "a sudden eye-opener that changes your perspective", example: "Learning a truth that instantly shifts your plans." }, reversed: { vibe: "avoiding a truth or delaying a necessary change", example: "Ignoring a clear issue hoping it fixes itself." } },
  { name: "XVII. The Star", image: "./Tarot Images/RWS_Tarot_17_Star.jpg", upright: { vibe: "feeling hopeful, calm, and clear about the future", example: "Getting your spark back after a tough stretch." }, reversed: { vibe: "feeling temporarily discouraged", example: "Focusing so much on a temporary flaw that you lose sight of the big picture." } },
  { name: "XVIII. The Moon", image: "./Tarot Images/RWS_Tarot_18_Moon.jpg", upright: { vibe: "relying on instinct because facts aren't clear yet", example: "Moving carefully when you don't have the full story." }, reversed: { vibe: "confusion lifting and clarity emerging", example: "Finally seeing through the confusion on a tricky issue." } },
  { name: "XIX. The Sun", image: "./Tarot Images/RWS_Tarot_19_Sun.jpg", upright: { vibe: "pure positive energy and smooth progress", example: "A moment where everything just flows effortlessly." }, reversed: { vibe: "good things are happening, but you're too worried to enjoy them", example: "Getting a win but immediately stressing over the next thing." } },
  { name: "XX. Judgement", image: "./Tarot Images/RWS_Tarot_20_Judgement.jpg", upright: { vibe: "reflecting on growth and stepping up to the next level", example: "Learning from a past mistake and making a mature upgrade." }, reversed: { vibe: "being way too hard on yourself", example: "Second-guessing a choice you already made." } },
  { name: "XXI. The World", image: "./Tarot Images/RWS_Tarot_21_World.jpg", upright: { vibe: "crossing the finish line on a major chapter", example: "Finishing a long-term goal with a full sense of accomplishment." }, reversed: { vibe: "almost done, but stuck on the last few details", example: "Being 95% done with something but dragging your feet on the end." } }
];

// 2. Dial Tracking
let selectedFocus = null;
let selectedIntention = null;

const optionBtns = document.querySelectorAll(".option-btn");
const chargeBtn = document.getElementById("charge-btn");
const cardsContainer = document.getElementById("cards-container");
const instruction = document.getElementById("instruction");
const cardDisplay = document.getElementById("card-display");
const cardBacks = document.querySelectorAll(".card-back");
const dialFocusGroup = document.getElementById("dial-focus");
const dialIntentionGroup = document.getElementById("dial-intention");

let holdTimer;

// Handle Option Selection
optionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    const value = btn.getAttribute("data-value");

    document.querySelectorAll(`.option-btn[data-type="${type}"]`).forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    if (type === "focus") selectedFocus = value;
    if (type === "intention") selectedIntention = value;

    if (selectedFocus && selectedIntention) {
      chargeBtn.classList.remove("disabled-btn");
      chargeBtn.removeAttribute("disabled");
      chargeBtn.innerText = "Hold to Charge Deck";
      instruction.innerText = "Dials set. Press and hold to focus your energy into the deck.";
    }
  });
});

// 3. Hold-to-Charge Logic
chargeBtn.addEventListener("mousedown", () => {
  if (!selectedFocus || !selectedIntention) return;
  instruction.innerText = "Charging deck with your energy... hold steady...";
  
  holdTimer = setTimeout(() => {
    instruction.innerText = "Deck fully charged! Select the card you feel drawn to:";
    chargeBtn.classList.add("hidden");
    dialFocusGroup.classList.add("hidden");
    dialIntentionGroup.classList.add("hidden");
    cardsContainer.classList.remove("hidden");
  }, 1500);
});

chargeBtn.addEventListener("mouseup", () => {
  if (instruction.innerText.includes("Charging")) {
    clearTimeout(holdTimer);
    instruction.innerText = "Hold longer to focus your energy!";
  }
});

// 4. Reading Generator
function generateAccessibleReading(card, isReversed, focus, intention) {
  const details = isReversed ? card.reversed : card.upright;

  let takeaway = "";
  if (intention === "Overcoming a Block") {
    takeaway = `To unblock your **${focus}**, focus on **${details.vibe}**.`;
  } else if (intention === "Seeking Clarity") {
    takeaway = `When it comes to **${focus}**, your clearest move is **${details.vibe}**.`;
  } else if (intention === "Next Move") {
    takeaway = `Your best next step in **${focus}** is **${details.vibe}**.`;
  }

  return {
    takeaway: takeaway,
    example: details.example
  };
}

// 5. Card Selection & Draw
cardBacks.forEach((card) => {
  card.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];
    const isReversed = Math.random() < 0.5;

    cardsContainer.classList.add("hidden");
    cardDisplay.classList.remove("hidden");
    instruction.innerText = "Your Personal Reading:";

    const reading = generateAccessibleReading(drawnCard, isReversed, selectedFocus, selectedIntention);

    cardDisplay.innerHTML = `
      <div class="reading-meta">${selectedFocus} • ${selectedIntention}</div>
      <h2>${drawnCard.name}</h2>
      <p class="card-status">${isReversed ? "Reversed" : "Upright"}</p>
      <img 
        src="${drawnCard.image}" 
        alt="${drawnCard.name}" 
        class="tarot-img ${isReversed ? "reversed" : ""}"
      />
      <div class="reading-text">
        <p class="reading-vibe"><strong>Focus:</strong> ${reading.takeaway.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
        <p class="reading-example"><strong>Example:</strong> ${reading.example}</p>
      </div>
    `;
  });
});
