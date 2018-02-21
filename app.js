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

var app = new Vue({
    el: "#app",
    data:{
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