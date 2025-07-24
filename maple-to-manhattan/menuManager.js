const menus = {
  title: `
    <div class="menu" id="titleMenu">
      <h1>Maple Trail</h1>
      <button id="playBtn">Play</button>
      <button id="instructionsBtn">Instructions</button>
      <button id="optionsBtn">Options</button>
      <button id="creditsBtn">Credits</button>
    </div>
  `,
  pause: `
    <div class="menu" id="pauseMenu">
      <h2>Timeout to thaw your toes?</h2>
      <button id="resumeBtn">Resume</button>
      <button id="restartBtn">Restart Run</button>
      <button id="quitBtn">Quit to Title</button>
    </div>
  `,
  gameOver: `
    <div class="menu" id="gameOverMenu">
      <h2>Game Over</h2>
      <div id="statsSummary"></div>
      <button id="tryAgainBtn">Try Again</button>
    </div>
  `,
  options: `
    <div class="menu" id="optionsMenu">
      <h2>Options</h2>
      <label><input type="checkbox" id="snowFxToggle"> Snow FX</label><br>
      <label>SFX Volume <input type="range" id="sfxVolume" min="0" max="100" value="50"></label><br>
      <label><input type="checkbox" id="jokeToggle"> Dad Joke Pop-ups</label>
    </div>
  `,
};

let overlay;

export function openMenu(id) {
  closeMenu();
  overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.innerHTML = menus[id] || '';
  document.body.appendChild(overlay);
}

export function closeMenu() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

