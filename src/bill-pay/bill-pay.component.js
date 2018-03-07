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
        <h3>{{ title }}</h3>
        <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
            {{ status | statusGeneral}}
        </h5>        
        <h5>{{ total | numberFormat }}</h5>
        <menu-component></menu-component>        
        <router-view></router-view>
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
            Bill.query().then((response) => {this.calculateStatus(response.data);});
        },
        updateTotal() {
            Bill.totals().then((response) => {this.total = response.data;});
        }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});