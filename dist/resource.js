'use strict';

/*
* url é diferente do curso, pois a api disponibilizada no curso nao funcionou
* criei a minha propria api com laravel
* usei o mesmo de conceitos do bill-pay para criar o bill-receive*/

Vue.http.options.root = 'https://mysterious-bayou-75063.herokuapp.com/api/v2';

window.Bills = Vue.resource('bills{/id}', {}, {
    totals: { method: 'GET', url: 'bills/total' }
});

window.Receive = Vue.resource('receives{/id}', {}, {
    totals: { method: 'GET', url: 'receives/total' }
});