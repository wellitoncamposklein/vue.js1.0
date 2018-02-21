/*
* ($parent) para acessar de componentes filhos para os pais
* $root.$children[0 -> posicao dos filhos]) || ||  ||  ||  ||  ||
* */

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

var billListComponent = Vue.extend({
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
                    <a href="#" @click.prevent="deletebille(index)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return{
            bills: [
                {date_due: '20/08/2017', name:'Conta de luz',value: '70.99', done:1},
                {date_due: '10/08/2017', name:'Conta de agua',value: '95.99', done:0},
                {date_due: '10/08/2017', name:'Internet',value: '200.99', done:0}
            ]
        };
    },
    methods:{
        loadbille: function (bill) {
            this.bille = bill;
            this.$root.$children[0].activedView = 1;
            this.$root.$children[0].formType = 'update';
        },
        deletebille: function (index) {
            if(confirm("Deseja realmente excluir essa conta?")){
                this.bills.splice(index,1);
            }
        }
    }
});

Vue.component('bill-list-component',billListComponent);

var menuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="menu in menus">
                    <a href="#" @click.prevent="showView(menu.id)">{{menu.name}}</a>
                </li>
            </ul>
        </nav>
    `,
    data: function () {
        return{
            menus: [
                {id: 0,name:"Listar Contas"},
                {id: 1,name:"Criar Conta"}
            ],
        };
    },
    methods:{
        showView: function (id) {
            this.$root.$children[0].activedView = id;
            if (id == 1){
                this.$root.$children[0].formType = 'insert';
            }
        }
    }
});

Vue.component('menu-component',menuComponent);

var appComponent = Vue.extend({
    template:`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style type="text/css">         
            .green{
                color: green;
            }
            .gray{
                color: gray;
            }
            .red{
                color: red;
            }
            .minha-classe{
                background-color: cornsilk;
            }
        </style>
        <h3>{{ title }}</h3>
        <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
            {{ status | statusGeneral}}
        </h5>
        <menu-component></menu-component>
        <div v-if="activedView == 0">
            <bill-list-component></bill-list-component>
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
    }
});

Vue.component('app-component',appComponent);

var app = new Vue({
    el: "#app"
});