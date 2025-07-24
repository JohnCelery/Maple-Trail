// Event deck and drawing logic
let deck = [];

const baseEvents = [
  {
    id: 'BLIZZARD',
    title: 'Sudden White-Out',
    description: 'Visibility drops to zero; the heater groans.',
    effects: [
      { stat: 'warmth', delta: -15 },
      { stat: 'morale', delta: -5 },
    ],
  },
  {
    id: 'MOOSE_COLLISION',
    title: 'Moose Collision',
    description: 'A moose barrels across the road and clips the wagon.',
    effects: [
      { stat: 'health', delta: -10 },
      { stat: 'fuel', delta: -5 },
    ],
  },
  {
    id: 'FUEL_FREEZE',
    title: 'Frozen Fuel Line',
    description: 'Fuel thickens like molasses in the cold.',
    effects: [
      { stat: 'fuel', delta: -15 },
    ],
  },
  {
    id: 'MIXTAPE_BOOST',
    title: 'Mixtape Morale Boost',
    description: 'Your favorite song warms the soul.',
    effects: [
      { stat: 'morale', delta: 10 },
      { stat: 'warmth', delta: 5 },
    ],
  },
  {
    id: 'BARTER_TRADE',
    title: 'Barter Trade',
    description: 'You swap supplies with a friendly traveler.',
    effects: [
      { stat: 'fuel', delta: 10 },
      { stat: 'cash', delta: -10 },
    ],
  },
  {
    id: 'FEE_REFUND',
    title: 'Border Fee Refund',
    description: 'Turns out you overpaid the last toll.',
    effects: [
      { stat: 'cash', delta: 20 },
    ],
  },
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function initEvents() {
  deck = [...baseEvents];
  shuffle(deck);
  return deck;
}

export function drawRandomEvent() {
  if (deck.length === 0) {
    initEvents();
    console.log('Event deck reshuffled');
  }
  return deck.pop();
}
