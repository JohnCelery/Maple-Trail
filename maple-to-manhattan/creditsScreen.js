import { showTitleScreen } from './titleScreen.js';
import { QUIPS } from './flavor.js';

export function showCredits() {
  const div = document.createElement('div');
  div.className = 'menu';
  div.id = 'creditsScreen';
  const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
  let inner = '<div class="credits-crawl">';
  names.forEach((n, i) => {
    inner += `<div>${n}</div>`;
    if ((i + 1) % 5 === 0) {
      inner += `<div>${QUIPS[Math.floor(Math.random() * QUIPS.length)]}</div>`;
    }
  });
  inner += '</div><button class="menu-btn" id="backBtn">Back</button>';
  div.innerHTML = inner;
  document.body.appendChild(div);

  const esc = e => {
    if (e.key === 'Escape') {
      cleanup();
    }
  };
  function cleanup() {
    window.removeEventListener('keydown', esc);
    div.remove();
    showTitleScreen();
  }
  window.addEventListener('keydown', esc);
  div.querySelector('#backBtn').addEventListener('click', cleanup);
}
