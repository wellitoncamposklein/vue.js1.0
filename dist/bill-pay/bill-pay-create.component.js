'use strict';

var names = ['Conta de Luz', 'Conta de água', 'Conta de telefone', 'Internet', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n        <div class="container">\n            <div class="row">                \n                <form name="form" @submit.prevent="submit">\n                    <div class="row">\n                        <div class="col s8">\n                            <label>Vencimento:</label>\n                            <input type="date" v-model="bille.date_due | dateFormat" class="validate"/>\n                        </div>\n                    </div>\n                    \n                    <div class="row">\n                        <div class="col s8">\n                            <label>Nome:</label>\n                            <select v-model="bille.name | stringToUpperCase">\n                                <option v-for="o in names" v-model="o">{{ o | stringToUpperCase}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    \n                    <div class="row">\n                        <div class="col s8">\n                            <label>Valor:</label>\n                            <input type="text" v-model="bille.value | numberFormat" class="form-control"/>\n                        </div>\n                    </div>\n                    \n                    <div class="row">\n                        <div class="col s8">\n                            <label>Conta paga?</label>\n                            <input type="checkbox" v-model="bille.done"/>\n                        </div>\n                    </div>\n                    <div>\n                    <!--<input type="button" @click="submit" value="Enviar"/>-->\n                    <!--<button type="button" class="btn btn-primary" @click="submit">Enviar</button>-->\n                    <div class="row">\n                        <div class="col s5">\n                            <a href="#" @click="submit" class="waves-effect waves-light btn-large green darken-3 white-text">\n                                <i class="material-icons right">save</i>Salvar\n                            </a> \n                        </div>   \n                        <div class="col s5">\n                            <a v-link="{name: \'bill-pay.list\'}" class="waves-effect waves-light btn-large red white-text">\n                                <i class="material-icons right">cancel</i>Cancelar\n                            </a>\n                        </div>    \n                    </div>\n                </form>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bille: new BillPay()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var data = JSON.stringify(this.bille); //this.bille.toJSON();
            var self = this;
            if (this.formType == 'insert') {
                Bills.save({}, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bills.update({ id: this.bille.id }, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this = this;

            Bills.get({ id: id }).then(function (response) {
                _this.bille = response.data;
            });
        }
    }
});