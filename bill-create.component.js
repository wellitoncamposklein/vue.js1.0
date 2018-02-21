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
                this.$dispatch('new-bill',this.bille);
            }

            this.bille = {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            };

            this.$dispatch('change-activedview',0);
            // this.$parent.activedView = 0;
        }
    },
    events:{
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bille = bill;
        },
    }
});