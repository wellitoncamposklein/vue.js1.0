window.billPayCreateComponent = Vue.extend({
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
    http:{
        root: 'http://192.168.10.11/api/v2'
    },
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
        if (this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods:{
        submit: function () {
            if (this.formType == 'insert'){
                this.$http.post('bills',this.bille).then(function(response) {
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                this.$http.put('bills/'+this.bille.id,this.bille).then(function(response) {
                    this.$router.go({name: 'bill-pay.list'});
                });
            }

            // this.bille = {
            //     date_due: '',
            //     name:'',
            //     value: 0,
            //     done: 1
            // };
            // this.$router.go({name: 'bill-pay.list'});
        },
        getBill: function (id) {
            this.$http.get('bills/'+id).then(function(response) {
                this.bille = response.data;
            });
        }
    }
});