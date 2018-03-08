const names = [
    'Conta de Luz',
    'Conta de água',
    'Conta de telefone',
    'Internet',
    'Gasolina'
];

window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="date" v-model="bille.date_due | dateFormat" class="form-control"/><br/><br/>
            <label>Nome:</label>
            <select v-model="bille.name | stringToUpperCase" class="form-control">
                <option v-for="o in names" v-model="o">{{ o | stringToUpperCase}}</option>
            </select><br><br>
            <label>Valor:</label>
            <input type="text" v-model="bille.value | numberFormat" class="form-control"/><br><br>
            <label>Conta recebida?</label>
            <input type="checkbox" v-model="bille.done"/><br><br>
            <!--<input type="button" @click="submit" value="Enviar"/>-->
            <button type="button" class="btn btn-primary" @click="submit">Enviar</button>
        </form>
    `,
    data () {
        return{
            formType:'insert',
            names:names,
            bille: new BillPay()
        };
    },
    created(){
        if (this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods:{
        submit () {
            let data = JSON.stringify(this.bille);//this.bille.toJSON();
            let self = this
            if (this.formType == 'insert'){
                Receives.created({},data).then((response) => {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }else{
                Receives.updated({id: this.bille.id},data).then((response) => {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill (id) {
            Receives.edit({id: id}).then((response) => {
                this.bille = response.data;
            });
        }
    }
});