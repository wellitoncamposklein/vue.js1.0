window.billPayComponent = Vue.extend({
    components: {
        'menu-component':billPayMenuComponent
    },
    template:`      
        <style type="text/css">         
            .green{
                color: green;
            }
            .gray{
                color: gray;
            }
            .red{
                color: red;
            }
            .minha-classe{
                background-color: cornsilk;
            }
        </style>
        <div class="section">
            <div class="container">
                <h3>{{ title }}</h3>
                <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
                    {{ status | statusGeneral}}
                </h5>        
                <div class="row">
                    <div class="col s3 offset-s8 z-depth-1">
                        <h5>{{ total | numberFormat 'pt-BR'}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">                     
            <router-view></router-view>
        </div>     
    `,
    data(){
        return {
            title: "Contas a Pagar",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        calculateStatus(bills) {
            if (!bills.length){
                this.status =  false;
            }
            let count = 0;
            for (let i in bills){
                if (!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            Bills.query().then((response) => {this.calculateStatus(response.data);});
        },
        updateTotal() {
            Bills.totals().then((response) => {this.total = response.data;});
        }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});