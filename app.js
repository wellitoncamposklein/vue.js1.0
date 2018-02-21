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
                    <a href="#" @click.prevent="deletebille(bill)">Excluir</a>
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
            this.$root.$children[0].bille = bill;
            this.$root.$children[0].activedView = 1;
            this.$root.$children[0].formType = 'update';
        },
        deletebille: function (bill) {
            if(confirm("Deseja realmente excluir essa conta?")){
                this.bills.$remove(bill);
            }
        }
    }
});

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

var billCreateComponent = Vue.extend({
    template: `
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
    `,
    props:['bille','formType'],
    data:function () {
        return{
            names:[
                'Conta de Luz',
                'Conta de água',
                'Conta de telefone',
                'Internet',
                'Gasolina'
            ]
        };
    },
    methods:{
        submit: function () {
            if (this.formType == 'insert'){
                this.$parent.$refs.billListComponent.bills.push(this.bille);
            }

            this.bille = {
                date_due: '',
                name:'',
                value: 0,
                done: 1
            };

            this.$parent.activedView = 0;
        }
    }
});
//
var appComponent = Vue.extend({
    components: {
        'menu-component':menuComponent,
        'bill-list-component':billListComponent,
        'bill-create-component':billCreateComponent
    },
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
        <div v-show="activedView == 0">
            <bill-list-component v-ref:bill-list-component></bill-list-component>
        </div>
        <div v-show="activedView == 1">
            <bill-create-component :bille.sync="bille" :form-type="formType"></bill-create-component>
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


        };
    },
    computed:{
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length){
                return false;
            }
            var count = 0;
            for (var i in billListComponent.bills){
                if (!billListComponent.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods:{

    }
});

Vue.component('app-component',appComponent);

var app = new Vue({
    el: "#app"
});