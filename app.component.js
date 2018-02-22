window.appComponent = Vue.extend({
    components: {
        'menu-component':menuComponent
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
    `,
    data: function(){
        return {
            title: "Contas a Pagar"
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
    }
});