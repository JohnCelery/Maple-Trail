import { showTitleScreen } from './titleScreen.js';

export function showInstructions() {
  const div = document.createElement('div');
  div.className = 'menu';
  div.id = 'instructionsScreen';
  div.innerHTML = `
    <div style="max-height:200px;overflow-y:auto;text-align:left;margin-bottom:10px;">
      <p>Alberta weather forecast: winter for the next three months.</p>
      <p>Warmth bar: not an optional metric.</p>
      <p>Press Esc to panic-pause and re-attach hubcaps.</p>
    </div>
    <button class="menu-btn" id="backBtn">Back</button>
  `;
  document.body.appendChild(div);
  div.querySelector('#backBtn').addEventListener('click', () => {
    div.remove();
    showTitleScreen();
  });
}
