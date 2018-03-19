/*
* url é diferente do curso, pois a api disponibilizada no curso nao funcionou
* criei a minha propria api com laravel
* usei o mesmo de conceitos do bill-pay para criar o bill-receive*/

Vue.http.options.root = 'https://mysterious-bayou-75063.herokuapp.com/api/v2';

let BillsResource = Vue.resource('bills{/id}',{},{
    totals: {method: 'GET', url: 'bills/total'}
});

let ReceivesResource = Vue.resource('receives{/id}',{},{
    totals: {method: 'GET', url: 'receives/total'},
    edit: {method: 'GET', url: 'receives{/id}/edit'},
    deleted: {method: 'DELETE', url: 'receives{/id}'},
    created: {method: 'POST', url: 'receives'},
    updated: {method: 'PUT', url: 'receives{/id}'}
});

export {BillsResource,ReceivesResource};