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
  if (ev.choices) {
    modal.innerHTML = `<div class="modal">
      <h3>${ev.title}</h3>
      <p>${ev.description}</p>
      <div class="choices">
        ${ev.choices
          .map(
            (c, i) =>
              `<button data-idx="${i}" id="choice${i}">${c.text}</button>`
          )
          .join('')}
      </div>
    </div>`;
    modal.classList.remove('hidden');
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
          if (onChoice) onChoice(c);
          window.dispatchEvent(new Event('modalClosed'));
        },
        { once: true }
      );
    });
  } else {
    modal.innerHTML = `<div class="modal">
      <h3>${ev.title}</h3>
      <p>${ev.description}</p>
      <ul>
        ${ev.effects
          .map(
            e => `<li>${icons[e.stat || e.inventory] || ''} ${
            e.stat || e.inventory
          }: ${e.delta > 0 ? '+' : ''}${e.delta}</li>`
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
}

export function hideModal() {
  modal.classList.add('hidden');
}
