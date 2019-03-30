
//Долговременное сохранение данных в LocalStorage
function Model(idLS) {
    this.idLS = idLS;
}

Model.prototype.load = function () {
    return localStorage.getItem(this.idLS);
};

Model.prototype.save = function (str) {
    localStorage.setItem(this.idLS, str);
};