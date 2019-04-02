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

    this.errInpId = document.getElementById('inputIdError');
    this.errInpFName = document.getElementById('inputFNameError');
    this.errInpLName = document.getElementById('inputLNameError');
    this.errInpAge = document.getElementById('inputAgeError');


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

    if (this.inpId) {
        this.inpId.addEventListener('input', this.changeInputId.bind(this));
    }

    if (this.inpFName) {
        this.inpFName.addEventListener('input', this.changeInputFName.bind(this));
    }

    if (this.inpLName) {
        this.inpLName.addEventListener('input', this.changeInputLName.bind(this));
    }

    if (this.inpAge) {
        this.inpAge.addEventListener('input', this.changeInputAge.bind(this));
    }

};

NavigationView.prototype.addStart = function () {
    if (!this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), 0)) {
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();

    }
};

NavigationView.prototype.addEnd = function () {
    const res = this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
    if (!res) {
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();

        res.catch(errMess => this.setErrorInput(this.inpId, this.errInpId, errMess));

    }
};

NavigationView.prototype.addMiddle = function () {
    if (!this.controller.insertElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value), Math.round(this.controller.elementsList.length / 2))) {
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();
    }
};

NavigationView.prototype.update = function () {
    if (!this.controller.updateElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value))) {
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();
    }
};

NavigationView.prototype.delElement = function () {
    //this.controller.deleteElement(new Entry(this.inpId.value, this.inpFName.value, this.inpLName.value, this.inpAge.value));
    if (!this.controller.deleteElement(this.inpId.value)){
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();
    }
};

NavigationView.prototype.load = function () {
    if (!this.controller.loadLocalStorage()){
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();
    }
};

NavigationView.prototype.save = function () {
    this.controller.save();
};

NavigationView.prototype.clear = function () {
    if (!this.controller.clear()){
        this.setAllErrorInput(this.controller.arrError);
    } else {
        this.clearAllErrorInput();
    }
};

NavigationView.prototype.setAllErrorInput = function(arrError) {
    for (let i = 0; i < arrError.length; i++ ) {
        switch (arrError[i].entryField) {
            case "id": {
                this.setErrorInput(this.inpId, this.errInpId, this.controller.arrError[i].errStr);
                break;
            }
            case "fName": {
                this.setErrorInput(this.inpFName, this.errInpFName, this.controller.arrError[i].errStr);
                break;
            }
            case "lName": {
                this.setErrorInput(this.inpLName, this.errInpLName, this.controller.arrError[i].errStr);
                break;
            }
            case "age": {
                this.setErrorInput(this.inpAge, this.errInpAge, this.controller.arrError[i].errStr);
                break;
            }
        }
    }
};


NavigationView.prototype.setErrorInput = function(inp, err, errStr) {
    err.innerText = errStr;
    err.classList.add('inputs__error_enabled');
};

NavigationView.prototype.clearErrorInput = function(inp, err) {
    err.innerText = '';
    err.classList.remove('inputs__error_enabled')
};

NavigationView.prototype.clearAllErrorInput = function() {
    this.changeInputId();
    this.changeInputFName();
    this.changeInputLName();
    this.changeInputAge();
};


NavigationView.prototype.changeInputId = function() {
    this.clearErrorInput(this.inpId, this.errInpId);
};

NavigationView.prototype.changeInputFName = function() {
    this.clearErrorInput(this.inpFName, this.errInpFName);
};

NavigationView.prototype.changeInputLName = function() {
    this.clearErrorInput(this.inpLName, this.errInpLName);
};

NavigationView.prototype.changeInputAge = function() {
    this.clearErrorInput(this.inpAge, this.errInpAge);
};
