'use strict';

var names = ['Conta de Luz', 'Conta de água', 'Conta de telefone', 'Internet', 'Gasolina'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <form name="form" @submit.prevent="submit">\n            <label>Vencimento:</label>\n            <input type="date" v-model="bille.date_due | dateFormat" class="form-control"/><br/><br/>\n            <label>Nome:</label>\n            <select v-model="bille.name | stringToUpperCase" class="form-control">\n                <option v-for="o in names" v-model="o">{{ o | stringToUpperCase}}</option>\n            </select><br><br>\n            <label>Valor:</label>\n            <input type="text" v-model="bille.value | numberFormat" class="form-control"/><br><br>\n            <label>Conta recebida?</label>\n            <input type="checkbox" v-model="bille.done"/><br><br>\n            <!--<input type="button" @click="submit" value="Enviar"/>-->\n            <button type="button" class="btn btn-primary" @click="submit">Enviar</button>\n        </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bille: new BillPay()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var data = JSON.stringify(this.bille); //this.bille.toJSON();
            var self = this;
            if (this.formType == 'insert') {
                Receives.created({}, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                Receives.updated({ id: this.bille.id }, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this = this;

            Receives.edit({ id: id }).then(function (response) {
                _this.bille = response.data;
            });
        }
    }
});