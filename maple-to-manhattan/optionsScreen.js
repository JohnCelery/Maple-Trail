import { showTitleScreen } from './titleScreen.js';

function loadSettings() {
  return {
    snow: localStorage.getItem('optSnow') === 'true',
    jokes: localStorage.getItem('optJokes') === 'true',
    vol: parseInt(localStorage.getItem('optVol') || '50', 10),
  };
}

function saveSettings(settings) {
  localStorage.setItem('optSnow', settings.snow);
  localStorage.setItem('optJokes', settings.jokes);
  localStorage.setItem('optVol', settings.vol);
}

export function showOptions() {
  const opts = loadSettings();
  const div = document.createElement('div');
  div.className = 'menu';
  div.id = 'optionsScreen';
  div.innerHTML = `
    <label><input type="checkbox" id="snowToggle"> Enable 32-bit snowflakes (GPU-heavy)</label><br>
    <label><input type="checkbox" id="jokeToggle"> Dad Joke Pop-ups</label><br>
    <label><img src="./assets/poutine_volume.png" width="16" height="16" alt=""> Volume <input type="range" id="volSlider" min="0" max="100"></label><br>
    <button class="menu-btn" id="backBtn">Back</button>
  `;
  document.body.appendChild(div);

  const snow = div.querySelector('#snowToggle');
  const jokes = div.querySelector('#jokeToggle');
  const vol = div.querySelector('#volSlider');
  snow.checked = opts.snow;
  jokes.checked = opts.jokes;
  vol.value = opts.vol;

  function update() {
    saveSettings({ snow: snow.checked, jokes: jokes.checked, vol: vol.value });
  }
  snow.addEventListener('change', update);
  jokes.addEventListener('change', update);
  vol.addEventListener('input', update);

  div.querySelector('#backBtn').addEventListener('click', () => {
    update();
    div.remove();
    showTitleScreen();
  });
}
