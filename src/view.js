
//Управление для Controller
function NavigationView() {
    this.btnAddStart = null;
    this.btnAddMiddle = null;
    this.btnAddEnd = null;
    this.btnSaveLs = null;
    this.btnReadLs = null;
    this.btnClearLsTab = null;
    this.btnDelElement = null;

    this.inpId = null;
    this.inpFName = null;
    this.inpLName = null;
    this.inpAge = null;

    this.controller = null;
}

NavigationView.prototype.init = function (controller) {
    this.btnAddStart = document.getElementById('addStart');
    this.btnAddMiddle = document.getElementById('addMiddle');
    this.btnAddEnd = document.getElementById('addEnd');
    this.btnSaveLs = document.getElementById('saveLs');
    this.btnReadLs = document.getElementById('readLs');
    this.btnClearLsTab = document.getElementById('clearLSTab');
    this.btnDelElement = document.getElementById('delElement');
    this.btnUpdate = document.getElementById('updateData');

    this.inpId = document.getElementById('Id');
    this.inpFName = document.getElementById('fName');
    this.inpLName = document.getElementById('lName');
    this.inpAge = document.getElementById('age');

    this.controller = controller;

    if (this.btnAddStart) {
        this.btnAddStart.addEventListener('click', this.addStart.bind(this));
    }

    if (this.btnAddMiddle) {
        this.btnAddMiddle.addEventListener('click', this.addMiddle.bind(this));
    }

    if (this.btnAddEnd) {
        this.btnAddEnd.addEventListener('click', this.addEnd.bind(this));
    }

    if (this.btnSaveLs) {
        this.btnSaveLs.addEventListener('click', this.save.bind(this));
    }

    if (this.btnReadLs) {
        this.btnReadLs.addEventListener('click', this.load.bind(this));
    }

    if (this.btnClearLsTab) {
        this.btnClearLsTab.addEventListener('click', this.clear.bind(this));
    }

    if (this.btnDelElement) {
        this.btnDelElement.addEventListener('click', this.delElement.bind(this));
    }

    if (this.btnUpdate) {
        this.btnUpdate.addEventListener('click', this.update.bind(this));
    }
};

NavigationView.prototype.addStart = function () {
    this.controller.insertElement(new Element(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), 0);
};

NavigationView.prototype.addEnd = function () {
    this.controller.insertElement(new Element(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
};

NavigationView.prototype.addMiddle = function () {
    this.controller.insertElement(new Element(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), Math.round(this.controller.elementsList.length / 2));
};

NavigationView.prototype.update = function () {
    this.controller.updateElement(new Element(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
};

NavigationView.prototype.delElement = function () {
    this.controller.deleteElement(new Element(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
};

NavigationView.prototype.clear = function () {
    this.controller.clear();
};

NavigationView.prototype.load = function () {
    this.controller.load();
};

NavigationView.prototype.save = function () {
    this.controller.save();
};

//Табличное представление для Controller
function TableView() {
    this.table = null; //ссылка на HTML-таблицу для отображения данных
    this.tableRows = null; //ссылка на список строк HTML-таблицы
    this.titleRowCount = 0; //количество строк в заголовке таблицы
}

TableView.prototype.init = function (tableName) {
    this.table = document.getElementById(tableName);
    this.tableRows = this.table.getElementsByTagName("TBODY")[0].children;
    this.titleRowCount = 2;
};

TableView.prototype.insertRow = function (index, e) {
    const tbody = this.table.getElementsByTagName("TBODY")[0];
    const row = tbody.insertRow(index); //создание новой строки

    //создание и заполнение ячеек
    const td1 = document.createElement("TD");
    td1.appendChild(document.createTextNode(e.id));
    const td2 = document.createElement("TD");
    td2.appendChild(document.createTextNode(e.fName));
    const td3 = document.createElement("TD");
    td3.appendChild(document.createTextNode(e.lName));
    const td4 = document.createElement("TD");
    td4.appendChild(document.createTextNode(e.age));
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
};

TableView.prototype.updateRow = function (index, e) {
    this.tableRows[index].children[1].innerText = e.fName;
    this.tableRows[index].children[2].innerText = e.lName;
    this.tableRows[index].children[3].innerText = e.age;
};

TableView.prototype.deleteRow = function (index) {
    this.tableRows[index].remove();
};

TableView.prototype.clearAllRow = function () {
    for (let i = this.tableRows.length - 1; i >= this.titleRowCount; i--) {
        this.tableRows[i].remove();
    }
};

TableView.prototype.insertAllRow = function (list) {
    list.forEach((e, index) => this.insertRow(index + this.titleRowCount, e));
};

TableView.prototype.repaint = function (operation, index, list) {
    switch (operation) {
        case 'clear': {
            this.clearAllRow();
            break;
        }
        case 'insert': {
            this.insertRow(index + this.titleRowCount, list[index]);
            break;
        }
        case 'update': {
            this.updateRow(index + this.titleRowCount, list[index]);
            break;
        }
        case 'delete': {
            this.deleteRow(index + this.titleRowCount);
            break;
        }
        case 'fullupdate': {
            this.clearAllRow();
            this.insertAllRow(list);
            break;
        }
    }
};