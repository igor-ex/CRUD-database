'use strict';

//Табличное представление для Controller
function TableView() {
    this.table = null; //ссылка на HTML-таблицу для отображения данных
    this.tableRows = null; //ссылка на список строк HTML-таблицы
    this.titleRowCount = 0; //количество строк в заголовке таблицы
}

TableView.prototype.init = function (tableName) {
    this.table = document.getElementById(tableName);
    this.tableRows = this.table.getElementsByTagName("TBODY")[0].children;
    this.titleRowCount = 1;
};

TableView.prototype.insertRow = function (index, e) {
    this.table.style.visibility = 'visible';
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
