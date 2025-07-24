import { gameState, modifyStat } from './state.js';
import { generateMap, travelTo } from './map.js';
import { updateHUD } from './ui.js';
import { initEvents, drawRandomEvent } from './eventEngine.js';
import { showModal } from './modal.js';
import { loadImages, images } from './loader.js';

let ctx, nodes;
let wagonPos = { x: 0, y: 0 };

function applyEffects(effects) {
    effects.forEach(e => modifyStat(e.stat, e.delta));
    updateHUD();
}

function draw() {
    const canvas = document.getElementById('gameCanvas');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw path
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.stroke();

    // draw nodes
    nodes.forEach(n => {
        ctx.drawImage(images.node, n.x - 8, n.y - 8, 16, 16);
        ctx.fillStyle = '#fff';
        ctx.fillText(n.label, n.x - 20, n.y - 15);
    });

    // draw wagon
    ctx.drawImage(images.wagon, wagonPos.x - 8, wagonPos.y - 8, 16, 16);

    requestAnimationFrame(draw);
}

window.addEventListener('load', async () => {
    const canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.font = '12px sans-serif';

    await loadImages();
    initEvents();

    nodes = generateMap(gameState.seed);
    wagonPos.x = nodes[gameState.nodeIndex].x;
    wagonPos.y = nodes[gameState.nodeIndex].y;

    function triggerEvent() {
        const ev = drawRandomEvent();
        applyEffects(ev.effects);
        showModal(ev);
        travelBtn.disabled = true;
        campBtn.disabled = true;
    }

    const travelBtn = document.getElementById('travelBtn');
    const campBtn = document.getElementById('campBtn');

    canvas.addEventListener('click', evt => {
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const clicked = nodes.findIndex(n => Math.hypot(n.x - x, n.y - y) < 10);
        if (clicked >= 0) {
            travelTo(nodes, clicked, wagonPos);
            triggerEvent();
        }
    });

    travelBtn.addEventListener('click', () => {
        modifyStat('fuel', -5);
        modifyStat('warmth', -3);
        const next = Math.min(gameState.nodeIndex + 1, nodes.length - 1);
        travelTo(nodes, next, wagonPos);
        triggerEvent();
    });

    campBtn.addEventListener('click', () => {
        modifyStat('cash', -5);
        modifyStat('warmth', 5);
        modifyStat('morale', 2);
        updateHUD();
    });

    window.addEventListener('modalClosed', () => {
        travelBtn.disabled = false;
        campBtn.disabled = false;
    });

    updateHUD();
    requestAnimationFrame(draw);
});

