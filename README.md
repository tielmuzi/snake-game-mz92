# 🐍 Snake Game - MZ92 Edition

Um jogo da cobrinha moderno e responsivo desenvolvido com HTML5, CSS3 e JavaScript puro, com múltiplos temas, sistema de áudio completo e recursos de acessibilidade.

## 🎮 [**JOGAR AGORA**](https://seuusuario.github.io/snake-game-mz92)

![Snake Game Preview](https://img.shields.io/badge/Status-Online-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ **Características Principais**

### 🎨 **Três Temas Visuais**
- **🌞 Modo Claro:** Design clean com cores suaves
- **🌙 Modo Escuro:** Visual moderno com cobra verde e comida roxa
- **💫 Modo Neon:** Estilo cyberpunk com efeitos brilhantes

### 🎵 **Sistema de Áudio Completo**
- Música de fundo temática para cada modo
- Efeitos sonoros para todas as ações (comer, game over, pause, etc.)
- Controle de volume integrado (0-100%)
- Seleção aleatória de músicas por tema

### ⚙️ **Configurações Avançadas**
- **4 Níveis de Dificuldade:** Fácil, Normal, Difícil, Extremo
- **Progressão de Velocidade:** +10% a cada 5 comidas coletadas
- **Persistência:** Todas as configurações salvas no localStorage

### ♿ **Recursos de Acessibilidade**
- Modo de alto contraste
- Padrões visuais para distinguir elementos
- Design responsivo para todos os dispositivos
- Controles touch para mobile
- **Múltiplas formas de interação:** teclado, mouse e touch

---

## 🎯 **Como Jogar**

### **Controles Desktop:**
- **W, A, S, D** ou **Setas direcionais** para mover
- **Espaço** para pausar/continuar
- **Esc** para voltar ao menu
- **Qualquer tecla, clique ou toque** na tela de boas-vindas para começar

### **Controles Mobile:**
- **Swipe gestures** para direcionar a cobra
- **Toque** nos botões de controle
- **Toque na tela** de boas-vindas para começar

### **Objetivo:**
- Colete comida para crescer e aumentar sua pontuação
- Evite colidir com as paredes ou com o próprio corpo
- A velocidade aumenta progressivamente a cada nível

---

## 📊 **Sistema de Estatísticas**

O jogo rastreia automaticamente e atualiza em tempo real:
- 🏆 **Pontuação Máxima** - Seu melhor score de todos os tempos
- 🍎 **Total de Comidas Coletadas** - Contador acumulativo de todas as partidas
- ⏱️ **Tempo Total de Jogo** - Tempo acumulado jogando (em minutos)
- 🎮 **Número de Jogos Jogados** - Total de partidas completadas

*Todas as estatísticas são salvas automaticamente no localStorage do seu navegador e atualizadas após cada partida.*

---

## 🛠️ **Tecnologias Utilizadas**

- **HTML5 Canvas** - Renderização do jogo
- **CSS3** - Estilização e animações
- **JavaScript ES6+** - Lógica do jogo
- **Web Audio API** - Sistema de som
- **localStorage** - Persistência de dados
- **Responsive Design** - Compatibilidade mobile

---

## 🚀 **Instalação e Uso**

### **Opção 1: Jogar Online**
Acesse diretamente: [Snake Game MZ92](https://seuusuario.github.io/snake-game-mz92)

### **Opção 2: Executar Localmente**
```bash
# Clone o repositório
git clone https://github.com/seuusuario/snake-game-mz92.git

# Entre na pasta
cd snake-game-mz92

# Inicie um servidor local
python -m http.server 8000
# ou
npx serve .

# Acesse no navegador
http://localhost:8000
```

---

## 📁 **Estrutura do Projeto**

```
snake-game-mz92/
├── index.html          # Página principal
├── styles.css          # Estilos e temas
├── script.js           # Lógica do jogo
├── sounds/             # Arquivos de áudio
│   ├── background/     # Músicas de fundo por tema
│   │   ├── darkmode/
│   │   ├── lightmode/
│   │   └── neon/
│   ├── effects/        # Efeitos sonoros
│   └── menu/           # Música do menu
└── README.md           # Este arquivo
```

---

## 🎨 **Temas e Cores**

### **Modo Claro**
- Fundo: Branco limpo
- Cobra: Verde clássico (#4CAF50)
- Comida: Vermelho vibrante (#f44336)

### **Modo Escuro**
- Fundo: Cinza escuro (#121212)
- Cobra: Verde claro (#51cf66)
- Comida: Roxo escuro (#64338d)

### **Modo Neon**
- Fundo: Preto absoluto (#000000)
- Cobra: Ciano brilhante (#00ffff)
- Comida: Rosa neon (#ff00ff)

---

## 🔧 **Configurações Disponíveis**

| Configuração | Opções | Padrão |
|--------------|--------|--------|
| **Dificuldade** | Fácil, Normal, Difícil, Extremo | Normal |
| **Tema** | Claro, Escuro, Neon | Claro |
| **Volume** | 0% - 100% | 50% |
| **Acessibilidade** | Alto Contraste, Padrões Visuais | Desabilitado |

---

## 📱 **Compatibilidade**

- ✅ **Desktop:** Chrome, Firefox, Safari, Edge
- ✅ **Mobile:** iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Tablet:** Todos os navegadores modernos
- ✅ **Responsivo:** Adapta-se a qualquer tamanho de tela

---

## 🤝 **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 **Desenvolvedor**

**Salatiel Muzi**
- 🌐 Portfolio: [Em breve]
- 📧 Email: [seu-email@exemplo.com]
- 💼 LinkedIn: [Seu LinkedIn]

---

## 🎉 **Agradecimentos**

- Inspirado no clássico jogo Snake
- Músicas e efeitos sonoros de domínio público
- Comunidade open source por ferramentas e inspiração

---

<div align="center">

**© 2025 MZ92. Todos os direitos reservados. Desenvolvido por Salatiel Muzi.**

⭐ **Se você gostou do projeto, deixe uma estrela!** ⭐

</div>