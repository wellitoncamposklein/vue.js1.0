/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */
window.billListComponent = Vue.extend({
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
            <tr v-for="bill in bills">
                <td>{{bill.date_due}}</td>
                <td>{{bill.name}}</td>
                <td>{{bill.value | currency 'R$ ' 2}}</td>
                <td class="minha-classe" :class="{'nao-pago': bill.done === 0,'pago': bill.done === 1}">
                    {{bill.done | doneLabel}}
                </td>
                <td>
                    <a href="#" @click.prevent="loadbille(bill)">Editar</a> |
                    <a href="#" @click.prevent="deletebille(bill)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return{
            bills: this.$root.$children[0].bills
        };
    },
    methods:{
        loadbille: function (bill) {
            //this.$root.$children[0].bille = bill;
            this.$dispatch('change-bill',bill);
            this.$dispatch('change-formtype','update');
        },
        deletebille: function (bill) {
            if(confirm("Deseja realmente excluir essa conta?")){
                this.bills.$remove(bill);
            }
        }
    },
    events:{
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});