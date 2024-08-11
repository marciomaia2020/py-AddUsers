document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');

    // Função para ajustar a largura do campo de entrada com base no texto
    function adjustInputWidth() {
        // Cria um elemento span para medir a largura do texto
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'pre';
        span.style.font = getComputedStyle(emailInput).font;
        document.body.appendChild(span);

        // Define o texto do span como o valor do input
        span.textContent = emailInput.value || emailInput.placeholder;

        // Ajusta a largura do input para a largura do span
        emailInput.style.width = `${span.offsetWidth}px`;

        // Remove o span após o cálculo
        document.body.removeChild(span);
    }

    // Ajusta a largura do campo de entrada quando o usuário digita
    emailInput.addEventListener('input', adjustInputWidth);

    // Ajusta a largura do campo de entrada quando o formulário é resetado
    document.querySelector('form').addEventListener('reset', function() {
        // Espera um pequeno intervalo para garantir que o campo de entrada seja limpo
        setTimeout(adjustInputWidth, 0);
    });

    // Ajusta a largura do campo de entrada quando a página é carregada
    adjustInputWidth();
});
