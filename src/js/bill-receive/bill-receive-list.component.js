/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billReceiveListComponent = Vue.extend({
    components:{
        'modal':window.modalComponent
    },
    template:`
        <div class="row">
            <div class="col s12 m12 l12">        
                <h3>Minhas contas a receber</h3>
                <table class="striped responsive-table z-depth-5 table-style">
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
                            <a href="#" @click.prevent="openModalDelete(bill)">
                                <i class="material-icons">delete_forever</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <modal :modal="modal">
            <div slot="content">
                <h4>Mensagem de confirmação</h4>
                <p><strong>Deseja excluir esta conta?</strong></p>
                <div class="divider"></div>
                <p>Nome: <strong>{{billToDelete.name}}</strong></p>
                <p>Valor: <strong>{{billToDelete.value | numberFormat moneyFormat}}</strong></p>
                <p>Data de Vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>
                <div class="divider"></div>
            </div>
            <div slot="footer">
                <button class="btn btn-flat waves-effect green white-text modal-close modal-action" @click="deletebille()">OK</button>
                <button class="btn btn-flat waves-effect red white-text modal-close modal-action">Cancelar</button>
            </div>
        </modal>
    `,
    data () {
        return{
            bills:[],
            billToDelete: null,
            moneyFormat: 'pt-BR',
            modal:{
                id: 'modal-delete'
            }
        };
    },
    created() {
        Receives.query().then((response) => {this.bills = response.data;});
        $(document).ready(function () {
            $('.modal').modal();
        })
    },
    methods:{
        deletebille () {
            // if(confirm("Deseja realmente excluir essa conta?")){
            //
            // }
            let self = this;
            Receives.deleted({id: this.billToDelete.id}).then((response) => {
                self.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!',3000);
                self.$dispatch('change-info');
            });
        },
        openModalDelete(bill){
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});