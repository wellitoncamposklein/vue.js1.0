window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bille.date_due" class="form-control"/><br/><br/>
            <label>Nome:</label>
            <select v-model="bille.name" class="form-control">
                <option v-for="o in names" v-model="o">{{ o }}</option>
            </select><br><br>
            <label>Valor:</label>
            <input type="text" v-model="bille.value" class="form-control"/><br><br>
            <label>Conta recebida?</label>
            <input type="checkbox" v-model="bille.done"/><br><br>
            <!--<input type="button" @click="submit" value="Enviar"/>-->
            <button type="button" class="btn btn-primary" @click="submit">Enviar</button>
        </form>
    `,
    data:function () {
        return{
            formType:'insert',
            names:[
                'Conta de Luz',
                'Conta de água',
                'Conta de telefone',
                'Internet',
                'Gasolina'
            ],
            bille: {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            },
        };
    },
    created: function(){
        if (this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods:{
        submit: function () {
            if (this.formType == 'insert'){
                var self = this;
                Receive.save({},this.bille).then(function(response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }else{
                var self = this;
                Receive.update({id: this.bille.id},this.bille).then(function(response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;
            Receive.get({id: id}).then(function(response) {
                self.bille = response.data;
            });
        }
    }
});