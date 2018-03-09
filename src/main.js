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