const tarotDeck = [
  { name: "The Fool", upright: "New beginnings, innocence, spontaneity.", reversed: "Recklessness, risk-taking, inconsideration." },
  { name: "The Magician", upright: "Manifestation, resourcefulness, power.", reversed: "Illusion, manipulation, unused talent." },
  { name: "The High Priestess", upright: "Intuition, sacred knowledge, subconscious.", reversed: "Secrets, disconnected intuition, withdrawal." },
  { name: "The Empress", upright: "Femininity, beauty, nature, abundance.", reversed: "Creative block, dependence on others." },
  { name: "The Emperor", upright: "Authority, structure, control, stability.", reversed: "Tyranny, rigidity, coldness." },
  { name: "The Hierophant", upright: "Spiritual wisdom, tradition, institutions.", reversed: "Rebellion, subversion, new approaches." },
  { name: "The Lovers", upright: "Love, harmony, relationships, choices.", reversed: "Self-love, disharmony, imbalance." },
  { name: "The Chariot", upright: "Control, willpower, success, action.", reversed: "Self-doubt, lack of direction, aggression." },
  { name: "Strength", upright: "Courage, passion, persuasion, patience.", reversed: "Inner strength, self-doubt, raw emotion." },
  { name: "The Hermit", upright: "Soul-searching, introspection, inner guidance.", reversed: "Loneliness, isolation, paranoia." },
  { name: "Wheel of Fortune", upright: "Good luck, karma, life cycles, destiny.", reversed: "Bad luck, resistance to change, breaking cycles." },
  { name: "Justice", upright: "Justice, fairness, truth, cause and effect.", reversed: "Unfairness, lack of accountability, dishonesty." },
  { name: "The Hanged Man", upright: "Pause, surrender, letting go, new perspectives.", reversed: "Delays, resistance, stalling, indecision." },
  { name: "Death", upright: "Endings, change, transformation, transition.", reversed: "Resistance to change, personal transformation, inner purging." },
  { name: "Temperance", upright: "Balance, moderation, patience, purpose.", reversed: "Imbalance, excess, self-healing, re-alignment." },
  { name: "The Devil", upright: "Shadow self, attachment, restriction, addiction.", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment." },
  { name: "The Tower", upright: "Sudden change, upheaval, chaos, revelation.", reversed: "Personal transformation, averting disaster, delaying the inevitable." },
  { name: "The Star", upright: "Hope, faith, purpose, renewal, inspiration.", reversed: "Lack of faith, despair, self-trust, disconnection." },
  { name: "The Moon", upright: "Illusion, fear, anxiety, subconscious, intuition.", reversed: "Release of fear, repressed emotion, inner confusion." },
  { name: "The Sun", upright: "Positivity, fun, warmth, success, vitality.", reversed: "Inner child, feeling down, overly optimistic." },
  { name: "Judgement", upright: "Judgement, rebirth, inner calling, absolution.", reversed: "Self-doubt, inner critic, ignoring the call." },
  { name: "The World", upright: "Completion, integration, accomplishment, travel.", reversed: "Seeking personal closure, short-cuts, delays." }
];

const drawBtn = document.getElementById("draw-btn");
const statusText = document.getElementById("status-text");
const readingOutput = document.getElementById("reading-output");
const readingText = document.getElementById("reading-text");

drawBtn.addEventListener("click", drawCards);

function drawCards() {
  for (let i = 0; i < 3; i++) {
    const cardSlot = document.getElementById(`card-${i}`);
    cardSlot.classList.remove("flipped");
  }
  
  readingOutput.classList.add("hidden");
  statusText.textContent = "Drawing cards...";

  setTimeout(() => {
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const selectedCards = shuffled.slice(0, 3);
    
    let summaryArray = [];

    selectedCards.forEach((card, index) => {
      const cardSlot = document.getElementById(`card-${index}`);
      const cardBack = cardSlot.querySelector(".card-back");
      const titleEl = cardSlot.querySelector(".card-title");
      const orientationEl = cardSlot.querySelector(".card-orientation");

      const isReversed = Math.random() < 0.5;

      titleEl.textContent = card.name;
      
      if (isReversed) {
        cardBack.classList.add("reversed");
        orientationEl.textContent = "Reversed";
        summaryArray.push(`${card.name} (Reversed): ${card.reversed}`);
      } else {
        cardBack.classList.remove("reversed");
        orientationEl.textContent = "Upright";
        summaryArray.push(`${card.name} (Upright): ${card.upright}`);
      }

      setTimeout(() => {
        cardSlot.classList.add("flipped");
      }, index * 250);
    });

    setTimeout(() => {
      statusText.textContent = "Reading Complete";
      readingText.innerText = summaryArray.join("\n\n");
      readingOutput.classList.remove("hidden");
    }, 1000);

  }, 400);
}