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
  parts: '🔩',
  tools: '🧰',
  gear: '🎒',
};

export function showModal(ev, onChoice) {
  const choicesHtml = ev.choices
    .map((c, i) => `<button data-idx="${i}" id="choice${i}">${c.text}</button>`)
    .join('');
  modal.innerHTML = `<div class="modal">
      ${ev.image ? `<img src="${ev.image}" class="event-img" />` : ''}
      <h3>${ev.title}</h3>
      <p>${ev.description}</p>
      <div class="choices">${choicesHtml || '<button id="modalOk">OK</button>'}</div>
    </div>`;
  modal.classList.remove('hidden');

  if (ev.choices && ev.choices.length) {
    ev.choices.forEach((c, i) => {
      const btn = document.getElementById(`choice${i}`);
      if (c.requires && c.requires.inventory) {
        const item = c.requires.inventory;
        const count = c.requires.count || 1;
        if (window.gameState && window.gameState.inventory[item] < count) {
          btn.disabled = true;
        }
      }
      btn.addEventListener(
        'click',
        () => {
          hideModal();
          if (typeof c.action === 'function') c.action();
          if (onChoice) onChoice(c);
          window.dispatchEvent(new Event('modalClosed'));
        },
        { once: true }
      );
    });
  } else {
    document.getElementById('modalOk').addEventListener(
      'click',
      () => {
        hideModal();
        window.dispatchEvent(new Event('modalClosed'));
      },
      { once: true }
    );
  }
}

export function hideModal() {
  modal.classList.add('hidden');
}
