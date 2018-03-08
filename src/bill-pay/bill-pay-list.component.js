/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billPayListComponent = Vue.extend({
    template:`
        <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color: red;
            }
        </style>
        <div class="row">
        <div class="col s12">
                <table class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th>Vencimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Paga?</th>
                        <th>Acoes</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,bill) in bills">
                        <td>{{bill.date_due | dateFormat}}</td>
                        <td>{{bill.name | stringToUpperCase}}</td>
                        <td>{{bill.value | numberFormat 'pt-BR'}}</td>
                        <td :class="{'nao-pago': bill.done === false,'pago': bill.done === true}">
                            {{bill.done | doneLabel}}
                        </td>
                        <td>
                            <a v-link="{name: 'bill-pay.update', params: {id: bill.id}}">Editar</a> | 
                            <a href="#" @click.prevent="deletebille(bill)">Excluir</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    data () {
        return{
            bills:[]
        };
    },
    created() {
        Bills.query().then((response) => {this.bills = response.data;});
    },
    methods:{
        deletebille (bille) {
            if(confirm("Deseja realmente excluir essa conta?")){
                let self = this;
                Bills.delete({id: bille.id}).then((response) => {
                    self.bills.$remove(bille);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});