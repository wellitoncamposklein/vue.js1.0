var router = new VueRouter();

var mainComponent = Vue.extend({
    components:{
        'app-component': appComponent
    },
    template: '<app-component></app-component>',
    data: function () {
        return {
            bills: [
                {date_due: '2017-08-20', name:'Conta de luz',value: '70.99', done:1},
                {date_due: '2017-08-10', name:'Conta de agua',value: '95.99', done:0},
                {date_due: '2017-08-10', name:'Internet',value: '200.99', done:0}
            ]
        };
    }
});

router.map({
    '/bills':{name: 'bill.list', component: billListComponent},
    'bill/create':{name: 'bill.create',component: billCreateComponent},
    'bill/:index/update':{name: 'bill.update',component: billCreateComponent},
    '*':{component: billListComponent}
});

router.start({
    components: {'main-component': mainComponent}
},'#app');

router.redirect({
    '*':'/bills'
});