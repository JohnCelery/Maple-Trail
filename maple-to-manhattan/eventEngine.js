import { modifyStat, modifyInventory } from './state.js';

const PLACEHOLDER_IMG = 'assets/event_placeholder.png';

const baseEvents = [
  {
    id: 'BLIZZARD',
    title: 'Sudden White-Out',
    description: 'Visibility drops to zero; the heater groans.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Press on', action: () => { modifyStat('warmth', -15); modifyStat('morale', -5); } }
    ]
  },
  {
    id: 'MOOSE_COLLISION',
    title: 'Moose Collision',
    description: 'A moose barrels across the road and clips the wagon.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Ouch', action: () => { modifyStat('health', -10); modifyStat('fuel', -5); } }
    ]
  },
  {
    id: 'FUEL_FREEZE',
    title: 'Frozen Fuel Line',
    description: 'Fuel thickens like molasses in the cold.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Sigh', action: () => { modifyStat('fuel', -15); } }
    ]
  },
  {
    id: 'MIXTAPE_BOOST',
    title: 'Mixtape Morale Boost',
    description: 'Your favorite song warms the soul.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Rock on', action: () => { modifyStat('morale', 10); modifyStat('warmth', 5); } }
    ]
  },
  {
    id: 'BARTER_TRADE',
    title: 'Barter Trade',
    description: 'You swap supplies with a friendly traveler.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Trade', action: () => { modifyStat('fuel', 10); modifyStat('cash', -10); } }
    ]
  },
  {
    id: 'FEE_REFUND',
    title: 'Border Fee Refund',
    description: 'Turns out you overpaid the last toll.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Lucky break', action: () => { modifyStat('cash', 20); } }
    ]
  },
  {
    id: 'GAS_STATION_CACHE',
    title: 'Abandoned Gas Station',
    description: 'You find a dusty box of spare parts.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Take them', action: () => { modifyInventory('parts', 1); } }
    ]
  },
  {
    id: 'FLAT_TIRE',
    title: 'Flat Tire',
    description: 'A sharp rock blows out a tire.',
    image: PLACEHOLDER_IMG,
    choices: [
      {
        text: 'Use spare part to repair',
        requires: { inventory: 'parts', count: 1 },
        action: () => { modifyInventory('parts', -1); modifyStat('morale', 3); }
      },
      {
        text: 'Drive on the rim',
        action: () => { modifyStat('health', -10); modifyStat('fuel', -5); }
      }
    ]
  },
  {
    id: 'TIM_HORTONS_RUN',
    title: 'Tim Hortons Pit Stop',
    description: 'A box of Timbits and a double-double lift everyone\'s spirits.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Yum', action: () => { modifyStat('morale', 8); modifyStat('cash', -5); modifyStat('warmth', 2); } }
    ]
  },
  {
    id: 'ZAMBONI_JAM',
    title: 'Zamboni Traffic Jam',
    description: 'A rogue Zamboni creeps along the highway ahead of you.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Wait it out', action: () => { modifyStat('fuel', -5); modifyStat('morale', -3); } }
    ]
  },
  {
    id: 'MAPLE_SYRUP_HEIST',
    title: 'Maple Syrup Heist',
    description: 'You stumble onto a shady maple syrup deal in a snowy parking lot.',
    image: PLACEHOLDER_IMG,
    choices: [
      { text: 'Buy a jug for $15', action: () => { modifyStat('cash', -15); modifyInventory('gear', 1); modifyStat('morale', 5); } },
      { text: 'Drive away politely', action: () => { modifyStat('morale', -2); } }
    ]
  }
];

let deck = [];

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
