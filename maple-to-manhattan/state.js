export const gameState = {
  nodeIndex: 0,
  stats: {
    health: 75,
    morale: 75,
    warmth: 75,
    fuel: 75,
    cash: 75,
  },
};

export function modifyStat(key, delta) {
  if (gameState.stats.hasOwnProperty(key)) {
    gameState.stats[key] = Math.max(0, gameState.stats[key] + delta);
  }
}

