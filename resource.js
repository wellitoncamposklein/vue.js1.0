Vue.http.options.root = 'https://mysterious-bayou-75063.herokuapp.com/api/v2';

window.Bill = Vue.resource('bills{/id}',{},{
    totals: {method: 'GET', url: 'bills/total'}
});

window.Receive = Vue.resource('receives{/id}',{},{
    totals: {method: 'GET', url: 'receives/total'}
});