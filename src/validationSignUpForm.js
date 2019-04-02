'use strict';
// const email = document.getElementById("mail");
//
// email.addEventListener("input", function (event) {
//     if (email.validity.typeMismatch) {
//         email.setCustomValidity("Email address must be like this: \"blala@blala\"");
//     } else {
//         email.setCustomValidity("");
//     }
// });

const regForm = document.getElementById('regForm');
const nameEl = document.getElementById('name');
const mailEl = document.getElementById('mail');
const oneEl = document.getElementById('password');
const twoEl = document.getElementById('password2');
const error = document.getElementById('idDivError')
const btnSingUp = document.getElementById('SignUp');

//regForm.addEventListener('submit', );
btnSingUp.addEventListener('click', submitListener);
nameEl.addEventListener('input',clearError)
function submitListener (event) {
    const name = nameEl.value;
    const loginNotEmpty = name.trim() !== '';

    const mail = mailEl.value;
    const mailIsMail = mail.indexOf('@') > 0;

    const one = oneEl.value;
    const two = twoEl.value;
    const comp_flag = one === two;

    const passNotEmpty = one.trim() !== '';

    if (loginNotEmpty && mailIsMail && comp_flag && passNotEmpty) {
        const user = new User;
        user.signUp({username: name, email: mail, password});
        return true; // пароли совпадают
    } else {
        if (!loginNotEmpty) {
            error.innerHTML = 'Ошибка! Поле Логин не заполнено';
            return false;
        }

        if (!mailIsMail) {
            error.innerHTML = 'Ошибка! Поле email заполнено неправильно';
            return false;
        }

        if (!passNotEmpty) {
            error.innerHTML = 'Ошибка! Пароль не должен быть пустым';
            return false;
        }

        if (!comp_flag) {
            error.innerHTML = 'Ошибка! Пароли не совпадают.';

        }
    }
    event.preventDefault();
    return false;
}

function clearError () {
    error.innerHTML = '';
}
