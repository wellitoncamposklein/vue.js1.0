Vue.http.options.root = 'http://192.168.10.11/api/v2';

window.Bill = Vue.resource('bills{/id}',{},{
    totals: {method: 'GET', url: 'bills/total'}
});

window.Receive = Vue.resource('receives{/id}',{},{
    totals: {method: 'GET', url: 'receives/total'}
});