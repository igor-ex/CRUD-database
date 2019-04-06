'use strict';

function BackEnd() {

}

//функции доступа к серверу принимают объект с данными и два коллбэка - при успеехе или неуспехе
//операции. В колбэк будет положен объект данных
BackEnd.prototype.logIn = function (data, successCallback, failCallback) {
    sendPOST('/loginUser', data, successCallback, failCallback);
};

BackEnd.prototype.signUp = function (data, successCallback, failCallback) {
    sendPOST('/createUser', data, successCallback, failCallback);
};

BackEnd.prototype.checkSession = function (data, successCallback, failCallback) {
    sendPOST('/checkSession', data, successCallback, failCallback);
};

BackEnd.prototype.logOut = function (data, successCallback, failCallback) {
    sendPOST('/logoutUser', data, successCallback, failCallback);
};

BackEnd.prototype.create = function (data, successCallback, failCallback) {
    sendPOST('/addNewEntry', data, successCallback, failCallback);
};

BackEnd.prototype.delete = function (data, successCallback, failCallback) {
    sendPOST('/removeEntry', data, successCallback, failCallback);
};

BackEnd.prototype.update = function (data, successCallback, failCallback) {
    sendPOST('/updateEntry', data, successCallback, failCallback);
};

BackEnd.prototype.clear = function (data, successCallback, failCallback) {
    sendPOST('/clearEntry', data, successCallback, failCallback);
};

BackEnd.prototype.load = function (data, successCallback, failCallback) {
    sendPOST('/refreshAllEntries', data, successCallback, failCallback);
};

function sendPOST(url, data, callback, callbackFail) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                response = xhr.responseText;
            }
            if (xhr.status === 200) {
                callback(response);
            } else {
                console.log("response status", xhr.status, xhr.responseText);
                typeof callbackFail === 'function' ? callbackFail(response, xhr.status) : void 0;
                setError('server error, status ' + xhr.status);
            }
        }
    };
    //callback({error: false});
    let str;
    try {
        str = JSON.stringify(data);
    } catch {
        str = data;
    }
    xhr.send(str);
}
