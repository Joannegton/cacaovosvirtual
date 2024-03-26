document.addEventListener('DOMContentLoaded', () => {
    const hintDiv = document.getElementById('hint-div');
    const dicasRecebidas = document.getElementById('dicas-recebidas');

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

    window.showHint = showHint; // Torna a função showHint global para ser acessada pelo arquivo principal
});
