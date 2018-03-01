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
        <h5>{{ total | currency 'Total de R$ ' 2 }}</h5>
        <menu-component></menu-component>        
        <router-view></router-view>
    `,
    data: function(){
        return {
            title: "Contas a Pagar",
            status: false,
            total: 0
        };
    },
    created: function () {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        calculateStatus: function (bills) {
            // var bills = this.$root.$children[0].billspay;
            if (!bills.length){
                this.status =  false;
            }
            var count = 0;
            for (var i in bills){
                if (!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            Bill.query().then(function(response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            Bill.totals().then(function(response) {
                self.total = response.data;
            });
        }
    },
    events:{
        'change-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});