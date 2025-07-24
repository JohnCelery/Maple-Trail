import { randomQuip } from './flavor.js';
import { gameState } from './state.js';

function createTooltip(text, x, y) {
  const div = document.createElement('div');
  div.className = 'tooltip';
  div.textContent = text;
  document.body.appendChild(div);
  const rect = div.getBoundingClientRect();
  div.style.left = `${x - rect.width / 2}px`;
  div.style.top = `${y - rect.height - 10}px`;
  setTimeout(() => div.classList.add('fade'), 10);
  setTimeout(() => div.remove(), 3000);
}

function attachTooltip(el, getText) {
  el.addEventListener('mouseenter', e => {
    const rect = el.getBoundingClientRect();
    createTooltip(getText(), rect.left + rect.width / 2, rect.top);
  });
}

export function initTooltips() {
  document.querySelectorAll('#hud .stat').forEach(statDiv => {
    const id = statDiv.id;
    attachTooltip(statDiv, () => `${randomQuip()}\n${id}: ${gameState.stats[id]}`);
  });
  document.querySelectorAll('#inventory .inv-item').forEach((invDiv, idx) => {
    const keys = Object.keys(gameState.inventory);
    const key = keys[idx];
    attachTooltip(invDiv, () => `${randomQuip()}\n${key}: ${gameState.inventory[key]}`);
  });
}

