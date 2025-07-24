import { QUIPS } from './flavor.js';
import { showTitleScreen } from './titleScreen.js';

const epitaphs = [
  'Ran out of fuel three moose-lengths from salvation.',
  'Lost to the great white north.',
  'Too cold to continue the adventure.'
];

export function showGameOverScreen(stats) {
  const div = document.createElement('div');
  div.className = 'menu';
  div.id = 'gameOverScreen';
  const ep = epitaphs[Math.floor(Math.random() * epitaphs.length)];
  div.innerHTML = `
    <h2>Game Over</h2>
    <div id="statsSummary">Health ${stats.health} | Morale ${stats.morale} | Warmth ${stats.warmth}</div>
    <div>${ep}</div>
    <button class="menu-btn" id="tryAgainBtn">Try Again</button>
    <button class="menu-btn" id="quitBtn">Quit to Title</button>
  `;
  document.body.appendChild(div);
  div.querySelector('#tryAgainBtn').addEventListener('click', () => location.reload());
  div.querySelector('#quitBtn').addEventListener('click', () => {
    div.remove();
    showTitleScreen();
  });
}
