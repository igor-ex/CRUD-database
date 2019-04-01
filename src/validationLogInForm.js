
var nameEl = document.getElementById('name');
var passEl = document.getElementById("password");

const btnSingIn = document.getElementById("signIn");

btnSingIn.addEventListener('click', submitListener);
function submitListener (event) {
    var name = nameEl.value;
    var loginNotEmpty = name.trim() !== '';

    var pass = passEl.value;
    var passNotEmpty = pass.trim() !== '';

    if (loginNotEmpty && passNotEmpty) {
        const user = new User;
        user.logIn({username: name, password: pass});
        return true;
    } else {
        if (!loginNotEmpty) {
            alert('Ошибка. Поле Логин не заполнено');
        }

        if (!passNotEmpty) {
            alert('Ошибка. Пароль не должен быть пустым');
        }
    }
    event.preventDefault();
    return false;
}