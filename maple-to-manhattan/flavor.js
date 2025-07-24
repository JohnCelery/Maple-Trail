export const QUIPS = [
  "Little Timmy loses yet another mitten (inventory -1).",
  "A stray snowball whizzes by your ear.",
  "The wagon creaks in protest of the cold.",
  "You swear that pine tree just winked at you.",
  "A rogue hockey puck skitters across the road.",
  "Squirrels plot a hostile takeover of your snacks.",
  "Is that maple syrup or engine oil leaking?",
  "Moose tracks lead ominously into the woods.",
  "A radio ad promises free donuts... in June.",
  "You momentarily forget what toes feel like.",
  "Someone farts; morale drops slightly.",
  "Windshield wipers freeze mid-swipe.",
  "Little Susie sings the same verse for miles.",
  "The heater coughs like a pack-a-day smoker.",
  "Snow drifts resemble sleeping polar bears.",
  "You ponder trading a kid for a warm coffee.",
  "A customs beaver eyes your luggage suspiciously.",
  "Frosty air makes your nostrils stick together.",
  "A mysterious smell reminds you of gym class.",
  "Your map is now 70% duct tape.",
];

export function randomQuip() {
  return QUIPS[Math.floor(Math.random() * QUIPS.length)];
}
