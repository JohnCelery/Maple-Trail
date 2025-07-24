import { gameState } from './state.js';

export function updateHUD() {
  ['health', 'morale', 'warmth', 'fuel'].forEach(stat => {
    const span = document.querySelector(`#${stat} .bar span`);
    if (span) span.style.width = `${gameState.stats[stat]}%`;
  });
  const label = document.getElementById('cashLabel');
  if (label) label.textContent = `Cash: $${gameState.stats.cash}`;
}


