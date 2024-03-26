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

    let vidasRestantes = 3;

    const randomPositions = generateRandomPositions(7);

    randomPositions.forEach((position, index) => {
        const eggElement = document.createElement('div');
        eggElement.classList.add('egg');
        eggElement.setAttribute('data-egg-id', index + 1);
        eggElement.style.top = `${position.top}px`;
        eggElement.style.left = `${position.left}px`;
        eggElement.addEventListener('click', () => showQuestionModal());
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
        const randomQuestion = getRandomQuestion();
        questionText.textContent = randomQuestion.question;
        modal.style.display = 'block';

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            answerInput.value = '';
        });

        submitButton.addEventListener('click', () => {
            const userAnswer = answerInput.value.trim().toLowerCase();
            if (userAnswer === randomQuestion.answer.toLowerCase()) {
                alert('Resposta correta! Você Recebeu a primeira DICA!');
                modal.style.display = 'none';
                answerInput.value = '';
                showHint(randomQuestion);
            } else {
                alert('Resposta incorreta! Tente novamente.');
                answerInput.value = '';
                modal.style.display = 'none';
                vidasRestantes--; // Reduz uma vida
                updateVidas(); // Atualiza a exibição das vidas
            }
        });
    }

    function updateVidas() {
        vidasElement.textContent = `Vidas Restantes: ${vidasRestantes}`;
        if (vidasRestantes === 0) {
            alert('Game Over! Você perdeu todas as vidas.');
            // Adicione aqui o código para reiniciar o jogo ou outra ação desejada
        }
    }

    function getRandomQuestion() {
        const questions = [
            { id: 1, question: 'Quanto é 5 x 7?', answer: '35', hint: 'A resposta é um número múltiplo de 5 e 7.' },
            { id: 2, question: 'Qual é a capital do Brasil?', answer: 'brasilia', hint: 'É uma cidade planejada no centro-oeste do país.' },
            { id: 3, question: 'Quem escreveu "Dom Quixote"?', answer: 'cervantes', hint: 'Foi um escritor espanhol do século XVI.' },
            // Adicione mais perguntas conforme necessário
        ];

        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    let dicasUtilizadas = 0;
    const dicas = ['Onde você come', 'Onde você senta', 'Onde você apresenta'];

    function showHint(question) {
        hintDiv.textContent = `Dica: ${question.hint}`;
        hintDiv.style.display = 'block';

        if (dicasUtilizadas < 3) {
            const novaDica = document.createElement('p');
            novaDica.textContent = `Dica ${dicasUtilizadas + 1}: ${dicas[dicasUtilizadas]}`;
            dicasRecebidas.appendChild(novaDica);
            dicasUtilizadas++;
        }
    }

    updateVidas(); // Atualiza a exibição inicial das vidas
});
