window.appComponent = Vue.extend({
    components: {
        'menu-component':menuComponent,
        'bill-list-component':billListComponent,
        'bill-create-component':billCreateComponent
    },
    template:`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
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
        <menu-component></menu-component>
        <router-view></router-view>
        <!--<div v-show="activedView == 0">-->
            <!--<bill-list-component v-ref:bill-list-component></bill-list-component>-->
        <!--</div>-->
        <!--<div v-show="activedView == 1">-->
            <!--<bill-create-component :bille.sync="bille"></bill-create-component>-->
        <!--</div>-->
    `,
    data: function(){
        return {
            title: "Contas a Pagar",
            activedView: 0,
        };
    },
    computed:{
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length){
                return false;
            }
            var count = 0;
            for (var i in billListComponent.bills){
                if (!billListComponent.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods:{},
    events:{
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function (formType) {
            this.$broadcast('change-formtype',formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill',bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill',bill);
        }
    }
});