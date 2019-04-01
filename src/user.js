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

User.prototype.logIn = function (userName, password) {
    //идентификатор сессии надо хранить в двух местах -
    // в этом объекте, и во врором месте
    // (если реализуеем) - куках или localStorage

    //тут лезем на сервер и пытаемся получить sessionIdentifier
    //кладем колбэк на функцию которая полезет на сервер, и то что дальше в этой функции
    //будет выполняться уже внутри колбэка!!!

    //this.saveSessionIdentifier(identifier);
    //this.sessionIdentifier =
    //this.goToMainPage()
};

User.prototype.saveIdentifier = function (identifier) {
    //сохранять в куках, локал сторидже или еще где-то
};

User.prototype.goToMainPage = function () {
    //переводит на главную страницу если удачно залогинился
    //с помощью location.href
};

User.prototype.goToLogInPage = function () {
    //переводит на страницу авторизации если не this.isLoggedIn()
    //с помощью location.href
};