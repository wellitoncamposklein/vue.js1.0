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
    data: function () {
        return{
            bills:[]
        };
    },
    created: function() {
        var self = this;
        Bill.query().then(function(response) {self.bills = response.data;});
    },
    methods:{
        deletebille: function (bille) {
            if(confirm("Deseja realmente excluir essa conta?")){
                var self = this;
                Bill.delete({id: bille.id}).then(function(response) {
                    self.bills.$remove(bille);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});