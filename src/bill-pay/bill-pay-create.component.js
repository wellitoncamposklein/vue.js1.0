const names = [
    'Conta de Luz',
    'Conta de água',
    'Conta de telefone',
    'Internet',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="row">                
                <form name="form" @submit.prevent="submit">
                    <div class="row">
                        <div class="col s8">
                            <label>Vencimento:</label>
                            <input type="date" v-model="bille.date_due | dateFormat" class="validate"/>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col s8">
                            <label>Nome:</label>
                            <select v-model="bille.name | stringToUpperCase">
                                <option v-for="o in names" v-model="o">{{ o | stringToUpperCase}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col s8">
                            <label>Valor:</label>
                            <input type="text" v-model="bille.value | numberFormat" class="form-control"/>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col s8">
                            <label>Conta paga?</label>
                            <input type="checkbox" v-model="bille.done"/>
                        </div>
                    </div>
                    <div>
                    <!--<input type="button" @click="submit" value="Enviar"/>-->
                    <!--<button type="button" class="btn btn-primary" @click="submit">Enviar</button>-->
                    <div class="row">
                        <div class="col s5">
                            <a href="#" @click="submit" class="waves-effect waves-light btn-large green darken-3 white-text">
                                <i class="material-icons right">save</i>Salvar
                            </a> 
                        </div>   
                        <div class="col s5">
                            <a v-link="{name: 'bill-pay.list'}" class="waves-effect waves-light btn-large red white-text">
                                <i class="material-icons right">cancel</i>Cancelar
                            </a>
                        </div>    
                    </div>
                </form>
            </div>
        </div>
    `,
    data() {
        return{
            formType:'insert',
            names:names,
            bille: new BillPay()
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
            let data = JSON.stringify(this.bille);//this.bille.toJSON();
            let self = this
            if (this.formType == 'insert'){
                Bills.save({},data).then((response) => {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }else{
                Bills.update({id: this.bille.id},data).then((response) => {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill (id) {
            Bills.get({id: id}).then((response) => {
                this.bille = response.data;
            });
        }
    }
});