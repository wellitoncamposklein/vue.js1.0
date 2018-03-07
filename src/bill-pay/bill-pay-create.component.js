const names = [
    'Conta de Luz',
    'Conta de água',
    'Conta de telefone',
    'Internet',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bille.date_due | dateFormat" class="form-control"/><br/><br/>
            <label>Nome:</label>
            <select v-model="bille.name" class="form-control">
                <option v-for="o in names" v-model="o">{{ o }}</option>
            </select><br><br>
            <label>Valor:</label>
            <input type="text" v-model="bille.value | numberFormat" class="form-control"/><br><br>
            <label>Conta paga?</label>
            <input type="checkbox" v-model="bille.done"/><br><br>
            <!--<input type="button" @click="submit" value="Enviar"/>-->
            <button type="button" class="btn btn-primary" @click="submit">Enviar</button>
        </form>
    `,
    data() {
        return{
            formType:'insert',
            names:names,
            bille: {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            },
        };
    },
    created(){
        if (this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods:{
        submit() {
            if (this.formType == 'insert'){
                Bill.save({},this.bille).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                Bill.update({id: this.bille.id},this.bille).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill (id) {
            Bill.get({id: id}).then((response) => {this.bille = response.data;});
        }
    }
});