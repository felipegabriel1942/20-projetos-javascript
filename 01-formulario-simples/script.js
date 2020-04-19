const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Mostrar mensagem de erro
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Mostrar mensagem de sucesso
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Verificar se email é valido
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email não é valido');
    }
}

// Verificar se campos obrigátorios estão validos
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} é obrigatorio(a)`);
        } else {
            showSuccess(input);
        }
    });
}

// Verificar se senhas são iguais 
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Senhas diferentes');
    } else {
        showSuccess(input1);
        showSuccess(input2);
    }
}

// Verifica tamanho do valor no input
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} deve ter no mínimo ${min} caracteres `);
    } else if (input.value.length < min) {
        showError(input, `${getFieldName(input)} deve ter no máximo ${max} caracteres`)
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    if (input.id == 'username') {
        return 'Nome do usuário';
    } else if (input.id == 'email') {
        return 'Email'
    } else if (input.id == 'password') {
        return 'Senha'
    } else if (input.id == 'password2') {
        return 'Confirmação de senha'
    }
}


// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});