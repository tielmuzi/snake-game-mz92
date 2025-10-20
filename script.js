// Snake Game - MZ92 Edition
// Desenvolvido por Salatiel Muzi

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Estado do jogo
        this.gameState = 'welcome'; // welcome, menu, game, paused, gameOver
        this.snake = [];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        this.gameSpeed = 150;
        this.gameLoop = null;
        this.gameStartTime = null;
        
        // Configurações
        this.settings = {
            difficulty: 'normal',
            theme: 'light',
            volume: 50,
            highContrast: false,
            visualPatterns: false
        };
        
        // Estatísticas
        this.stats = {
            maxScore: 0,
            totalFood: 0,
            totalTime: 0,
            gamesPlayed: 0
        };
        
        // Elementos de áudio
        this.audioElements = {
            menuMusic: document.getElementById('menu-music'),
            backgroundMusic: document.getElementById('background-music'),
            eatSound: document.getElementById('eat-sound'),
            deadSound: document.getElementById('dead-sound'),
            startSound: document.getElementById('start-sound'),
            pauseSound: document.getElementById('pause-sound'),
            continueSound: document.getElementById('continue-sound'),
            levelSound: document.getElementById('level-sound')
        };
        
        // Músicas de fundo por tema
        this.backgroundMusicFiles = {
            light: ['sounds/background/lightmode/'],
            dark: ['sounds/background/darkmode/'],
            neon: ['sounds/background/neonmode/']
        };
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.loadStats();
        this.setupEventListeners();
        this.applyTheme();
        this.updateStatsDisplay();
        this.startMenuMusic();
        
        // Mostrar tela de boas-vindas
        this.showScreen('welcome-screen');
    }
    
    // Gerenciamento de Telas
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.gameState = screenId.replace('-screen', '');
    }
    
    // Event Listeners
    setupEventListeners() {
        // Tela de boas-vindas - qualquer tecla, clique ou touch
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'welcome') {
                this.showScreen('main-menu');
                this.gameState = 'menu';
            }
        });
        
        // Tela de boas-vindas - clique do mouse
        document.addEventListener('click', (e) => {
            if (this.gameState === 'welcome') {
                this.showScreen('main-menu');
                this.gameState = 'menu';
            }
        });
        
        // Tela de boas-vindas - touch em dispositivos móveis
        document.addEventListener('touchstart', (e) => {
            if (this.gameState === 'welcome') {
                e.preventDefault(); // Previne comportamentos padrão do touch
                this.showScreen('main-menu');
                this.gameState = 'menu';
            }
        });
        
        // Botões do menu
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleAction(action);
            });
        });
        
        // Controles do jogo
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'game') {
                this.handleGameInput(e);
            }
        });
        
        // Configurações
        this.setupSettingsListeners();
    }
    
    setupSettingsListeners() {
        // Dificuldade
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.settings.difficulty = e.target.getAttribute('data-difficulty');
                this.saveSettings();
            });
        });
        
        // Tema
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.settings.theme = e.target.getAttribute('data-theme');
                this.applyTheme();
                this.saveSettings();
            });
        });
        
        // Volume
        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');
        
        volumeSlider.addEventListener('input', (e) => {
            this.settings.volume = parseInt(e.target.value);
            volumeValue.textContent = this.settings.volume + '%';
            this.updateAudioVolume();
            this.saveSettings();
        });
        
        // Acessibilidade
        document.getElementById('high-contrast').addEventListener('change', (e) => {
            this.settings.highContrast = e.target.checked;
            this.applyAccessibility();
            this.saveSettings();
        });
        
        document.getElementById('visual-patterns').addEventListener('change', (e) => {
            this.settings.visualPatterns = e.target.checked;
            this.applyAccessibility();
            this.saveSettings();
        });
    }
    
    handleAction(action) {
        switch (action) {
            case 'start-game':
                this.startGame();
                break;
            case 'settings':
                this.showScreen('settings-screen');
                break;
            case 'statistics':
                this.showScreen('statistics-screen');
                break;
            case 'credits':
                this.showScreen('credits-screen');
                break;
            case 'back-to-menu':
                this.backToMenu();
                break;
            case 'restart-game':
                this.startGame();
                break;
            case 'resume-game':
                this.resumeGame();
                break;
        }
    }
    
    handleGameInput(e) {
        const key = e.key.toLowerCase();
        
        // Pausa
        if (key === ' ' || key === 'escape') {
            e.preventDefault();
            this.pauseGame();
            return;
        }
        
        // Movimento
        if ((key === 'w' || key === 'arrowup') && this.dy === 0) {
            this.dx = 0;
            this.dy = -1;
        } else if ((key === 's' || key === 'arrowdown') && this.dy === 0) {
            this.dx = 0;
            this.dy = 1;
        } else if ((key === 'a' || key === 'arrowleft') && this.dx === 0) {
            this.dx = -1;
            this.dy = 0;
        } else if ((key === 'd' || key === 'arrowright') && this.dx === 0) {
            this.dx = 1;
            this.dy = 0;
        }
    }
    
    // Lógica do Jogo
    startGame() {
        this.showScreen('game-screen');
        this.gameState = 'game';
        this.resetGame();
        this.playSound('startSound');
        this.startBackgroundMusic();
        this.gameStartTime = Date.now();
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
    }
    
    resetGame() {
        // Posição inicial da cobra no centro
        const centerX = Math.floor(this.tileCount / 2);
        const centerY = Math.floor(this.tileCount / 2);
        
        this.snake = [{ x: centerX, y: centerY }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        this.gameSpeed = this.getDifficultySpeed();
        
        this.generateFood();
        this.updateGameDisplay();
        this.draw();
    }
    
    getDifficultySpeed() {
        const speeds = {
            easy: 200,
            normal: 150,
            hard: 100,
            extreme: 75
        };
        return speeds[this.settings.difficulty] || 150;
    }
    
    update() {
        if (this.gameState !== 'game') return;
        
        // Mover cobra apenas se houver direção
        if (this.dx === 0 && this.dy === 0) return;
        
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Verificar colisões
        if (this.checkCollision(head)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Verificar se comeu comida
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    checkCollision(head) {
        // Colisão com paredes
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // Colisão com próprio corpo
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        
        return false;
    }
    
    eatFood() {
        this.score += 10;
        this.foodEaten++;
        this.stats.totalFood++;
        
        this.playSound('eatSound');
        
        // Verificar se subiu de nível (a cada 5 comidas)
        if (this.foodEaten % 5 === 0) {
            this.level++;
            this.gameSpeed = Math.max(50, this.gameSpeed * 0.9); // Aumenta velocidade em 10%
            this.playSound('levelSound');
            
            // Reiniciar o loop com nova velocidade
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        }
        
        this.generateFood();
        this.updateGameDisplay();
    }
    
    generateFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }
    
    draw() {
        // Limpar canvas
        this.ctx.fillStyle = this.getThemeColor('background');
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar cobra
        const snakeColor = this.getThemeColor('snake');
        this.ctx.fillStyle = snakeColor;
        this.ctx.shadowBlur = this.settings.theme === 'neon' ? 20 : 10;
        this.ctx.shadowColor = snakeColor;
        
        for (let segment of this.snake) {
            this.ctx.fillRect(
                segment.x * this.gridSize + 2,
                segment.y * this.gridSize + 2,
                this.gridSize - 4,
                this.gridSize - 4
            );
        }
        
        // Desenhar comida
        const foodColor = this.getThemeColor('food');
        this.ctx.fillStyle = foodColor;
        this.ctx.shadowColor = foodColor;
        this.ctx.fillRect(
            this.food.x * this.gridSize + 2,
            this.food.y * this.gridSize + 2,
            this.gridSize - 4,
            this.gridSize - 4
        );
        
        // Resetar sombra
        this.ctx.shadowBlur = 0;
    }
    
    getThemeColor(element) {
        const themes = {
            light: {
                background: '#ffffff',
                snake: '#4CAF50',
                food: '#f44336'
            },
            dark: {
                background: '#121212',
                snake: '#51cf66',
                food: '#64338d'
            },
            neon: {
                background: '#000000',
                snake: '#00ffff',
                food: '#ff00ff'
            }
        };
        
        if (this.settings.highContrast) {
            return {
                background: '#000000',
                snake: '#ffff00',
                food: '#ff0000'
            }[element];
        }
        
        const color = themes[this.settings.theme][element];
        console.log(`Tema: ${this.settings.theme}, Elemento: ${element}, Cor: ${color}`);
        return color;
    }
    
    pauseGame() {
        if (this.gameState === 'game') {
            this.gameState = 'paused';
            clearInterval(this.gameLoop);
            this.showScreen('pause-screen');
            this.playSound('pauseSound');
            this.pauseBackgroundMusic();
        }
    }
    
    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'game';
            this.showScreen('game-screen');
            this.playSound('continueSound');
            this.resumeBackgroundMusic();
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        clearInterval(this.gameLoop);
        this.playSound('deadSound');
        this.stopBackgroundMusic();
        
        // Atualizar estatísticas
        this.stats.maxScore = Math.max(this.stats.maxScore, this.score);
        this.stats.gamesPlayed++;
        
        if (this.gameStartTime) {
            const gameTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
            this.stats.totalTime += gameTime;
        }
        
        this.saveStats();
        this.updateStatsDisplay(); // Atualizar display das estatísticas
        this.updateGameOverDisplay();
        this.showScreen('game-over-screen');
    }
    
    backToMenu() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        this.stopBackgroundMusic();
        this.startMenuMusic();
        this.showScreen('main-menu');
        this.gameState = 'menu';
    }
    
    updateGameDisplay() {
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('current-level').textContent = this.level;
        document.getElementById('current-speed').textContent = (1 + (this.level - 1) * 0.1).toFixed(1) + 'x';
    }
    
    updateGameOverDisplay() {
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('final-food').textContent = this.foodEaten;
    }
    
    updateStatsDisplay() {
        document.getElementById('max-score').textContent = this.stats.maxScore;
        document.getElementById('total-food').textContent = this.stats.totalFood;
        document.getElementById('total-time').textContent = Math.floor(this.stats.totalTime / 60) + 'm';
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
    }
    
    // Sistema de Áudio
    playSound(soundName) {
        const audio = this.audioElements[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.volume = this.settings.volume / 100;
            // Adicionar tratamento de erro mais robusto
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // Silenciar erros de áudio que não afetam a funcionalidade
                    if (!e.message.includes('NotAllowedError')) {
                        console.log('Aviso de áudio:', e.message);
                    }
                });
            }
        }
    }
    
    startMenuMusic() {
        const menuMusic = this.audioElements.menuMusic;
        if (menuMusic) {
            menuMusic.volume = this.settings.volume / 100;
            const playPromise = menuMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // Silenciar erros de autoplay - comum em navegadores modernos
                    if (!e.message.includes('NotAllowedError')) {
                        console.log('Aviso de música do menu:', e.message);
                    }
                });
            }
        }
    }
    
    startBackgroundMusic() {
        this.audioElements.menuMusic.pause();
        
        // Selecionar música aleatória baseada no tema
        const themeMusic = this.getRandomBackgroundMusic();
        const backgroundMusic = this.audioElements.backgroundMusic;
        
        if (backgroundMusic && themeMusic) {
            backgroundMusic.src = themeMusic;
            backgroundMusic.volume = this.settings.volume / 100;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    if (!e.message.includes('NotAllowedError')) {
                        console.log('Aviso de música de fundo:', e.message);
                    }
                });
            }
        }
    }
    
    getRandomBackgroundMusic() {
        const musicFiles = {
            light: [
                'sounds/background/lightmode/retro-8bit-1.mp3',
                'sounds/background/lightmode/retro-8bit-2.mp3',
                'sounds/background/lightmode/retro-8bit-3.mp3',
                'sounds/background/lightmode/retro-8bit-4.mp3',
                'sounds/background/lightmode/retro-8bit-5.mp3',
                'sounds/background/lightmode/retro-8bit-6.mp3',
                'sounds/background/lightmode/retro-8bit-7.mp3'
            ],
            dark: [
                'sounds/background/darkmode/darkmode1.mp3',
                'sounds/background/darkmode/darkmode2.mp3',
                'sounds/background/darkmode/darkmode3.mp3',
                'sounds/background/darkmode/darkmode4.mp3',
                'sounds/background/darkmode/darkmode5.mp3',
                'sounds/background/darkmode/darkmode6.mp3',
                'sounds/background/darkmode/darkmode7.mp3'
            ],
            neon: [
                'sounds/background/neon/neon1.mp3',
                'sounds/background/neon/neon2.mp3',
                'sounds/background/neon/neon3.mp3',
                'sounds/background/neon/neon4.mp3',
                'sounds/background/neon/neon5.mp3',
                'sounds/background/neon/neon6.mp3',
                'sounds/background/neon/neon7.mp3'
            ]
        };
        
        const themeFiles = musicFiles[this.settings.theme] || musicFiles.light;
        const randomIndex = Math.floor(Math.random() * themeFiles.length);
        return themeFiles[randomIndex];
    }
    
    pauseBackgroundMusic() {
        this.audioElements.backgroundMusic.pause();
    }
    
    resumeBackgroundMusic() {
        const playPromise = this.audioElements.backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                if (!e.message.includes('NotAllowedError')) {
                    console.log('Aviso ao retomar música de fundo:', e.message);
                }
            });
        }
    }
    
    stopBackgroundMusic() {
        this.audioElements.backgroundMusic.pause();
        this.audioElements.backgroundMusic.currentTime = 0;
    }
    
    updateAudioVolume() {
        Object.values(this.audioElements).forEach(audio => {
            audio.volume = this.settings.volume / 100;
        });
    }
    
    // Sistema de Temas
    applyTheme() {
        document.body.setAttribute('data-theme', this.settings.theme);
        
        // Atualizar botão ativo
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === this.settings.theme) {
                btn.classList.add('active');
            }
        });
    }
    
    applyAccessibility() {
        if (this.settings.highContrast) {
            document.body.setAttribute('data-accessibility', 'high-contrast');
        } else {
            document.body.removeAttribute('data-accessibility');
        }
        
        if (this.settings.visualPatterns) {
            document.body.setAttribute('data-visual-patterns', 'true');
        } else {
            document.body.removeAttribute('data-visual-patterns');
        }
        
        // Atualizar checkboxes
        document.getElementById('high-contrast').checked = this.settings.highContrast;
        document.getElementById('visual-patterns').checked = this.settings.visualPatterns;
    }
    
    // LocalStorage
    saveSettings() {
        localStorage.setItem('snakeGameSettings', JSON.stringify(this.settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('snakeGameSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
        
        // Aplicar configurações carregadas
        document.getElementById('volume-slider').value = this.settings.volume;
        document.getElementById('volume-value').textContent = this.settings.volume + '%';
        
        // Atualizar botões ativos
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-difficulty') === this.settings.difficulty) {
                btn.classList.add('active');
            }
        });
    }
    
    saveStats() {
        localStorage.setItem('snakeGameStats', JSON.stringify(this.stats));
    }
    
    loadStats() {
        const saved = localStorage.getItem('snakeGameStats');
        if (saved) {
            this.stats = { ...this.stats, ...JSON.parse(saved) };
        }
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.snakeGame = new SnakeGame();
});

// Prevenir zoom no mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Controles touch para mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!window.snakeGame || window.snakeGame.gameState !== 'game') return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Movimento horizontal
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0 && window.snakeGame.dx === 0) {
                // Swipe direita
                window.snakeGame.dx = 1;
                window.snakeGame.dy = 0;
            } else if (deltaX < 0 && window.snakeGame.dx === 0) {
                // Swipe esquerda
                window.snakeGame.dx = -1;
                window.snakeGame.dy = 0;
            }
        }
    } else {
        // Movimento vertical
        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0 && window.snakeGame.dy === 0) {
                // Swipe baixo
                window.snakeGame.dx = 0;
                window.snakeGame.dy = 1;
            } else if (deltaY < 0 && window.snakeGame.dy === 0) {
                // Swipe cima
                window.snakeGame.dx = 0;
                window.snakeGame.dy = -1;
            }
        }
    }
});