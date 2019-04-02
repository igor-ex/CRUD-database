const nameEl = document.getElementById('name');
const passEl = document.getElementById('password');
const btnSingIn = document.getElementById('signIn');
const error = document.getElementById('idDivError');


btnSingIn.addEventListener('click', submitListener);
nameEl.addEventListener('input',()=> {error.innerHTML = '';});
passEl.addEventListener('input',()=> {error.innerHTML = '';});
function submitListener(event) {
    const name = nameEl.value;
    const loginNotEmpty = name.trim() !== '';

    const pass = passEl.value;
    const passNotEmpty = pass.trim() !== '';

    if (loginNotEmpty && passNotEmpty) {
        const user = new User;
        user.logIn({username: name, password: pass});
        return true;
    } else {
        if (!loginNotEmpty) {
            error.innerHTML = 'Ошибка. Поле Логин не заполнено';
            return false;
        }

        if (!passNotEmpty) {
            error.innerHTML = 'Ошибка. Пароль не должен быть пустым';
        }
    }
    event.preventDefault();
    return false;
}
