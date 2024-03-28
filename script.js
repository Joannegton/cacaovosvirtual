document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const modal = document.getElementById('question-modal');
    const closeButton = document.querySelector('.close');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');
    const hintDiv = document.getElementById('hint-div');
    const vidasElement = document.getElementById('vidas');
    const dicasRecebidas = document.getElementById('dicas-recebidas');

    let vidasRestantes = 7;
    let randomQuestion;

    const randomPositions = generateRandomPositions(7);

    randomPositions.forEach((position, index) => {
        const eggElement = document.createElement('div');
        eggElement.classList.add('egg');
        eggElement.setAttribute('data-egg-id', index + 1);
        eggElement.style.top = `${position.top}px`;
        eggElement.style.left = `${position.left}px`;
        eggElement.addEventListener('click', showQuestionModal);
        gameBoard.appendChild(eggElement);
    });

    function generateRandomPositions(numEggs) {
        const positions = [];
        const boardWidth = gameBoard.clientWidth;
        const boardHeight = gameBoard.clientHeight;

        for (let i = 0; i < numEggs; i++) {
            const top = Math.floor(Math.random() * (boardHeight - 100));
            const left = Math.floor(Math.random() * (boardWidth - 100));
            positions.push({ top, left });
        }

        return positions;
    }

    function showQuestionModal() {
        randomQuestion = getRandomQuestion();
        questionText.textContent = randomQuestion.question;
        modal.style.display = 'block';
    
        closeButton.addEventListener('click', closeModal);
        
        submitButton.addEventListener('click', submitButtonClick);
    }

    function closeModal() {
        modal.style.display = 'none';
        answerInput.value = '';
        closeButton.removeEventListener('click', closeModal);
        submitButton.removeEventListener('click', submitButtonClick);
    }
    
    function submitButtonClick() {
        // Desabilita o botão após o primeiro clique
        submitButton.disabled = true;
    
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === randomQuestion.answer.toLowerCase()) {
            alert('Resposta correta! Você Recebeu a primeira DICA!');
            modal.style.display = 'none';
            answerInput.value = '';
            showHint(randomQuestion);
            submitButton.disabled = false;
        } else {
            answerInput.value = '';
            modal.style.display = 'none';
            vidasRestantes = vidasRestantes - 1;
            submitButton.disabled = false;
            updateVidas(); 
        }
    }
    
    submitButton.addEventListener('click', submitButtonClick);

    function updateVidas() {
        vidasElement.textContent = `Vidas Restantes: ${vidasRestantes}`;
        if (vidasRestantes === 0) {
            alert('Game Over! Você perdeu todas as vidas.\nConfirme para reiniciar.');
            window.location.reload();
        }
    }

    function getRandomQuestion() {
        const questions = [
            { id: 1, question: 'Quanto é 5 x 7?', answer: '35' },
            { id: 2, question: 'Qual é a capital do Brasil?', answer: 'brasilia' },
            { id: 3, question: 'Quem escreveu "Dom Quixote"?', answer: 'cervantes' },
            { id: 4, question: 'Quem pintou a "Mona Lisa"?', answer: 'leonardo da vinci' },
            { id: 5, question: 'Qual é a maior cidade do Brasil?', answer: 'sao paulo' },
            { id: 6, question: 'Quem foi o primeiro presidente do Brasil?', answer: 'deodoro da fonseca' },
            { id: 7, question: 'Qual é o maior planeta do sistema solar?', answer: 'jupiter' },
            { id: 8, question: 'Qual é a raiz quadrada de 64?', answer: '8' },
            { id: 9, question: 'Qual é o resultado de 7 elevado a 2?', answer: '49' },
            { id: 10, question: 'Quem pintou a "Noite Estrelada"?', answer: 'vincent van gogh' },
            { id: 11, question: 'Qual é o resultado de 4³?', answer: '64' },
            { id: 12, question: 'Quanto é 25% de 80?', answer: '20' },
            { id: 13, question: 'Quem foi o primeiro homem a pisar na Lua?', answer: 'neil armstrong' },
            { id: 14, question: 'Qual é o maior oceano do mundo?', answer: 'oceano pacifico' },
            { id: 15, question: 'Qual é a raiz quadrada de 81?', answer: '9' },
            { id: 16, question: 'Qual é o maior rio do mundo?', answer: 'amazonas' },
            { id: 17, question: 'Qual é o resultado de 8 + 5?', answer: '13' },
            { id: 18, question: 'Qual é o maior deserto do mundo?', answer: 'deserto do saara' },
            { id: 19, question: 'Quem foi o presidente dos Estados Unidos durante a Segunda Guerra Mundial?', answer: 'franklin roosevelt' },
            { id: 20, question:  'Qual é o animal símbolo do Brasil?', answer: 'sabia-laranjeira'},
            { id: 21, question: 'Qual é o maior animal do mundo?', answer: 'baleia azul' }
        ];
        

        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    let dicasUtilizadas = 0;
    const conjuntodicas = {
        'cadeira refeitorio': ['Onde você come', 'Onde você senta', 'Onde você apresenta'],
        'porta do banheira': ['O refúgio dos pensamentos profundos', 'Esconde o segredo da higiene', 'Se fechar, dá privacidade; se abrir, liberdade'],
        'hidrante': ['Onde a pressão é controlada, você encontra a chave', 'Aqui é onde a força contra o fogo esconde algo valioso', 'Na fonte da segurança contra incêndios é o caminho para descobrir.'],
        'lixo': ['Onde os objetos indesejados vão', 'Onde se livra do que não serve mais', 'Onde você descarta o que não precisa mais'],
        'bebedouro': ['Oásis em meio ao deserto', 'Ponto de encontro para conversas refrescantes', 'Onde a água é servida']
    };
    
    

    function showHint() {
  
        if (dicasUtilizadas < 3) {
            const novaDica = document.createElement('p');
            const dica = conjuntodicas['cadeira refeitorio'] //mudar o local
            novaDica.textContent = `Dica ${dicasUtilizadas + 1}: ${dica[dicasUtilizadas]}`;
            dicasRecebidas.appendChild(novaDica);
            dicasUtilizadas++;
        }
    }

    updateVidas(); // Atualiza a exibição inicial das vidas
});
