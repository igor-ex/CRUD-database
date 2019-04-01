'use strict';

function User() {
    this.sessionIdentifier = null;
}

User.prototype.init = function () {
    //проверить есть ли данные о пользователе и установить user.sessionIdentifier;
    this.sessionIdentifier = 1;
    const logoutEl = document.getElementById('logOut');
    logoutEl.addEventListener('click', this.logOut);
};

User.prototype.isLoggedIn = function () {
    return true;
};

User.prototype.signUp = function (data) {
    const be = new BackEnd();
    be.signUp(data, response => {
        if (!response.err) {
            this.goToLogInPage();
            return true;
        } else {
            alert(response.message);
            return false;
        }
    }, response => {
        alert('server fails');
        return false;
    });
};

User.prototype.logIn = function (data) {
    //идентификатор сессии надо хранить в двух местах -
    // в этом объекте, и во врором месте
    // (если реализуеем) - куках или localStorage

    const be = new BackEnd();
    be.logIn(data, response => {
        if (!response.err) {
            this.saveIdentifier(response.id);
            this.goToMainPage();
            return true;
        } else {
            alert(response.message);
            return false;
        }
    }, response => {
        alert('server fails');
        return false;
    });
};

User.prototype.saveIdentifier = function (id) {
    localStorage.setItem("sessionIdentifier", id);
};

User.prototype.logOut = function () {
    localStorage.removeItem('sessionIdentifier');
    location.href = 'public/singIn (authorization).html';
};

User.prototype.goToMainPage = function () {
    location.href = '../CRUD & database.html';
};

User.prototype.goToLogInPage = function () {
    location.href = 'singIn (authorization).html';
};