'use strict';

var names = ['Conta de Luz', 'Conta de água', 'Conta de telefone', 'Internet', 'Gasolina'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <form name="form" @submit.prevent="submit">\n            <label>Vencimento:</label>\n            <input type="text" v-model="bille.date_due" class="form-control"/><br/><br/>\n            <label>Nome:</label>\n            <select v-model="bille.name" class="form-control">\n                <option v-for="o in names" v-model="o">{{ o }}</option>\n            </select><br><br>\n            <label>Valor:</label>\n            <input type="text" v-model="bille.value" class="form-control"/><br><br>\n            <label>Conta recebida?</label>\n            <input type="checkbox" v-model="bille.done"/><br><br>\n            <!--<input type="button" @click="submit" value="Enviar"/>-->\n            <button type="button" class="btn btn-primary" @click="submit">Enviar</button>\n        </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bille: {
                date_due: '',
                name: '',
                value: 0,
                done: 1
            }
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
            var _this = this;

            if (this.formType == 'insert') {
                Receive.save({}, this.bille).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                Receive.update({ id: this.bille.id }, this.bille).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Receive.get({ id: id }).then(function (response) {
                _this2.bille = response.data;
            });
        }
    }
});