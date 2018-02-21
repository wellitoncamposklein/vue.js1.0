Vue.filter('doneLabel',function (value) {
    if (value == 0){
        return "Não Paga"
    }else{
        return "Paga"
    }
});

Vue.filter('statusGeneral',function (value) {
    if (value === false){
        return 'Nenhuma conta cadastrada';
    }
    if (!value){
        return 'Nenhuma conta a pagar';
    }else{
        return 'Existem '+value+' contas a serem pagas';
    }
});

var appComponent = Vue.extend({
    template:`
        <h3>{{ title }}</h3>
        <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
            {{ status | statusGeneral}}
        </h5>
        <nav>
            <ul>
                <li v-for="menu in menus">
                    <a href="#" @click.prevent="showView(menu.id)">{{menu.name}}</a>
                </li>
            </ul>
        </nav>
        <div v-if="activedView == 0">
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
                        <a href="#" @click.prevent="deletebille(index)">Excluir</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-if="activedView == 1">
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
        </div>
    `,
    data: function(){
        return {
            test: '',
            title: "Contas a Pagar",
            menus: [
                {id: 0,name:"Listar Contas"},
                {id: 1,name:"Criar Conta"}
            ],
            activedView: 0,
            formType:'insert',
            bille: {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            },
            names:[
                'Conta de Luz',
                'Conta de água',
                'Conta de telefone',
                'Internet',
                'Gasolina'
            ],
            bills: [
                {date_due: '20/08/2017', name:'Conta de luz',value: '70.99', done:1},
                {date_due: '10/08/2017', name:'Conta de agua',value: '95.99', done:0},
                {date_due: '10/08/2017', name:'Internet',value: '200.99', done:0}
            ]
        };
    },
    computed:{
        status: function () {
            if (!this.bills.length){
                return false;
            }
            var count = 0;
            for (var i in this.bills){
                if (!this.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods:{
        showView: function (id) {
            this.activedView = id;
            if (id == 1){
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert'){
                this.bills.push(this.bille);
            }

            this.bille = {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            };

            this.activedView = 0;
        },
        loadbille: function (bill) {
            this.bille = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deletebille: function (index) {
            if(confirm("Deseja realmente excluir essa conta?")){
                this.bills.splice(index,1);
            }
        }
    }
});

Vue.component('app-component',appComponent);

var app = new Vue({
    el: "#app"
});