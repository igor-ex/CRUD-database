'use strict';

//Элемент-объект для хранения и отображения
class Entry {
    constructor(id, fName, lName, age) {
        this.id = id;
        this.lName = lName;
        this.fName = fName;
        this.age = age;
    }
}

//Управление данными
class Controller {
    constructor() {
        this.model = null;
        this.elementsList = [];

        this.views = [];  //Ссылки на Views которым нужно оповещение в случае изменений в контроллере
        this.backEnd = null;
        this.user = null;

        this.arrError = [];
    }

    init() {
        this.user.init();
        this.load();
    }

//Поиск элемента в массиве elementsList по его id
    getIndexById(id) {
        let rez = -1;
        for (let i = 0; i < this.elementsList.length; i++) {
            if (this.elementsList[i].id === id) {
                rez = i;
                break;
            }
        }
        return rez;
    }

    checkElementFields(e) {
        const arrError = [];

        if (!e.id || !isNumeric(e.id)) {
            arrError.push({entryField: 'id', errStr: 'Неправильно введено поле Id(целое число >0)'});
        }

        if (!e.fName || typeof (e.fName) !== 'string') {
            arrError.push({entryField: 'fName', errStr: 'Неправильно введено поле First Name'});
        }

        if (!e.lName || typeof (e.lName) !== 'string') {
            arrError.push({entryField: 'lName', errStr: 'Неправильно введено поле Last Name'});
        }

        if (!e.age || !isNumeric(e.age) || e.age <= 0 || e.age > 130) {
            arrError.push({entryField: 'age', errStr: 'Неправильно введено поле Age (0<Age<130)'});
        }
        return arrError;
    }

    insertElement(e, index) {
        //Если индекс вставки элемента не задан - вставка в самый конец
        if (arguments.length < 2) {
            index = this.elementsList.length;
        }
        //Проверка на корректость инекса вставки
        if (index > this.elementsList.length || index < 0) {
            throw "Index out of rage";
        }

        //Проверка значений полей элемента
        this.arrError = this.checkElementFields(e);
        if(this.arrError.length > 0) {
            return false;
        }

        e.id = parseInt(e.id);
        e.age = parseInt(e.age);

        if (this.getIndexById(e.id) === -1) {//проверка на дубликат id
            const data = {};
            Object.assign(data, e);
            data.userID = this.user.sessionIdentifier;

            return new Promise((resolve, reject) => {
                this.backEnd.create(data, response => {
                    if (!response.err) {
                        this.elementsList.splice(index, 0, e);
                        //перерисовка всех связанных элементов отображения
                        const arr = this.elementsList;
                        this.views.forEach(function (view) {
                            view.repaint('insert', index, arr)
                        });
                        resolve();
                    } else {
                        //setError(response.message);
                        reject(response.message);
                    }
                }, failResponse => {
                    reject('server error')
                });
            });
        } else {
            this.arrError.push({entryField: 'id', errStr:'Такой Id уже имеется, введите уникальный'});
            return false;
        }
    }

    deleteElement(id) {
        id = parseInt(id);
        const index = this.getIndexById(id);

        if (index < 0) {
            this.arrError.push({entryField: 'id', errStr: 'Тaкой строки нет в таблице'});
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
                //   setError(data.message);
                this.arrError.push({entryField: 'id', errStr: data.message});
            }
        });
        return true;
    }

    updateElement(e) {
        this.arrError = [];
        e.id = parseInt(e.id);
        e.age = parseInt(e.age);

        //Проверка на существование элемента
        const index = this.getIndexById(e.id);
        if (index < 0) {
            this.arrError.push({entryField: 'id', errStr: 'Тaкой строки нет в таблице, нажмите Insert'});
            return false;
        }

        //Проверка значений полей элемента
        this.arrError = this.checkElementFields(e);
        if(this.arrError.length > 0) {
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
//            setError(data.message);
                this.arrError.push({entryField: 'id', errStr:data.message});
            }
        });

        return true;
    }

    clear() {
        this.backEnd.clear({userID: this.user.sessionIdentifier}, data => {
            if (!data.error) {
                this.elementsList.length = 0;

                //перерисовка всех связанных элементов отображения
                const arr = this.elementsList;
                this.views.forEach(function (view) {
                    view.repaint('clear', 0, arr)
                });
            } else {
//            setError(data.message);
                this.arrError.push({entryField: 'id', errStr:data.message});
            }
        });
        return true;
    }

    load() {

        this.backEnd.load({userID: this.user.sessionIdentifier}, data => {
            if (!data.err) {
                this.elementsList = data.rows;
                //отрисовка всех связанных элементов отображения
                this.views.forEach(function (view) {
                    view.repaint('fullupdate', 0, data.rows)
                });
            } else {
//            setError(data.message);
                this.arrError.push({entryField: 'id', errStr:data.message});
            }
        });
        return true;
    }

    loadLocalStorage() {
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
    }

    save() {
        if (this.model) {
            this.model.save(JSON.stringify(this.elementsList));
            return true;
        } else {
            return false;
        }
    }
}

function setError(str) {
    const cont = document.getElementById('errorMessages');
    cont.innerText = str;
}



function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
