window.dashboardComponent = Vue.extend({
    template: `
        <div class="row align-items-center justify-content-center text-danger">
            <h5>{{ totalPago | currency 'Total a Pagar R$ ' 2 }}</h5>            
        </div>
        <div class="row align-items-center justify-content-center text-success">
            <h5>{{ totalRecebido | currency 'Total a Receber R$ ' 2 }}</h5>
        </div>
    `,
    data: function () {
        return{
            totalPago: 0,
            totalRecebido: 0
        };
    },
    created: function () {
        this.updateTotal();
        this.updateTotal1();
    },
    methods:{
        updateTotal: function () {
            var self = this;
            Bill.totals().then(function(response) {
                self.totalPago = response.data;
            });
        },
        updateTotal1: function () {
            var self = this;
            Receive.totals().then(function(response) {
                self.totalRecebido = response.data;
            });
        }
    }
});