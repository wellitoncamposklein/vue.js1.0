window.billReceiveComponent = Vue.extend({
    template:`      
        <div class="section">
            <div class="container">
                <h3>{{ title }}</h3>
                <div class="row">
                    <div class="col s7">
                        <div class="card z-depth-2" :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
                            <div class="card-content white-text">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i>
                                </p>
                                <h5>{{ status | statusGeneral1}}</h5>                                  
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="card z-depth-2">
                            <div class="card-content black-text">
                                <p class="card-title">
                                    <i class="material-icons">payment</i>
                                </p>
                                <h5>{{ total | numberFormat moneyFormat}}</h5>                                  
                            </div>
                        </div>
                    </div>
                </div>                       
            </div>
        </div>
        <div class="container">   
            <div class="divider"></div>               
            <router-view></router-view>
        </div>
    `,
    data(){
        return {
            title: "Contas a Receber",
            status: false,
            total: 0,
            moneyFormat: 'pt-BR'
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        calculateStatus(receives) {
            if (!receives.length){
                this.status =  false;
            }
            var count = 0;
            for (var i in receives){
                if (!receives[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            Receives.query().then((response) => {this.calculateStatus(response.data);});
        },
        updateTotal() {
            Receives.totals().then((response) => {this.total = response.data;});
        }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});