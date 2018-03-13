/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billPayListComponent = Vue.extend({
    components:{
        'modal':window.modalComponent
    },
    template:`        
        <div class="row">
            <div class="col s12 m12 l12">
                <h3>Minhas contas a receber</h3>
                <table class="striped responsive-table z-depth-5 deep-purple lighten-4">
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
                        <td>{{bill.value | numberFormat moneyFormat}}</td>
                        <td class="white-text center-align" :class="{'green lighten-2': bill.done,'red lighten-2': !bill.done}">
                            {{bill.done | doneLabel}}
                        </td>
                        <td>
                            <a v-link="{name: 'bill-pay.update', params: {id: bill.id}}">
                                <i class="material-icons">mode_edit</i>
                            </a> 
                            <a href="#" @click.prevent="openModalDelete()">
                                <i class="material-icons">delete_forever</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <a id="btn-modal" href="#meu-modal" class="waves-effect waves-light btn modal-trigger">Abrir modal</a>
        <div id="meu-modal" class="modal">
            <div class="modal-content">
                <h2>Meu primeiro modal</h2>
                <p>Texto do primeiro modal</p>    
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn-flat green">OK</a>
            </div>
        </div>
        <modal :modal="modal">
            <div slot="content">
                <h4>Mensagem de confirmação</h4>
                <p><strong>Deseja excluir esta conta?</strong></p>
            </div>
            <div slot="footer">
                <button class="btn btn-flat waves-effect green white-text modal-close modal-action">OK</button>
                <button class="btn btn-flat waves-effect white-text red modal-close modal-action">Cancelar</button>
            </div>
        </modal>
    `,
    data () {
        return{
            bills:[],
            moneyFormat: 'en-US',
            modal:{
                id: 'modal-delete'
            }
        };
    },
    created() {
        Bills.query().then((response) => {this.bills = response.data;});
        $(document).ready(function () {
            $('.modal').modal();
        })
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
        },
        openModalDelete(){
            $('#modal-delete').modal('open');
        }
    }
});