"use strict";

window.billComponent = Vue.extend({
    template: "\n        <ul v-bind:id=\"o.id\" class=\"dropdown-content\" v-for=\"o in menusDropDown\">\n            <li v-for=\"item in o.items\">\n                <a v-link=\"{name: item.routeName}\">{{item.name}}</a>\n            </li>                  \n        </ul>\n        <div class=\"navbar-fixed\">\n            <nav class=\"deep-purple darken-1s\">\n                <div class=\"nav-wrapper container\">               \n                    <a href=\"#\" class=\"right brand-logo\">Contas <i class=\"material-icons\">local_grocery_store</i></a>\n                    <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\">\n                        <i class=\"material-icons\">menu</i>\n                    </a>\n                    <ul class=\"left hide-on-med-and-down\">\n                        <li v-for=\"menu in menus\">\n                            <a v-if=\"menu.dropDownID\" class=\"dropdown-button\" href=\"!#\" v-bind:data-activates=\"menu.dropDownID\">\n                                {{menu.name}} <i class=\"material-icons right\">arrow_drop_down</i>\n                            </a>\n                            <a v-else v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                        </li>\n                    </ul>\n                    <ul id=\"nav-mobile\" class=\"side-nav\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                        </li>\n                    </ul>                   \n                </div>\n            </nav>\n        </div>             \n        <router-view></router-view>\n    ",
    created: function created() {
        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [
            // {id: 0,name:"Listar Contas", url: '/bills'},
            // {id: 1,name:"Criar Conta", url: '/bill/create'}
            { name: "Dashboard", routeName: 'dashboard-bills' }, { name: "Contas a Pagar", routeName: 'bill-pay.list', dropDownID: 'bill-pay' }, { name: "Contas a Receber", routeName: 'bill-receive.list', dropDownID: 'bill-receive' }],
            menusDropDown: [{
                id: 'bill-pay', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-receive.create' }]
            }]
        };
    }
});