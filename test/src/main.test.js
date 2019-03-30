describe('Testing Model', function() {
	let model = null;
	const localStorageName = 'test';

	
	describe('save() method', function() {
		it('should save test value', function () {
			model = new Model(localStorageName);
			const expected = 'testString';
			model.save(expected);			
			const actual = localStorage.getItem(localStorageName);
			assert.equal(expected, actual);
		});

		it("Save empty data object to local storage", function() {
			const model = new Model("arrData");
			const actualObj = {};
			model.save(JSON.stringify(actualObj));

			const expected = localStorage.getItem(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});

		it("Save one data object to local storage", function() {
			const model = new Model("arrData");
			const actualObj = {Id: 12,fName: "Иван",lName: "Иванов",age: 25};
			model.save(JSON.stringify(actualObj));

			const expected = localStorage.getItem(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});

		it("Save array with object to local storage", function() {
			const model = new Model("arrData");
			const actualObj = [{Id: 12,fName: "Иван",lName: "Иванов",age: 25},{Id: 15,fName: "Перт",lName: "Сидоров",age: 33}];
			model.save(JSON.stringify(actualObj));

			const expected = localStorage.getItem(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});
	});
		
	describe('load() method', function() {
		it('should load test value', function () {
			model = new Model(localStorageName);
			const expected = 'testString';
			const actual = model.load();
			assert.equal(expected, actual);
		});

		it("Load empty data object from local storage", function() {
			const model = new Model("arrData");
			const actualObj = {};
			localStorage.setItem(model.idLS, JSON.stringify(actualObj));

			const expected = model.load(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});

		it("Load one data object from local storage", function() {
			const model = new Model("arrData");
			const actualObj = {Id: 12,fName: "Иван",lName: "Иванов",age: 25};
			localStorage.setItem(model.idLS, JSON.stringify(actualObj));

			const expected = model.load(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});

		it("Load array with object from local storage", function() {
			const model = new Model("arrData");
			const actualObj = [{Id: 12,fName: "Иван",lName: "Иванов",age: 25},{Id: 15,fName: "Перт",lName: "Сидоров",age: 33}];
			localStorage.setItem(model.idLS, JSON.stringify(actualObj));

			const expected = model.load(model.idLS);
			assert.deepEqual(actualObj, JSON.parse(expected));
		});
	});
	
	after(function() {
		localStorage.clear();
	});
});

describe('Testing Controller', function() {
	let controller = null;
	before(function () {
		controller = new Controller();
	});
	
	describe('insertElement() method', function() {
		it('should rise exception when inserting element with wrong index above range', function () {
			const index = 7;
			const e = new Element(1, 1, 1, 1);
			
			chai.expect(() => controller.insertElement(e, index)).to.throw()
		});

		it('should rise exception when inserting element with wrong index below range', function () {
			const index = -7;
			const e = new Element(1, 1, 1, 1);
			
			chai.expect(() => controller.insertElement(e, index)).to.throw()
		});
		
		const testData = [
			{id: 1, lName: 'lName1', fName: 'fName1', age: 1},
			{id: 2, lName: 'lName1', fName: 'fName1', age: 2},
			{id: 3, lName: 'lName1', fName: 'fName1', age: 3},
			{id: 4, lName: 'lName1', fName: 'fName1', age: 4},
			{id: 5, lName: 'lName1', fName: 'fName1', age: 5}
		];
		
		testData.forEach(function (e, index) {
			it(`shuld return "true" when inserting element at ${index} position`, function() {
				const expected = true;
				const actual = controller.insertElement(e, index);
				
				assert.equal(expected, actual);
			})			
		});
		
		it(`after massive inserts, array and controller data must be equal`, function() {
			assert.deepEqual(testData, controller.elementsList);
		});

		testData.forEach(function (e) {
			it(`shuld return "false" when inserting element with existing ID`, function() {
				const expected = false;
				const actual = controller.insertElement(e);
				
				assert.equal(expected, actual);
			})			
		});
		
		it('should rise exception when inserting element with wrong index above range', function () {
			const index = 7;
			const e = new Element(1, 1, 1, 1);
			
			chai.expect(() => controller.insertElement(e, index)).to.throw()
		});

		it('should rise exception when inserting element with wrong index below range', function () {
			const index = -7;
			const e = new Element(1, 1, 1, 1);
			
			chai.expect(() => controller.insertElement(e, index)).to.throw()
		});		
	});
	
	describe('updateElement() method', function() {
		const testData = [
			{id: 1, lName: 'lName1', fName: 'fName1', age: 1},
			{id: 2, lName: 'lName2', fName: 'fName2', age: 2},
			{id: 3, lName: 'lName3', fName: 'fName3', age: 3},
			{id: 4, lName: 'lName4', fName: 'fName4', age: 4},
			{id: 5, lName: 'lName5', fName: 'fName5', age: 5}
		];
		
		testData.forEach(function (e, index) {
			it(`shuld return "true" when updating element width existing id = ${e.id}`, function() {
				const expected = true;
				const actual = controller.updateElement(e, index);
				
				assert.equal(expected, actual);
			})			
		});

		it(`after massive updates, test array and controller data must be equal`, function() {
			assert.deepEqual(testData, controller.elementsList);
		});
		
		it(`shuld return "false" when try to update element with unexisting ID`, function() {
			const expected = false;
			const e = new Element(100500, 'unexists', 'also unexists', 1);
			const actual = controller.updateElement(e);
				
			assert.equal(expected, actual);
		});

		it(`and after that, test array and controller data must be equal too`, function() {
			assert.deepEqual(testData, controller.elementsList);
		});
	});
	
	describe('deleteElement() method', function() {
		it(`shuld return "false" when try to delete element with unexisting ID`, function() {
			const expected = false;
			const e = new Element(100500, 'unexists', 'also unexists', 1);
			const actual = controller.deleteElement(e);
				
			assert.equal(expected, actual);
		});
		
		const testData = [
			{id: 1, lName: 'lName1', fName: 'fName1', age: 1},
			{id: 2, lName: 'lName2', fName: 'fName2', age: 2},
			{id: 3, lName: 'lName3', fName: 'fName3', age: 3},
			{id: 4, lName: 'lName4', fName: 'fName4', age: 4},
			{id: 5, lName: 'lName5', fName: 'fName5', age: 5}
		];
		
		testData.forEach(function (e, index) {
			it(`shuld return "true" when deleting element width existing id = ${e.id}`, function() {
				const expected = true;
				const actual = controller.deleteElement(e, index);
				
				assert.equal(expected, actual);
			})			
		});

		it(`shuld return "false" when try to delete element with unexisting ID from empty controller`, function() {
			const expected = false;
			const e = new Element(100500, 'unexists', 'also unexists', 1);
			const actual = controller.deleteElement(e);
				
			assert.equal(expected, actual);
		});
		
		it(`and after that, controller data must be empty`, function() {
			assert.deepEqual([], controller.elementsList);
		});
	});
	
	describe('indexById() method', function () {
		it(`shuld return "-1" for element with unexisting ID from empty controller`, function() {
			const expected = -1;
			const e = new Element(11, 'unexists', 'also unexists', 1);
			const actual = controller.indexById(e.id);
				
			assert.equal(expected, actual);
		});		
		
		const testData = [
			{id: 1, lName: 'lName1', fName: 'fName1', age: 1},
			{id: 2, lName: 'lName2', fName: 'fName2', age: 2},
			{id: 3, lName: 'lName3', fName: 'fName3', age: 3},
			{id: 4, lName: 'lName4', fName: 'fName4', age: 4},
			{id: 5, lName: 'lName5', fName: 'fName5', age: 5}
		];

		testData.forEach(function (e, index) {
			it(`shuld return "${index}" when try to search element width id = ${e.id}`, function() {
				const expected = index;
				controller.insertElement(e, index);
				const actual = controller.indexById(e.id);
				
				assert.equal(expected, actual);
			})			
		});	
		
		it(`shuld return "-1" for element with unexisting ID from not empty controller`, function() {
			const expected = -1;
			const e = new Element(11, 'unexists', 'also unexists', 1);
			const actual = controller.indexById(e.id);
				
			assert.equal(expected, actual);
		});				
	});
	
	describe('clear() method', function () {
		it(`controller data must be empty after clear() method`, function() {
			controller.clear();
			assert.deepEqual([], controller.elementsList);
		});		
	});
	
	describe('save() and load() methods', function () {
		const localStorageName = 'testing controller';
		let model = null;
		const testData = [
			{id: 1, lName: 'lName1', fName: 'fName1', age: 1},
			{id: 2, lName: 'lName2', fName: 'fName2', age: 2},
			{id: 3, lName: 'lName3', fName: 'fName3', age: 3},
			{id: 4, lName: 'lName4', fName: 'fName4', age: 4},
			{id: 5, lName: 'lName5', fName: 'fName5', age: 5}
		];

		before(function () {
    		model = new Model(localStorageName);
			controller.model = model;
			controller.clear();
			
			testData.forEach(function (e, index) {
				controller.insertElement(e, index);
			});
		});	
		
		it(`saving and loading data must be equal`, function() {
			controller.save();
			controller.clear();
			assert.deepEqual([], controller.elementsList);
			
			controller.load();
			assert.deepEqual(testData, controller.elementsList);			
		});
		
		after(function () {
			localStorage.clear();
		});
	});	
});

