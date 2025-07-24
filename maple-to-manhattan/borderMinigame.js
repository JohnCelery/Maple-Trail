import { gameState } from './state.js';
import { useItem } from './inventory.js';

export function startMiniGame() {
  const overlay = document.createElement('div');
  overlay.id = 'borderMini';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    color: '#fff',
    fontFamily: 'sans-serif',
  });

  let time = 60;
  const timer = document.createElement('div');
  timer.textContent = `Time: ${time}`;
  overlay.appendChild(timer);

  const form = document.createElement('div');
  overlay.appendChild(form);
  const labels = ['Name', 'Purpose', 'Maple-Syrup Decl.', 'Vehicle ID', 'Passport #'];
  const inputs = labels.map(l => {
    const input = document.createElement('input');
    input.placeholder = l;
    form.appendChild(input);
    form.appendChild(document.createElement('br'));
    return input;
  });

  const ok = document.createElement('button');
  ok.textContent = 'OK';
  overlay.appendChild(ok);

  if (gameState.inventory.form_duplicate_carbon > 0) {
    const fast = document.createElement('button');
    fast.textContent = 'Fast-Track';
    overlay.appendChild(fast);
    fast.addEventListener('click', () => {
      if (useItem('form_duplicate_carbon')) success();
    });
  }

  const interval = setInterval(() => {
    time--;
    timer.textContent = `Time: ${time}`;
    if (time <= 0) fail();
  }, 1000);

  function cleanup() {
    clearInterval(interval);
    window.removeEventListener('keydown', escListener);
    overlay.remove();
  }

  function success() {
    cleanup();
    window.dispatchEvent(new Event('borderSuccess'));
  }

  function fail() {
    cleanup();
    window.dispatchEvent(new Event('borderFail'));
  }

  function escListener(e) {
    if (e.key === 'Escape') fail();
  }

  window.addEventListener('keydown', escListener);

  ok.addEventListener('click', () => {
    const filled = inputs.every(i => i.value.trim());
    if (filled) success();
  });

  document.body.appendChild(overlay);
}
