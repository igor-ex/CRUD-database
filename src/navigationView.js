'use strict';

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
    this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), 0);
};

NavigationView.prototype.addEnd = function () {
    this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
};

NavigationView.prototype.addMiddle = function () {
    this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), Math.round(this.controller.elementsList.length / 2));
};

NavigationView.prototype.update = function () {
    this.controller.updateElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
};

NavigationView.prototype.delElement = function () {
    //this.controller.deleteElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
    this.controller.deleteElement(this.inpId.value);
};

NavigationView.prototype.clear = function () {
    this.controller.clear();
};

NavigationView.prototype.load = function () {
    this.controller.loadLocalStorage();
};

NavigationView.prototype.save = function () {
    this.controller.save();
};