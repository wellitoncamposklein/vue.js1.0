"use strict";

window.billComponent = Vue.extend({
    template: "\n        <div class=\"navbar-fixed\">\n            <nav>\n                <div class=\"nav-wrapper container\">               \n                    <a href=\"#\" class=\"right brand-logo\">$ Contas</a>\n                    <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\">\n                        <i class=\"material-icons\">menu</i>\n                    </a>\n                    <ul class=\"left hide-on-med-and-down\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                        </li>\n                    </ul>\n                    <ul id=\"nav-mobile\" class=\"side-nav\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                        </li>\n                    </ul>                   \n                </div>\n            </nav>\n        </div>        \n        <router-view></router-view>\n    ",
    created: function created() {
        $(document).ready(function () {
            $(".button-collapse").sideNav();
        });
    },
    data: function data() {
        return {
            menus: [
            // {id: 0,name:"Listar Contas", url: '/bills'},
            // {id: 1,name:"Criar Conta", url: '/bill/create'}
            { name: "Dashboard", routeName: 'dashboard-bills' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});