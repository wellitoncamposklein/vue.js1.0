/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billReceiveListComponent = Vue.extend({
    template:`
        <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color: red;
            }
        </style>
        <table class="table table-striped table-dark">
            <thead>
            <tr>
                <th>Previsão</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Recebido?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,bill) in bills">
                <td>{{bill.date_due | dateFormat}}</td>
                <td>{{bill.name | stringToUpperCase}}</td>
                <td>{{bill.value | numberFormat 'pt-BR'}}</td>
                <td :class="{'nao-pago': bill.done === false,'pago': bill.done === true}">
                    {{bill.done | doneLabel1}}
                </td>
                <td>
                    <a v-link="{name: 'bill-receive.update', params: {id: bill.id}}">Editar</a> | 
                    <a href="#" @click.prevent="deletebille(bill)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data () {
        return{
            bills:[]
        };
    },
    created() {
        Receives.query().then((response) => {this.bills = response.data;});
    },
    methods:{
        deletebille (bille) {
            if(confirm("Deseja realmente excluir essa conta?")){
                let self = this;
                Receives.deleted({id: bille.id}).then((response) => {
                    self.bills.$remove(bille);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});