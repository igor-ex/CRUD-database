'use strict';

function User() {
    this.sessionIdentifier = null;
    this.backEnd = null;
}

User.prototype.init = function () {
    //проверить есть ли данные о пользователе и установить user.sessionIdentifier;
    this.isLoggedIn(res => {
        if (!res.err) {
            this.sessionIdentifier = this.getIdentifier();
            const usernameCont = document.getElementById('usernameCont');
            usernameCont.innerText = localStorage.getItem('userLogin');
        } else {
            let counter = 5;
            const notify = () => {
                if (counter <= 0) {
                    this.goToLogInPage();
                }
                setError(`You are not logged in and will be redirected in ${counter} sec`);
                counter--;
            };
            notify();
            setInterval(notify, 1000);
        }
    }, res => {
        setError('Ошибка сервера. Вы не можете добавлять данные в базу. ' + res.message);
    });

    const logoutEl = document.getElementById('logOut');
    logoutEl.addEventListener('click', this.logOut.bind(this));
};

User.prototype.isLoggedIn = function (callback, failCallback) {
    const sessionId = localStorage.getItem("sessionIdentifier");
    // if (sessionId === null) {
    //     return false;
    // }
    if (this.backEnd === null) {
        this.backEnd = new BackEnd();//плохое решение!!!
    }
    this.backEnd.checkSession({id: sessionId},callback, failCallback);
};

User.prototype.signUp = function (data) {
    const be = new BackEnd();
    be.signUp(data, response => {
        if (!response.err) {
            this.goToLogInPage();
            return true;
        } else {
            setError(response.message);
            return false;
        }
    }, response => {
        setError('server fails');
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
            localStorage.setItem('userLogin', data.username);
            this.goToMainPage();
            return true;
        } else {
            setError(response.message);
            return false;
        }
    }, response => {
        setError('server fails');
        return false;
    });
};

User.prototype.saveIdentifier = function (id) {
    localStorage.setItem("sessionIdentifier", id);
};

User.prototype.getIdentifier = function () {
    return localStorage.getItem("sessionIdentifier");
};

User.prototype.removeIdentifier = function () {
    localStorage.removeItem('sessionIdentifier');
};

User.prototype.logOut = function () {
    this.removeIdentifier();
    localStorage.removeItem('userLogin');
    if (this.backEnd === null) {
        this.backEnd = new BackEnd();//плохое решение!!!
    }
    this.backEnd.logOut(res => {
        if (!res.err) {
            location.href = 'authorization.html';
        }
    }, fail => {
        setError('cannot reach server while logging out');
    });
};

User.prototype.goToMainPage = function () {
    location.href = 'index.html';
};

User.prototype.goToLogInPage = function () {
    location.href = 'authorization.html';
};

function setError(str) {
    const cont = document.getElementById('errorMessages');
    cont.innerText = str;
}
