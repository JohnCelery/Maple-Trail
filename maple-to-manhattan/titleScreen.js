import { sprites } from './assets/manifest.js';
import { showInstructions } from './instructionsScreen.js';
import { showOptions } from './optionsScreen.js';
import { showCredits } from './creditsScreen.js';

export function showTitleScreen() {
  const div = document.createElement('div');
  div.id = 'titleScreen';
  div.className = 'menu';
  div.style.backgroundImage = `url('${sprites.bg.title_mountains}')`;
  div.style.backgroundSize = 'cover';
  div.style.animation = 'fadein 1s forwards';
  div.innerHTML = `
    <img id="titleLogo" src="${sprites.ui.title_logo}" style="width:200px;height:auto;image-rendering:pixelated;" />
    <div>
      <button class="menu-btn" id="playBtn">Play</button>
      <button class="menu-btn" id="instructionsBtn">Instructions</button>
      <button class="menu-btn" id="optionsBtn">Options</button>
      <button class="menu-btn" id="creditsBtn">Credits</button>
    </div>
  `;
  document.body.appendChild(div);

  function drip() {
    const logo = div.querySelector('#titleLogo');
    if (!logo) return;
    const rect = logo.getBoundingClientRect();
    const drop = document.createElement('div');
    drop.className = 'syrup-drop';
    drop.style.left = `${rect.left + rect.width / 2}px`;
    drop.style.top = `${rect.bottom}px`;
    document.body.appendChild(drop);
    drop.addEventListener('animationend', () => drop.remove());
  }
  setInterval(drip, 4000);

  function spawnMoose() {
    const img = document.createElement('img');
    img.src = sprites.npc.mountie_moose;
    img.className = 'moose-ride';
    document.body.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
  }
  spawnMoose();
  setInterval(spawnMoose, 12000);

  div.querySelector('#playBtn').addEventListener('click', () => div.remove());
  div.querySelector('#instructionsBtn').addEventListener('click', () => {
    div.remove();
    showInstructions();
  });
  div.querySelector('#optionsBtn').addEventListener('click', () => {
    div.remove();
    showOptions();
  });
  div.querySelector('#creditsBtn').addEventListener('click', () => {
    div.remove();
    showCredits();
  });

  div.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', e => burst(e.clientX, e.clientY));
  });
}

function burst(x, y) {
  for (let i = 0; i < 6; i++) {
    const leaf = document.createElement('span');
    leaf.textContent = '🍁';
    leaf.className = 'leaf';
    leaf.style.left = `${x}px`;
    leaf.style.top = `${y}px`;
    document.body.appendChild(leaf);
    leaf.addEventListener('animationend', () => leaf.remove());
  }
}

