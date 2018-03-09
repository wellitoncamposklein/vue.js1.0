'use strict';

/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billPayListComponent = Vue.extend({
    template: '\n        <style type="text/css">\n            .pago{\n                color: green;\n            }\n            .nao-pago{\n                color: red;\n            }\n        </style>\n        <div class="row">\n            <div class="col s12 m12 l12">\n                <table class="striped responsive-table z-depth-5 deep-purple lighten-4">\n                    <thead>\n                    <tr>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Paga?</th>\n                        <th>Acoes</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr v-for="(index,bill) in bills">\n                        <td>{{bill.date_due | dateFormat}}</td>\n                        <td>{{bill.name | stringToUpperCase}}</td>\n                        <td>{{bill.value | numberFormat moneyFormat}}</td>\n                        <td :class="{\'nao-pago\': bill.done === false,\'pago\': bill.done === true}">\n                            {{bill.done | doneLabel}}\n                        </td>\n                        <td>\n                            <a v-link="{name: \'bill-pay.update\', params: {id: bill.id}}">\n                                <i class="material-icons">mode_edit</i>\n                            </a> \n                            <a href="#" @click.prevent="deletebille(bill)">\n                                <i class="material-icons">delete_forever</i>\n                            </a>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            bills: [],
            moneyFormat: 'en-US'
        };
    },
    created: function created() {
        var _this = this;

        Bills.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deletebille: function deletebille(bille) {
            if (confirm("Deseja realmente excluir essa conta?")) {
                var self = this;
                Bills.delete({ id: bille.id }).then(function (response) {
                    self.bills.$remove(bille);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});