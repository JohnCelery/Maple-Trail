let menu;

export function togglePauseMenu() {
  if (menu) {
    menu.remove();
    menu = null;
    return;
  }
  menu = document.createElement('div');
  menu.className = 'menu';
  menu.id = 'pauseMenu';
  menu.innerHTML = `
    <h2>Time-out to scrape ice off windshield?</h2>
    <button class="menu-btn" id="resumeBtn">Resume</button>
    <button class="menu-btn" id="restartBtn">Restart Run</button>
    <button class="menu-btn" id="quitBtn">Quit to Title</button>
  `;
  document.body.appendChild(menu);
  menu.querySelector('#resumeBtn').addEventListener('click', () => togglePauseMenu());
  menu.querySelector('#restartBtn').addEventListener('click', () => location.reload());
  menu.querySelector('#quitBtn').addEventListener('click', () => location.reload());
}
