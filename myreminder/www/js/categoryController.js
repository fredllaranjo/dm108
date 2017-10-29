var CategoryController = {

    save: function () {
        var name = $$("#name").val();
        var color = $$("#color").val().replace('#', '');
        var lists = $$("#lists").val();

        var category = new Category(name, color, lists);
        var found = false;
        app.getCategories().map(function (item) {
            if (category.name.toUpperCase() == item.name.toUpperCase()) {
                alert("Category name " + category.name + " already exists!");
                found = true;
            }
        });
        if (!found) {
            alert("Category " + category.name + " successfully created");
            app.getCategories().push(category);
            //refresh list
            CategoryController.backToMainView();
            app.refreshCategoriesList();
        }

    },

    remove: function (name) {
        app.setCategories(app.getCategories().filter(item =>
            name.toUpperCase() != item.name.toUpperCase()));

        alert("Category " + name + " successfully removed");

        app.refreshCategoriesList();
    },

    cancel: function () {
        CategoryController.backToMainView();
    },

    backToMainView: function () {
        //back to view
        /**
         * Forçando a volta para view principal
         * carregando e ignorando o cache default do Framework7
        */
        mainView.router.back({
            url: "index.html",
            reload: true,
            ignoreCache: true
        });
    },

    /**
     * Retorna uma instancia da virtual list do Framework7.
     * Basicamente é o template padrão de nossa lista de dados
     * http://framework7.io/docs/virtual-list.html
     */
    buildList: function () {
        return myApp.virtualList('.list-block.virtual-list', {
            cache: false,
            items: new Array(),
            // Template 7 template irá renderizar os itens
            template: '<li style="background-color:#{{color}};">' +
            '<div class="item-content">' +
            '<a href="showCategory.html?name={{name}}&color={{color}})" class="item-link">' +
            '<div class="item-inner">' +
            '<div class="item-title">{{name}}</div>' +
            '</div>' +
            '</a>' +
            '<div class="item-outer">' +
            '<button onclick="removeItem(\'{{name}}\')" class=\"button button-fill color-red\">X</a>' +
            '</div>' +
            '</div>' +
            '</li>'
        });
    }
};
function showLists(lists){
    var listsHTML = $$("#lists");
    lists.forEach(function(list) {
        var liList = document.createElement("li");
        liList.appendChild(list.name);
        listsHTML.appendChild(liList);
    }, this);
}