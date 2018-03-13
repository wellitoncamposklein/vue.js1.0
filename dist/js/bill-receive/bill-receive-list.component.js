'use strict';

/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n        <div class="row">\n            <div class="col s12 m12 l12">        \n                <h3>Minhas contas a receber</h3>\n                <table class="striped responsive-table z-depth-5 table-style">\n                    <thead>\n                    <tr>\n                        <th>Previs\xE3o</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Recebido?</th>\n                        <th>A\xE7\xF5es</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr v-for="(index,bill) in bills">\n                        <td>{{bill.date_due | dateFormat}}</td>\n                        <td>{{bill.name | stringToUpperCase}}</td>\n                        <td>{{bill.value | numberFormat moneyFormat}}</td>\n                        <td class="white-text center-align" :class="{\'green lighten-2\': bill.done,\'red lighten-2\': !bill.done}">\n                            {{bill.done | doneLabel1}}\n                        </td>\n                        <td>                    \n                            <a v-link="{name: \'bill-receive.update\', params: {id: bill.id}}">\n                                <i class="material-icons">mode_edit</i>\n                            </a>  \n                            <a href="#" @click.prevent="openModalDelete(bill)">\n                                <i class="material-icons">delete_forever</i>\n                            </a>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <modal :modal="modal">\n            <div slot="content">\n                <h4>Mensagem de confirma\xE7\xE3o</h4>\n                <p><strong>Deseja excluir esta conta?</strong></p>\n                <div class="divider"></div>\n                <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                <p>Valor: <strong>{{billToDelete.value | numberFormat moneyFormat}}</strong></p>\n                <p>Data de Vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>\n                <div class="divider"></div>\n            </div>\n            <div slot="footer">\n                <button class="btn btn-flat waves-effect green white-text modal-close modal-action" @click="deletebille()">OK</button>\n                <button class="btn btn-flat waves-effect red white-text modal-close modal-action">Cancelar</button>\n            </div>\n        </modal>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            moneyFormat: 'pt-BR',
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        Receives.query().then(function (response) {
            _this.bills = response.data;
        });
        $(document).ready(function () {
            $('.modal').modal();
        });
    },

    methods: {
        deletebille: function deletebille() {
            var _this2 = this;

            // if(confirm("Deseja realmente excluir essa conta?")){
            //
            // }
            var self = this;
            Receives.deleted({ id: this.billToDelete.id }).then(function (response) {
                self.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 3000);
                self.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});