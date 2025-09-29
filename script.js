// JavaScript é o cérebro do jogo, ele controla toda a lógica
let currentPlayer = 'X'; // Jogador atual (X ou O)
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tabuleiro do jogo
let gameActive = true; // Se o jogo está ativo
let score = { X: 0, O: 0 }; // Placar dos jogadores

// Elementos do DOM 
const cells = document.querySelectorAll('.cell'); 
const messageElement = document.getElementById('message');
const restartButton = document.querySelector('.restart-button');

// Combinações de vitória (linhas, colunas e diagonais)
const winningConditions = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6],  // Diagonal secundária
];

// Função para fazer uma jogada
function makeMove(cellIndex) {
    // Verifica se a célula está vazia e o jogo está ativo
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Marca a célula com o símbolo do jogador atual
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer.toLowerCase());
    cells[cellIndex].disabled = true;

    // Verifica se houve vitória
    if (checkWin()) { 
        gameActive = false;
        messageElement.textContent = `🎉 Jogador ${currentPlayer} venceu!`; // Mensagem da vitoria do jogador. 
        score[currentPlayer]++;
        updateScore();
        highlightWinningCells();
        return;
    }

    // Verifica se houve empate
    if (checkDraw()) {
        gameActive = false;
        messageElement.textContent = '🤝 Empate!'; // Mensagem de empate da partida. 
        return; 
    }

    // Alterna para o próximo jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    messageElement.textContent = `Vez do jogador ${currentPlayer}`; // Quando for a vez do oponente
}

// Função para verificar vitória
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Função para verificar empate
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Função para destacar células vencedoras
function highlightWinningCells() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            break;
        }
    }
}

// Função para reiniciar o jogo
function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Limpa o tabuleiro
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
        cell.disabled = false;
    });
    
    messageElement.textContent = `Vez do jogador ${currentPlayer}`;
}

// Função para atualizar o placar
function updateScore() {
    // Cria ou atualiza o elemento de placar
    let scoreElement = document.getElementById('score');
    if (!scoreElement) {
        scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.style.cssText = `
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #fff;
        `;
        document.querySelector('.game-board').parentNode.insertBefore(scoreElement, document.querySelector('.restart-button'));
    }
    
    scoreElement.innerHTML = `
        <div>Placar:</div>
        <div>Jogador X: ${score.X} | Jogador O: ${score.O}</div>
    `;
}

// Função para adicionar efeito sonoro (opcional)
function playSound(type) {
    // Cria um som simples usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'move') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'win') {
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        makeMove(index);
        playSound('move');
    });
});

restartButton.addEventListener('click', () => {
    restartGame();
    playSound('move');
});

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', () => {
    messageElement.textContent = `Vez do jogador ${currentPlayer}`;
    updateScore();
});

// Adiciona suporte para teclado (acessibilidade)
document.addEventListener('keydown', (event) => {
    if (event.key >= '1' && event.key <= '9') {
        const cellIndex = parseInt(event.key) - 1;
        if (cellIndex >= 0 && cellIndex < 9) {
            makeMove(cellIndex);
        }
    } else if (event.key === 'r' || event.key === 'R') {
        restartGame();
    }
});

// Adiciona instruções de teclado
function addKeyboardInstructions() {
    const instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.style.cssText = `
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        opacity: 0.8;
    `;
    instructions.innerHTML = '💡 Dica: Use as teclas 1-9 para jogar ou R para reiniciar';
    document.querySelector('.restart-button').parentNode.appendChild(instructions);
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', addKeyboardInstructions);