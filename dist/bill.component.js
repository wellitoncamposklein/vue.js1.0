"use strict";

window.billComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <li v-for=\"menu in menus\">\n                    <a v-link=\"{name: menu.routeName}\">{{menu.name}}</a>\n                </li>\n            </ul>\n        </nav>\n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [
            // {id: 0,name:"Listar Contas", url: '/bills'},
            // {id: 1,name:"Criar Conta", url: '/bill/create'}
            { name: "Dashboard", routeName: 'dashboard-bills' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});