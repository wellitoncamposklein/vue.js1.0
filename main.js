var router = new VueRouter();

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
            '/':{name: 'bill.list', component: billPayListComponent},
            '/create':{name: 'bill.create',component: billPayCreateComponent},
            '/:index/update':{name: 'bill.update',component: billPayCreateComponent},
            '*':{component: billPayComponent}
        }
    }
    /*'/bills':{name: 'bill.list', component: billPayListComponent},
    'bill/create':{name: 'bill.create',component: billPayCreateComponent},
    'bill/:index/update':{name: 'bill.update',component: billPayCreateComponent},
    '*':{component: billPayListComponent}*/
});

router.start({
    components: {'main-component': mainComponent}
},'#app');
/*
router.redirect({
    '*':'/bills'
});*/