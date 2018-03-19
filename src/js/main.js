import './bootstrap';
import billPayComponent from './bill-pay/bill-pay.vue';
import billReceiveComponent from './bill-receive/bill-receive.vue';
import billPayListComponent from './bill-pay/bill-pay-list.vue';
import billReceiveListComponent from './bill-receive/bill-receive-list.vue';
import billPayCreateComponent from './bill-pay/bill-pay-create.vue';
import billReceiveCreateComponent from './bill-receive/bill-receive-create.vue';
import billComponent from './bill.vue';
import dashboardComponent from './dashboard.vue';


let VueRouter = require('vue-router');
let router = new VueRouter();

var mainComponent = Vue.extend({
    components:{'bill-component': billComponent},
    template: '<bill-component></bill-component>',
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