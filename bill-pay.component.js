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
            var bills = this.$root.$children[0].billspay;
            if (!bills.length){
                return false;
            }
            var count = 0;
            for (var i in bills){
                if (!bills[i].done){
                    count++;
                }
            }
            return count;
        }
    }
});