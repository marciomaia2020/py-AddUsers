document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('input', function() {
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
    });
});
