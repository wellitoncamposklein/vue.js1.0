window.dashboardComponent = Vue.extend({
    template: `
        <div class="section">
            <div class="container"> 
                <div class="row"> 
                    <div class="col s6">
                        <a href="#" v-link="{name: 'bill-pay.list'}">
                            <div class="card z-depth-2 red">
                                <div class="card-content white-text">
                                    <p class="card-title">
                                        <i class="material-icons">sentiment_very_dissatisfied</i>
                                    </p>
                                    <h5>Total a Pagar {{ totalPago | numberFormat 'pt-BR' }}</h5>
                                </div>
                            </div>
                        </a>                                            
                    </div>
                    <div class="col s6">
                        <a href="#" v-link="{name: 'bill-receive.list'}">
                            <div class="card z-depth-2 green">
                                <div class="card-content white-text">
                                    <p class="card-title">
                                        <i class="material-icons">sentiment_very_satisfied</i>
                                    </p>
                                    <h5 class="h5-titulo">Total a Receber {{ totalRecebido | numberFormat 'pt-BR' }}</h5>
                                </div>
                            </div>
                        </a>                                            
                    </div> 
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