window.addEventListener('load', () => {
    const model = new Model("arrData");

    const cotroler = new Controller();

    const navigationView = new NavigationView();
    navigationView.init(cotroler);

    const tableView = new TableView();
    tableView.init('myTable');

    cotroler.views.push(tableView);
    cotroler.model = model;
});

