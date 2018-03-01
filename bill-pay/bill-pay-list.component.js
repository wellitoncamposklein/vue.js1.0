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
        <table border="1" cellpadding="10">
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
                <td>{{bill.date_due}}</td>
                <td>{{bill.name}}</td>
                <td>{{bill.value | currency 'R$ ' 2}}</td>
                <td class="minha-classe" :class="{'nao-pago': bill.done === 0,'pago': bill.done === 1}">
                    {{bill.done | doneLabel}}
                </td>
                <td>
                    <a v-link="{name: 'bill-pay.update', params: {id: bill.id}}">Editar</a> |
                    <a href="#" @click.prevent="deletebille(bill)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    http:{
        root: 'http://192.168.10.11/api/v2'
    },
    data: function () {
        return{
            bills:[]
        };
    },
    created: function() {
        var resource = this.$resource('bills{/id}');
        resource.query().then(function(response) {this.bills = response.data;});
    },
    methods:{
        deletebille: function (bille) {
            if(confirm("Deseja realmente excluir essa conta?")){
                var resource = this.$resource('bills{/id}');
                resource.delete({id: bille.id}).then(function(response) {
                    this.bills.$remove(bille);
                    this.$dispatch('change-status');
                });
            }
        }
    }
});