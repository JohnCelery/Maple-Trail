import { gameState } from './state.js';
import { updateHUD } from './ui.js';

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateMap(seed = 1) {
  const rand = mulberry32(seed);
  const count = 7 + Math.floor(rand() * 4); // 7-10 nodes
  const nodes = [];
  const width = 800;
  const height = 400;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = 80 + t * (width - 160);
    const y =
      height / 2 + Math.sin(t * Math.PI) * 80 + (rand() * 30 - 15);
    nodes.push({ id: `N${i}`, x, y, label: `Waypoint ${i + 1}` });
  }
  return nodes;
}

export function travelTo(nodes, targetIndex, wagonPos) {
  const start = nodes[gameState.nodeIndex];
  const target = nodes[targetIndex];
  if (!target) return;

  let progress = 0;
  const duration = 30; // frames

  function animate() {
    progress++;
    const t = Math.min(progress / duration, 1);
    wagonPos.x = start.x + (target.x - start.x) * t;
    wagonPos.y = start.y + (target.y - start.y) * t;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      gameState.nodeIndex = targetIndex;
      updateHUD();
    }
  }

  requestAnimationFrame(animate);
}

