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

var regForm = document.getElementById('regForm');

var nameEl = document.getElementById('name');
var mailEl = document.getElementById('mail');
var oneEl = document.getElementById("password");
var twoEl = document.getElementById("password2");

const btnSingUp = document.getElementById("SignUp");

//regForm.addEventListener('submit', );
btnSingUp.addEventListener('click', submitListener);
function submitListener (event) {
    var name = nameEl.value;
    var loginNotEmpty = name.trim() !== '';

    var mail = mailEl.value;
    var mailIsMail = mail.indexOf('@') > 0;

    var one = oneEl.value;
    var two = twoEl.value;
    var comp_flag = one === two;

    var passNotEmpty = one.trim() !== '';

    if (loginNotEmpty && mailIsMail && comp_flag && passNotEmpty) {
        const user = new User;
        user.signUp({username: name, email: mail, password});
        return true; // пароли совпадают
    } else {
        if (!loginNotEmpty) {
            alert('Ошибка. Поле Логин не заполнено');
        }

        if (!mailIsMail) {
            alert('Ошибка! Поле email заполнено неправильно');
        }

        if (!passNotEmpty) {
            alert('Ошибка. Пароль не должен быть пустым');
        }

        if (!comp_flag) {
            alert("Ошибка! Пароли не совпадают.");
        }// пароли не совпадают
    }
    event.preventDefault();
    return false;
}

btnSingUp.addEventListener("click", saveLS);


const inputLs = document.querySelectorAll(".input-ls");

function saveLS() {
    var dataUser = {
        loginUser: inputLs[0].value,
        emailUser: inputLs[1].value,
        passwordUser: inputLs[2].value,
    };
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
}


//


