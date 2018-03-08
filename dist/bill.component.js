"use strict";

window.billComponent = Vue.extend({
    template: "\n        <div class=\"navbar-fixed\">\n            <nav>\n                <div class=\"nav-wrapper container\">               \n                    <a href=\"#\" class=\"brand-logo right\">Fokushima Contas</a>\n                    <ul id=\"nav-mobile\" class=\"left\">\n                        <li v-for=\"menu in menus\">\n                            <a v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                        </li>\n                    </ul>                   \n                </div>\n            </nav>\n        </div>        \n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [
            // {id: 0,name:"Listar Contas", url: '/bills'},
            // {id: 1,name:"Criar Conta", url: '/bill/create'}
            { name: "Dashboard", routeName: 'dashboard-bills' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});