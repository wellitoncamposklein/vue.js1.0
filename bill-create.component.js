window.billCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bille.date_due"/><br/><br/>
            <label>Nome:</label>
            <select v-model="bille.name">
                <option v-for="o in names" v-model="o">{{ o }}</option>
            </select><br><br>
            <label>Valor:</label>
            <input type="text" v-model="bille.value"/><br><br>
            <label>Conta paga?</label>
            <input type="checkbox" v-model="bille.done"/><br><br>
            <input type="button" @click="submit" value="Enviar"/>
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
    methods:{
        submit: function () {
            if (this.formType == 'insert'){
                this.$root.$children[0].bills.push(this.bille);
            }

            this.bille = {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            };
            this.$router.go({name: 'bill.list'});
        }
    },
    events:{
        'change-bill': function (bill) {
            this.bille = bill;
        },
    }
});