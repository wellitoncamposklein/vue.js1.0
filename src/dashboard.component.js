window.dashboardComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="row">
                <div class="row align-items-center justify-content-center text-danger">
                    <h5 class="red-text">{{ totalPago | currency 'Total a Pagar R$ ' 2 }}</h5>            
                </div>
                <div class="row align-items-center justify-content-center text-success">
                    <h5 class="green-text">{{ totalRecebido | currency 'Total a Receber R$ ' 2 }}</h5>
                </div>
            </div>
        </div>
    `,
    data () {
        return{
            totalPago: 0,
            totalRecebido: 0
        };
    },
    created () {
        this.updateTotal();
        this.updateTotal1();
    },
    methods:{
        updateTotal () {
            let self = this;
            Bills.totals().then(function(response) {
                self.totalPago = response.data;
            });
        },
        updateTotal1 () {
            let self = this;
            Receives.totals().then(function(response) {
                self.totalRecebido = response.data;
            });
        }
    }
});