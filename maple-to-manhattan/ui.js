import { gameState } from './state.js';

export function updateHUD() {
  ['health', 'morale', 'warmth', 'fuel'].forEach(stat => {
    const span = document.querySelector(`#${stat} .bar span`);
    if (span) span.style.width = `${gameState.stats[stat]}%`;
  });
  const label = document.getElementById('cashLabel');
  if (label) label.textContent = `Cash: $${gameState.stats.cash}`;

  ['parts', 'tools', 'gear'].forEach(item => {
    const span = document.getElementById(`${item}Count`);
    if (span) span.textContent = gameState.inventory[item];
  });
}

window.addEventListener('statChanged', e => {
  const stat = e.detail.key;
  const span = document.querySelector(`#${stat} .bar span`);
  if (!span) return;
  span.classList.add('flash');
  setTimeout(() => span.classList.remove('flash'), 300);
});

window.addEventListener('inventoryChanged', e => {
  const item = e.detail.item;
  const span = document.getElementById(`${item}Count`);
  if (!span) return;
  span.classList.add('flash');
  setTimeout(() => span.classList.remove('flash'), 300);
});


