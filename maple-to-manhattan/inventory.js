import { gameState, modifyInventory } from './state.js';

export function useItem(item) {
  if (gameState.inventory[item] > 0) {
    modifyInventory(item, -1);
    return true;
  }
  return false;
}

if (typeof window !== 'undefined') {
  window.useItem = useItem;
}
