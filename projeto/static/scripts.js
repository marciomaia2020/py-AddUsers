alert("ola")
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const form = document.getElementById('user-form');

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
    //form.addEventListener('reset', function() {
    // Define um intervalo para garantir que o campo de entrada seja limpo antes do ajuste
    //setTimeout(adjustInputWidth, 100);
    // });

    // Ajusta a largura do campo de entrada quando a página é carregada
    adjustInputWidth();
});

const deleteButton = document.getElementById('delete-all');
const modal = document.getElementById('confirmation-modal');

deleteButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Função para confirmar e enviar a requisição
function confirmDelete() {
  // Envia uma requisição POST para a rota do seu servidor que deleta os dados
  fetch('/delete-all-data', {
    method: 'POST'
  })
  .then(response => {
    if (!response.ok) {
      // Tratar erros
    }
    // Atualizar a interface após a exclusão
    // ...
  })
  .catch(error => {
    // Tratar erros
  });
}
// Função para verificar se o email já existe
function checkEmailExists(newEmail, existingEmails) {
  return existingEmails.includes(newEmail);
}

// Função assíncrona para obter os emails existentes do servidor
async function fetchExistingEmails() {
  try {
    const response = await fetch('/get-existing-emails');
    const data = await response.json();
    return data.emails;
  } catch (error) {
    console.error('Erro ao obter emails existentes:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Validação do formulário
function validateForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;   


  // Adicione mais validações aqui, como verificar o comprimento mínimo e máximo dos campos, permitir apenas caracteres alfanuméricos, etc.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '' || email === '' || !emailRegex.test(email)) {
    return false;
  }

  return true;
}

// Obtém o formulário, os campos de entrada, o elemento para exibir mensagens de erro e a lista de emails existentes
const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const   
 errorMessage = document.getElementById('error-message');   

let existingEmails = [];

// Obtém os emails existentes do servidor
fetchExistingEmails()
  .then(emails => {
    existingEmails = emails;
  });

// Adiciona um ouvinte de evento ao formulário
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  errorMessage.textContent = ''; // Limpa a mensagem de erro anterior

  if (!validateForm()) {
    errorMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
    // Adicionar classes CSS para destacar os campos inválidos
    nameInput.classList.add('invalid');
    emailInput.classList.add('invalid');
    return;
  }

  if (checkEmailExists(email, existingEmails)) {
    errorMessage.textContent = 'Este email já está cadastrado.';
    return;
  }

  try {
    const response = await fetch('/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      form.reset();
      alert('Usuário cadastrado com sucesso!');
    } else {
      errorMessage.textContent = 'Erro ao cadastrar usuário.';
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    errorMessage.textContent = 'Ocorreu um erro inesperado.';
  }
});