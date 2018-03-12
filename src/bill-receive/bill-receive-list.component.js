/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billReceiveListComponent = Vue.extend({
    template:`
        <div class="row">
            <div class="col s12 m12 l12">        
                <h3>Minhas contas a receber</h3>
                <table class="striped responsive-table z-depth-5 deep-purple lighten-4">
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
                        <td>{{bill.value | numberFormat moneyFormat}}</td>
                        <td class="white-text center-align" :class="{'green lighten-2': bill.done,'red lighten-2': !bill.done}">
                            {{bill.done | doneLabel1}}
                        </td>
                        <td>                    
                            <a v-link="{name: 'bill-receive.update', params: {id: bill.id}}">
                                <i class="material-icons">mode_edit</i>
                            </a>  
                            <a href="#" @click.prevent="deletebille(bill)">
                                <i class="material-icons">delete_forever</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    data () {
        return{
            bills:[],
            moneyFormat: 'pt-BR'
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