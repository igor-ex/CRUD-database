
//Управление данными
function Controller() {
    this.model = null;
    this.elementsList = [];

    this.views = [];  //Ссылки на Views которым нужно оповещение в случае изменений в контроллере
}

//Поиск элемента в массиве elementsList по его id
Controller.prototype.indexById = function (id) {
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

    if (this.indexById(e.id) === -1) {
        this.elementsList.splice(index, 0, e);

        //перерисовка всех связанных элементов отображения
        const arr = this.elementsList;
        this.views.forEach(function (view) {
            view.repaint('insert', index, arr)
        });

        return true;
    } else {
        return false;
    }
};

Controller.prototype.deleteElement = function (e) {
    const index = this.indexById(e.id);

    if (index < 0) {
        return false;
    }

    this.elementsList.splice(index, 1);

    //перерисовка всех связанных элементов отображения
    const arr = this.elementsList;
    this.views.forEach(function (view) {
        view.repaint('delete', index, arr)
    });

    return true;
};

Controller.prototype.updateElement = function (e) {
    const index = this.indexById(e.id);

    if (index < 0) {
        return false;
    }

    this.elementsList[index] = e;

    //перерисовка всех связанных элементов отображения
    const arr = this.elementsList;
    this.views.forEach(function (view) {
        view.repaint('update', index, arr)
    });

    return true;
};

Controller.prototype.clear = function () {
    this.elementsList.length = 0;

    //перерисовка всех связанных элементов отображения
    const arr = this.elementsList;
    this.views.forEach(function (view) {
        view.repaint('clear', 0, arr)
    });

    return true;
};

Controller.prototype.load = function () {
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