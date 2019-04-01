'use strict';

function User() {
    this.sessionIdentifier = null;
}

User.prototype.init = function () {
    //проверить есть ли данные о пользователе и установить user.sessionIdentifier;
    this.sessionIdentifier = 1;
};

User.prototype.isLoggedIn = function () {
    return true;
};

User.prototype.signUp = function (data) {
    const be = new BackEnd();
    be.signUp(data, response => {
        if (!response.err) {
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

User.prototype.goToMainPage = function () {
    //переводит на главную страницу если удачно залогинился
    //с помощью location.href
};

User.prototype.goToLogInPage = function () {
    //переводит на страницу авторизации если не this.isLoggedIn()
    //с помощью location.href
};