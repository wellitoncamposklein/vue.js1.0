"use strict";

/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billPayListComponent = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .pago{\n                color: green;\n            }\n            .nao-pago{\n                color: red;\n            }\n        </style>\n        <table class=\"table table-striped table-dark\">\n            <thead>\n            <tr>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Paga?</th>\n                <th>Acoes</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for=\"(index,bill) in bills\">\n                <td>{{bill.date_due | dateFormat}}</td>\n                <td>{{bill.name}}</td>\n                <td>{{bill.value | numberFormat}}</td>\n                <td :class=\"{'nao-pago': bill.done === 0,'pago': bill.done === 1}\">\n                    {{bill.done | doneLabel}}\n                </td>\n                <td>\n                    <a v-link=\"{name: 'bill-pay.update', params: {id: bill.id}}\">Editar</a> | \n                    <a href=\"#\" @click.prevent=\"deletebille(bill)\">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deletebille: function deletebille(bille) {
            var _this2 = this;

            if (confirm("Deseja realmente excluir essa conta?")) {
                Bill.delete({ id: bille.id }).then(function (response) {
                    _this2.bills.$remove(bille);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});