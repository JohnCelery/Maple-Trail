export const gameState = {
  nodeIndex: 0,
  seed: 1,
  stats: {
    health: 75,
    morale: 75,
    warmth: 75,
    fuel: 75,
    cash: 75,
  },
  inventory: {
    parts: 0,
    tools: 0,
    gear: 0,
    form_duplicate_carbon: 1,
  },
};

export function clampStat(key) {
  gameState.stats[key] = Math.max(0, Math.min(100, gameState.stats[key]));
}

export function modifyStat(key, delta) {
  if (gameState.stats.hasOwnProperty(key)) {
    gameState.stats[key] += delta;
    clampStat(key);
    window.dispatchEvent(new CustomEvent('statChanged', { detail: { key } }));
  }
}

export function modifyInventory(item, delta) {
  if (gameState.inventory.hasOwnProperty(item)) {
    gameState.inventory[item] = Math.max(0, gameState.inventory[item] + delta);
    window.dispatchEvent(
      new CustomEvent('inventoryChanged', { detail: { item } })
    );
  }
}

// expose state for modal requirement checks
if (typeof window !== 'undefined') {
  window.gameState = gameState;
}

