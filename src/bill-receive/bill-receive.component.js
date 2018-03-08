window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component':billReceiveMenuComponent
    },
    template:`      
        <style type="text/css">         
            .green{
                color: red;
            }
            .gray{
                color: gray;
            }
            .red{
                color: green;
            }
            .minha-classe{
                background-color: cornsilk;
            }
        </style>
        <div class="section">
            <div class="container">
                <h3>{{ title }}</h3>
                <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
                    {{ status | statusGeneral1}}
                </h5>        
                <div class="row">
                    <div class="col s3 offset-s8 z-depth-1 deep-purple accent-1">
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
            title: "Contas a Receber",
            status: false,
            total: 0
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