// Base path and file extension configuration
const IMAGE_BASE_PATH = "Tarot Images/"; // Change to your hosted URL if using CodePen (e.g., "https://yourname.github.io/tarot-images/")
const FILE_EXTENSION = ".png"; // Change to .jpg or .webp if needed

// Complete Major Arcana Deck Array
const tarotDeck = [
  {
    id: 0,
    name: "The Fool",
    file: "RWS_Tarot_00_Fool",
    meaning: "New beginnings, innocence, spontaneity, free spirit."
  },
  {
    id: 1,
    name: "The Magician",
    file: "RWS_Tarot_01_Magician",
    meaning: "Manifestation, resourcefulness, power, inspired action."
  },
  {
    id: 2,
    name: "The High Priestess",
    file: "RWS_Tarot_02_High_Priestess",
    meaning: "Intuition, sacred knowledge, divine feminine, subconscious mind."
  },
  {
    id: 3,
    name: "The Empress",
    file: "RWS_Tarot_03_Empress",
    meaning: "Femininity, beauty, nature, nurturing, abundance."
  },
  {
    id: 4,
    name: "The Emperor",
    file: "RWS_Tarot_04_Emperor",
    meaning: "Authority, establishment, structure, father figure."
  },
  {
    id: 5,
    name: "The Hierophant",
    file: "RWS_Tarot_05_Hierophant",
    meaning: "Spiritual wisdom, religious beliefs, conformity, tradition."
  },
  {
    id: 6,
    name: "The Lovers",
    file: "RWS_Tarot_06_Lovers",
    meaning: "Love, harmony, relationships, values alignment, choices."
  },
  {
    id: 7,
    name: "The Chariot",
    file: "RWS_Tarot_07_Chariot",
    meaning: "Control, willpower, success, action, determination."
  },
  {
    id: 8,
    name: "Strength",
    file: "RWS_Tarot_08_Strength",
    meaning: "Strength, courage, persuasion, influence, compassion."
  },
  {
    id: 9,
    name: "The Hermit",
    file: "RWS_Tarot_09_Hermit",
    meaning: "Soul-searching, introspection, being alone, inner guidance."
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    file: "RWS_Tarot_10_Wheel_of_Fortune",
    meaning: "Good luck, karma, life cycles, destiny, a turning point."
  },
  {
    id: 11,
    name: "Justice",
    file: "RWS_Tarot_11_Justice",
    meaning: "Justice, fairness, truth, cause and effect, law."
  },
  {
    id: 12,
    name: "The Hanged Man",
    file: "RWS_Tarot_12_Hanged_Man",
    meaning: "Pause, surrender, letting go, new perspectives."
  },
  {
    id: 13,
    name: "Death",
    file: "RWS_Tarot_13_Death",
    meaning: "Endings, change, transformation, transition."
  },
  {
    id: 14,
    name: "Temperance",
    file: "RWS_Tarot_14_Temperance",
    meaning: "Balance, moderation, patience, purpose."
  },
  {
    id: 15,
    name: "The Devil",
    file: "RWS_Tarot_15_Devil",
    meaning: "Shadow self, attachment, addiction, restriction, sexuality."
  },
  {
    id: 16,
    name: "The Tower",
    file: "RWS_Tarot_16_Tower",
    meaning: "Sudden change, upheaval, chaos, revelation, awakening."
  },
  {
    id: 17,
    name: "The Star",
    file: "RWS_Tarot_17_Star",
    meaning: "Hope, faith, purpose, renewal, spirituality."
  },
  {
    id: 18,
    name: "The Moon",
    file: "RWS_Tarot_18_Moon",
    meaning: "Illusion, fear, anxiety, subconscious, intuition."
  },
  {
    id: 19,
    name: "The Sun",
    file: "RWS_Tarot_19_Sun",
    meaning: "Positivity, fun, warmth, success, vitality."
  },
  {
    id: 20,
    name: "Judgement",
    file: "RWS_Tarot_20_Judgement",
    meaning: "Judgement, rebirth, inner calling, absolution."
  },
  {
    id: 21,
    name: "The World",
    file: "RWS_Tarot_21_World",
    meaning: "Completion, integration, accomplishment, travel."
  }
];

// Helper function to resolve the full image source URL
function getCardImageUrl(card) {
  return `${IMAGE_BASE_PATH}${card.file}${FILE_EXTENSION}`;
}

// Function to draw a random card from the deck
function drawCard() {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  const card = tarotDeck[randomIndex];
  
  // Example DOM updates (ensure these element IDs match your HTML)
  const cardImageElem = document.getElementById("card-image");
  const cardTitleElem = document.getElementById("card-title");
  const cardMeaningElem = document.getElementById("card-meaning");

  if (cardImageElem) {
    cardImageElem.src = getCardImageUrl(card);
    cardImageElem.alt = card.name;
  }
  
  if (cardTitleElem) {
    cardTitleElem.textContent = card.name;
  }
  
  if (cardMeaningElem) {
    cardMeaningElem.textContent = card.meaning;
  }

  return card;
}

// Optional event listener trigger on button click
document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-btn");
  if (drawButton) {
    drawButton.addEventListener("click", drawCard);
  }
});