// Basic modal overlay
const existing = document.getElementById('modal');
if (!existing) {
  const div = document.createElement('div');
  div.id = 'modal';
  div.className = 'hidden';
  document.body.appendChild(div);
}
const modal = document.getElementById('modal');

const icons = {
  health: '❤️', // TODO replace with PNG
  morale: '🙂', // TODO replace with PNG
  warmth: '🔥', // TODO replace with PNG
  fuel: '⛽', // TODO replace with PNG
  cash: '💰', // TODO replace with PNG
};

export function showModal({ title, description, effects }) {
  modal.innerHTML = `<div class="modal">
    <h3>${title}</h3>
    <p>${description}</p>
    <ul>
      ${effects
        .map(
          e => `<li>${icons[e.stat] || ''} ${e.stat}: ${
            e.delta > 0 ? '+' : ''
          }${e.delta}</li>`
        )
        .join('')}
    </ul>
    <button id="modalOk">OK</button>
  </div>`;
  modal.classList.remove('hidden');
  document.getElementById('modalOk').addEventListener(
    'click',
    () => {
      hideModal();
      window.dispatchEvent(new Event('modalClosed'));
    },
    { once: true }
  );
}

export function hideModal() {
  modal.classList.add('hidden');
}
