import { gameState, modifyStat, modifyInventory, setUIDisabled } from './state.js';
import { generateMap, travelTo } from './map.js';
import { updateUI, showToast } from './ui.js';
import { initEvents, drawRandomEvent } from './eventEngine.js';
import { showModal } from './modal.js';
import { showTitleScreen } from './titleScreen.js';
import { togglePauseMenu } from './pauseMenu.js';
import { showGameOverScreen } from './gameOverScreen.js';
import { randomQuip } from './flavor.js';
import { initTooltips } from './tooltip.js';
import { loadImages, images } from './loader.js';

let ctx;
let travelBtn, campBtn;

function checkGameOver() {
    if (gameState.gameEnded) return;
    const stats = Object.values(gameState.stats);
    if (stats.some(v => v <= 0)) {
        gameState.gameEnded = true;
        setUIDisabled('travelDisabled', true);
        setUIDisabled('campDisabled', true);
        updateUI();
        showGameOverScreen(gameState.stats);
    }
}

function checkVictory() {
    if (gameState.gameEnded) return;
    if (gameState.nodeIndex === gameState.nodes.length - 1) {
        gameState.gameEnded = true;
        setUIDisabled('travelDisabled', true);
        setUIDisabled('campDisabled', true);
        updateUI();
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
    ctx.moveTo(gameState.nodes[0].x, gameState.nodes[0].y);
    for (let i = 1; i < gameState.nodes.length; i++) {
        ctx.lineTo(gameState.nodes[i].x, gameState.nodes[i].y);
    }
    ctx.stroke();

    // draw nodes
    gameState.nodes.forEach(n => {
        ctx.drawImage(images.node, n.x - 8, n.y - 8, 16, 16);
        ctx.fillStyle = '#fff';
        ctx.fillText(n.label, n.x - 20, n.y - 15);
    });

    // draw wagon
    ctx.drawImage(images.wagon, gameState.wagonPos.x - 8, gameState.wagonPos.y - 8, 16, 16);

    requestAnimationFrame(draw);
}

window.addEventListener('load', async () => {
    showTitleScreen();
    const canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.font = '12px sans-serif';

    await loadImages();
    initEvents();

    gameState.nodes = generateMap(gameState.seed);
    gameState.wagonPos.x = gameState.nodes[gameState.nodeIndex].x;
    gameState.wagonPos.y = gameState.nodes[gameState.nodeIndex].y;

    function triggerEvent() {
        const ev = drawRandomEvent();
        setUIDisabled('travelDisabled', true);
        setUIDisabled('campDisabled', true);
        updateUI();

        if (ev.choices) {
            showModal(ev, choice => {
                if (typeof choice.action === 'function') {
                    choice.action();
                }
                updateUI();
                checkGameOver();
            });
        } else {
            showModal(ev);
        }
    }

    function handleArrival(idx) {
        travelTo(gameState.nodes, idx, gameState.wagonPos, () => {
            if (idx === gameState.nodes.length - 1) {
                checkVictory();
            }
        });
        const target = gameState.nodes[idx];
        if (idx === gameState.nodes.length - 1) return;
        if (target && target.id === 'BRD') {
            setUIDisabled('travelDisabled', true);
            setUIDisabled('campDisabled', true);
            updateUI();
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
        const clicked = gameState.nodes.findIndex(n => Math.hypot(n.x - x, n.y - y) < 10);
        if (clicked >= 0) {
            handleArrival(clicked);
        }
    });

    function travel() {
        modifyStat('fuel', -5);
        modifyStat('warmth', -3);
        if (Math.random() < 0.1) {
            const q = randomQuip();
            console.log(q);
            showToast(q);
        }
        const next = Math.min(gameState.nodeIndex + 1, gameState.nodes.length - 1);
        handleArrival(next);
    }

    function camp() {
        modifyStat('cash', -5);
        modifyStat('warmth', 5);
        modifyStat('morale', 2);
    }

    travelBtn.addEventListener('click', () => {
        travel();
        updateUI();
        checkGameOver();
    });

    campBtn.addEventListener('click', () => {
        camp();
        updateUI();
        checkGameOver();
    });

    window.addEventListener('modalClosed', () => {
        setUIDisabled('travelDisabled', false);
        setUIDisabled('campDisabled', false);
        updateUI();
    });

    window.addEventListener('borderSuccess', () => {
        modifyStat('morale', 10);
        updateUI();
        checkGameOver();
        setUIDisabled('travelDisabled', false);
        setUIDisabled('campDisabled', false);
        updateUI();
    });

    window.addEventListener('borderFail', () => {
        modifyStat('cash', -20);
        modifyStat('morale', -5);
        updateUI();
        checkGameOver();
        setUIDisabled('travelDisabled', false);
        setUIDisabled('campDisabled', false);
        updateUI();
    });

    updateUI();
    initTooltips();
    requestAnimationFrame(draw);
});

document.body.addEventListener('click', e => {
    // interactions handled within individual screens
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        togglePauseMenu();
    }
});

