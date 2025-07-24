import { gameState } from './state.js';
import { updateHUD } from './ui.js';

export function generateMap() {
  return [
    { id: 'QC', x: 80, y: 300, label: 'Frozen Québec' },
    { id: 'MTL', x: 250, y: 250, label: 'Snow-choked Montréal' },
    { id: 'BRD', x: 420, y: 220, label: 'Icy Border Post' },
    { id: 'NY', x: 590, y: 260, label: 'Miraculous Upstate NY' },
    { id: 'CT', x: 760, y: 310, label: 'Greenwich Utopia' },
  ];
}

export function travelTo(targetIndex) {
  const nodes = generateMap();
  const start = nodes[gameState.nodeIndex];
  const target = nodes[targetIndex];
  if (!target) return;

  let progress = 0;
  const duration = 30; // frames

  function animate() {
    progress++;
    const t = Math.min(progress / duration, 1);
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const x = start.x + (target.x - start.x) * t;
    const y = start.y + (target.y - start.y) * t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(n.label, n.x - 20, n.y - 15);
    });
    ctx.fillStyle = 'blue';
    ctx.fillRect(x - 5, y - 5, 10, 10); // TODO: Replace with real art

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      gameState.nodeIndex = targetIndex;
      console.log('Arrived at', target.label); // TODO: Add random events
      updateHUD();
    }
  }

  animate();
}

