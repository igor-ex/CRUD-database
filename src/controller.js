'use strict';

//Элемент-объект для хранения и отображения
function Entry(id, fName, lName, age) {
    this.id = id;
    this.lName = lName;
    this.fName = fName;
    this.age = age;
}


//Управление данными
function Controller() {
    this.model = null;
    this.elementsList = [];

    this.views = [];  //Ссылки на Views которым нужно оповещение в случае изменений в контроллере
    this.backEnd = false;
    this.user = null;
}

Controller.prototype.init = function () {
    this.user.init();
};

//Поиск элемента в массиве elementsList по его id
Controller.prototype.getIndexById = function (id) {
    let rez = -1;
    for (let i = 0; i < this.elementsList.length; i++) {
        if (this.elementsList[i].id === id) {
            rez = i;
            break;
        }
    }
    return rez;
};

Controller.prototype.insertElement = function (e, index) {
    //Если индекс вставки элемента не задан - вставка в самый конец
    if (arguments.length < 2) {
        index = this.elementsList.length;
    }
    //Проверка на корректость инекса вставки
    if (index > this.elementsList.length || index < 0) {
        throw "Index out of rage";
    }
    if (this.getIndexById(e.id) === -1) {//проверка на дубликат id
        const data = {};
        Object.assign(data, e);
        data.userID = this.user.sessionIdentifier;
        this.backEnd.create(data, response => {
            if (!response.err) {
                this.elementsList.splice(index, 0, e);
                //перерисовка всех связанных элементов отображения
                const arr = this.elementsList;
                this.views.forEach(function (view) {
                    view.repaint('insert', index, arr)
                });
            } else {
                setError(response.message);
            }
        });
        return true;
    } else {
        return false;
    }
};

Controller.prototype.deleteElement = function (id) {
    //const index = this.getIndexById(e.id);
    const index = this.getIndexById(id);

    if (index < 0) {
        return false;
    }
    const data = {id, userID: this.user.sessionIdentifier};
    this.backEnd.delete(data, data => {
        if (!data.err) {
            this.elementsList.splice(index, 1);

            //перерисовка всех связанных элементов отображения
            const arr = this.elementsList;
            this.views.forEach(function (view) {
                view.repaint('delete', index, arr)
            });
        } else {
            setError(data.message);
        }
    });
    return true;
};

Controller.prototype.updateElement = function (e) {
    const index = this.getIndexById(e.id);

    if (index < 0) {
        return false;
    }
    const data = {};
    Object.assign(data, e);
    data.userID = this.user.sessionIdentifier;
    this.backEnd.update(data, data => {
        if (!data.err) {
            this.elementsList[index] = e;

            //перерисовка всех связанных элементов отображения
            const arr = this.elementsList;
            this.views.forEach(function (view) {
                view.repaint('update', index, arr)
            });
        } else {
            setError(data.message);
        }
    });
    return true;
};

Controller.prototype.clear = function () {
    this.backEnd.clear(this.user.sessionIdentifier, data => {
        if (!data.error) {
            this.elementsList.length = 0;

            //перерисовка всех связанных элементов отображения
            const arr = this.elementsList;
            this.views.forEach(function (view) {
                view.repaint('clear', 0, arr)
            });
        } else {
            setError(data.message);
        }
    });
    return true;
};

Controller.prototype.load = function () {
    this.backEnd.load(this.user.sessionIdentifier, data => {
        if (!data.err) {
            //отрисовка всех связанных элементов отображения
            this.views.forEach(function (view) {
                view.repaint('fullupdate', 0, data.rows)
            });
        } else {
            setError(data.message);
        }
    });
    return true;
};

Controller.prototype.loadLocalStorage = function () {
    this.clear();

    //Работа без хранения данных
    if (!this.model) {
        return false;
    }

    const str = this.model.load();
    if (!str) {
        //Сохранения не было
        return false;
    }

    this.elementsList = JSON.parse(str);
    //перерисовка всех связанных элементов отображения
    const arr = this.elementsList;
    this.views.forEach(function (view) {
        view.repaint('fullupdate', 0, arr)
    });

    return true;
};

Controller.prototype.save = function () {
    if (this.model) {
        this.model.save(JSON.stringify(this.elementsList));
        return true;
    } else {
        return false;
    }
};

function setError(str) {
    const cont = document.getElementById('errorMessages');
    cont.innerText = str;
}