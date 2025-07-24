import { gameState, modifyStat, modifyInventory } from './state.js';
import { generateMap, travelTo } from './map.js';
import { updateHUD, showToast } from './ui.js';
import { initEvents, drawRandomEvent } from './eventEngine.js';
import { showModal } from './modal.js';
import { openMenu, closeMenu } from './menuManager.js';
import { randomQuip } from './flavor.js';
import { initTooltips } from './tooltip.js';
import { loadImages, images } from './loader.js';

let ctx, nodes;
let wagonPos = { x: 0, y: 0 };
let gameEnded = false;
let travelBtn, campBtn;

function applyEffects(effects) {
    effects.forEach(e => {
        if (e.stat) modifyStat(e.stat, e.delta);
        if (e.inventory) modifyInventory(e.inventory, e.delta);
    });
    updateHUD();
    checkGameOver();
}

function checkGameOver() {
    if (gameEnded) return;
    const stats = Object.values(gameState.stats);
    if (stats.some(v => v <= 0)) {
        gameEnded = true;
        travelBtn.disabled = true;
        campBtn.disabled = true;
        openMenu('gameOver');
        const sum = document.getElementById('statsSummary');
        if (sum) {
            sum.textContent = `Health ${gameState.stats.health} | Morale ${gameState.stats.morale} | Warmth ${gameState.stats.warmth}`;
        }
    }
}

function checkVictory() {
    if (gameEnded) return;
    if (gameState.nodeIndex === nodes.length - 1) {
        gameEnded = true;
        travelBtn.disabled = true;
        campBtn.disabled = true;
        showModal({ title: 'You Made It!', description: 'Welcome to Greenwich!' });
    }
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
    openMenu('title');
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
        travelBtn.disabled = true;
        campBtn.disabled = true;

        if (ev.choices) {
            showModal(ev, choice => {
                applyEffects(choice.effects);
            });
        } else {
            applyEffects(ev.effects);
            showModal(ev);
        }
    }

    function handleArrival(idx) {
        travelTo(nodes, idx, wagonPos, () => {
            if (idx === nodes.length - 1) {
                checkVictory();
            }
        });
        const target = nodes[idx];
        if (idx === nodes.length - 1) return;
        if (target && target.id === 'BRD') {
            travelBtn.disabled = true;
            campBtn.disabled = true;
            import('./borderMinigame.js').then(m => m.startMiniGame());
        } else {
            triggerEvent();
        }
    }

    travelBtn = document.getElementById('travelBtn');
    campBtn = document.getElementById('campBtn');

    canvas.addEventListener('click', evt => {
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const clicked = nodes.findIndex(n => Math.hypot(n.x - x, n.y - y) < 10);
        if (clicked >= 0) {
            handleArrival(clicked);
        }
    });

    travelBtn.addEventListener('click', () => {
        modifyStat('fuel', -5);
        modifyStat('warmth', -3);
        updateHUD();
        checkGameOver();
        if (gameEnded) return;
        if (Math.random() < 0.1) {
            const q = randomQuip();
            console.log(q);
            showToast(q);
        }
        const next = Math.min(gameState.nodeIndex + 1, nodes.length - 1);
        handleArrival(next);
    });

    campBtn.addEventListener('click', () => {
        modifyStat('cash', -5);
        modifyStat('warmth', 5);
        modifyStat('morale', 2);
        updateHUD();
        checkGameOver();
    });

    window.addEventListener('modalClosed', () => {
        travelBtn.disabled = false;
        campBtn.disabled = false;
    });

    window.addEventListener('borderSuccess', () => {
        modifyStat('morale', 10);
        updateHUD();
        checkGameOver();
        travelBtn.disabled = false;
        campBtn.disabled = false;
    });

    window.addEventListener('borderFail', () => {
        modifyStat('cash', -20);
        modifyStat('morale', -5);
        updateHUD();
        checkGameOver();
        travelBtn.disabled = false;
        campBtn.disabled = false;
    });

    updateHUD();
    initTooltips();
    requestAnimationFrame(draw);
});

document.body.addEventListener('click', e => {
    if (e.target.id === 'playBtn' || e.target.id === 'resumeBtn') {
        closeMenu();
    } else if (e.target.id === 'restartBtn' || e.target.id === 'tryAgainBtn' || e.target.id === 'quitBtn') {
        location.reload();
    } else if (e.target.id === 'optionsBtn') {
        openMenu('options');
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('menuOverlay');
        if (overlay && overlay.querySelector('#pauseMenu')) {
            closeMenu();
        } else if (!overlay) {
            openMenu('pause');
        }
    }
});

