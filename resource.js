Vue.http.options.root = 'http://192.168.10.11/api/v2';

window.Bill = Vue.resource('bills{/id}');