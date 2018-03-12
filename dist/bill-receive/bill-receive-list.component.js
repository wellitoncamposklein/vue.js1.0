'use strict';

/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billReceiveListComponent = Vue.extend({
    template: '\n        <div class="row">\n            <div class="col s12 m12 l12">        \n                <h3>Minhas contas a receber</h3>\n                <table class="striped responsive-table z-depth-5 deep-purple lighten-4">\n                    <thead>\n                    <tr>\n                        <th>Previs\xE3o</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Recebido?</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr v-for="(index,bill) in bills">\n                        <td>{{bill.date_due | dateFormat}}</td>\n                        <td>{{bill.name | stringToUpperCase}}</td>\n                        <td>{{bill.value | numberFormat moneyFormat}}</td>\n                        <td class="white-text center-align" :class="{\'green lighten-2\': bill.done,\'red lighten-2\': !bill.done}">\n                            {{bill.done | doneLabel1}}\n                        </td>\n                        <td>                    \n                            <a v-link="{name: \'bill-receive.update\', params: {id: bill.id}}">\n                                <i class="material-icons">mode_edit</i>\n                            </a>  \n                            <a href="#" @click.prevent="deletebille(bill)">\n                                <i class="material-icons">delete_forever</i>\n                            </a>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            bills: [],
            moneyFormat: 'pt-BR'
        };
    },
    created: function created() {
        var _this = this;

        Receives.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deletebille: function deletebille(bille) {
            if (confirm("Deseja realmente excluir essa conta?")) {
                var self = this;
                Receives.deleted({ id: bille.id }).then(function (response) {
                    self.bills.$remove(bille);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});