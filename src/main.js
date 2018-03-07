/*
* let -> escopo e contexto local - variavel com ciclo de vida menor - em estrutura de repeticao
* const -> declarar um valor que vai ser apenas para leitura
* var -> escopo e contexto global
* */

let router = new VueRouter();

var mainComponent = Vue.extend({
    components:{'bill-component': billComponent},
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billspay: [
                {date_due: '2017-08-20', name:'Conta de luz',value: '70.99', done:1},
                {date_due: '2017-08-10', name:'Conta de agua',value: '95.99', done:0},
                {date_due: '2017-08-10', name:'Internet',value: '200.99', done:0}
            ]
        };
    }
});

router.map({
    '/bill-pays':{
        component: billPayComponent,
        subRoutes:{
            '/':{name: 'bill-pay.list',component: billPayListComponent},
            '/create':{name: 'bill-pay.create',component: billPayCreateComponent},
            '/:id/update':{name: 'bill-pay.update',component: billPayCreateComponent},
            '*':{component: billPayComponent}
        }
    },
    '/bill-receives':{
        component: billReceiveComponent,
        subRoutes:{
            '/':{name: 'bill-receive.list',component: billReceiveListComponent},
            '/create':{name: 'bill-receive.create',component: billReceiveCreateComponent},
            '/:id/update':{name: 'bill-receive.update',component: billReceiveCreateComponent},
            '*':{component: billReceiveComponent}
        }
    },
    '/':{component: dashboardComponent, name: 'dashboard-bills'}
});

router.start({
    components: {'main-component': mainComponent}
},'#app');

router.redirect({
    '*':'/'
});

class Bill{
    constructor(id, name){
        this._id = id;
        this._name = name;
    }

    showVariables(texto = 'nenhum texto'){
        console.log(this.id);
        console.log(this.name);
        console.log(texto);
    }

    get id(){return this._id};
    get name(){return this._name};

    set id(id){return this._id = id};
    set name(name){return this._name = name};
}

class BillPay extends Bill{
    constructor(id,name,pago){
        super(id,name)
        this._pago = pago;
    }

    get pago(){return this._pago};
    set pago(pago){return this._pago = pago};

    showVariables(texto = 'nenhum texto'){
        super.showVariables();
        console.log(this._pago);
    }
}

let bill = new BillPay(1, "Fokushima",false);

console.log(bill);
bill.id = 1000;
bill.name = "Fatura de cartão";
// console.log(bill.id);
// console.log(bill.name);
// console.log(bill.pago);
bill.showVariables();