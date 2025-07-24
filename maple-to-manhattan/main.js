import { gameState, modifyStat } from './state.js';
import { generateMap, travelTo } from './map.js';
import { updateHUD } from './ui.js';

let ctx, nodes;
let wagonPos = { x: 0, y: 0 };

function draw() {
    const canvas = document.getElementById('gameCanvas');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw nodes
    nodes.forEach(n => {
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(n.label, n.x - 20, n.y - 15);
    });

    // draw wagon
    ctx.fillStyle = 'blue';
    ctx.fillRect(wagonPos.x - 5, wagonPos.y - 5, 10, 10); // TODO: Replace with real art

    requestAnimationFrame(draw);
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.font = '12px sans-serif';

    nodes = generateMap();
    wagonPos.x = nodes[gameState.nodeIndex].x;
    wagonPos.y = nodes[gameState.nodeIndex].y;

    canvas.addEventListener('click', evt => {
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const clicked = nodes.findIndex(n => Math.hypot(n.x - x, n.y - y) < 10);
        if (clicked >= 0) {
            travelTo(clicked);
        }
    });

    document.getElementById('travelBtn').addEventListener('click', () => {
        modifyStat('fuel', -5);
        modifyStat('warmth', -3);
        const next = Math.min(gameState.nodeIndex + 1, nodes.length - 1);
        travelTo(next);
    });

    document.getElementById('campBtn').addEventListener('click', () => {
        modifyStat('cash', -5);
        modifyStat('warmth', 5);
        modifyStat('morale', 2);
        updateHUD();
    });

    updateHUD();
    requestAnimationFrame(draw);
});

