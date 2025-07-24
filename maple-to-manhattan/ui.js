import { gameState } from './state.js';
import { sprites } from './assets/manifest.js';

export function updateUI() {
  ['health', 'morale', 'warmth', 'fuel'].forEach(stat => {
    const span = document.querySelector(`#${stat} .bar span`);
    if (span) span.style.width = `${gameState.stats[stat]}%`;
  });
  const label = document.getElementById('cashLabel');
  if (label) label.textContent = `Cash: $${gameState.stats.cash}`;

  const invDiv = document.getElementById('inventory');
  Object.keys(gameState.inventory).forEach(item => {
    let span = document.getElementById(`${item}Count`);
    if (!span && invDiv) {
      const wrapper = document.createElement('div');
      wrapper.className = 'inv-item';
      if (sprites[item]) {
        const img = document.createElement('img');
        img.src = sprites[item];
        img.width = 16;
        img.height = 16;
        wrapper.appendChild(img);
      }
      span = document.createElement('span');
      span.id = `${item}Count`;
      wrapper.appendChild(span);
      invDiv.appendChild(wrapper);
    }
    if (span) span.textContent = gameState.inventory[item];
  });

  const travelBtn = document.getElementById('travelBtn');
  const campBtn = document.getElementById('campBtn');
  if (travelBtn) travelBtn.disabled = gameState.ui.travelDisabled;
  if (campBtn) campBtn.disabled = gameState.ui.campDisabled;
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



export function showToast(msg) {
  const div = document.createElement('div');
  div.className = 'toast';
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.classList.add('fade'), 10);
  setTimeout(() => div.remove(), 3000);
}

