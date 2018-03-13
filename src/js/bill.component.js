window.billComponent = Vue.extend({
    template: `
        <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">
            <li v-for="item in o.items">
                <a v-link="{name: item.routeName}">{{item.name}}</a>
            </li>                  
        </ul>
        <div>
            <nav class="deep-purple darken-1s">
                <div class="nav-wrapper container">               
                    <a href="#" class="right brand-logo">Contas <i class="material-icons">local_grocery_store</i></a>
                    <a href="#" data-activates="nav-mobile" class="button-collapse">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="left hide-on-med-and-down">
                        <li v-for="menu in menus">
                            <a v-if="menu.dropDownID" class="dropdown-button" href="!#" v-bind:data-activates="menu.dropDownID">
                                {{menu.name}} <i class="material-icons right">arrow_drop_down</i>
                            </a>
                            <a v-else v-link="{name: menu.routeName}">{{menu.name}}</a>
                        </li>
                    </ul>
                    <ul id="nav-mobile" class="side-nav">
                        <li v-for="menu in menus">
                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                        </li>
                    </ul>                   
                </div>
            </nav>
        </div>             
        <router-view></router-view>
    `,
    created(){
        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data() {
        return{
            menus: [
                // {id: 0,name:"Listar Contas", url: '/bills'},
                // {id: 1,name:"Criar Conta", url: '/bill/create'}
                {name:"Dashboard", routeName: 'dashboard-bills'},
                {name:"Contas a Pagar", routeName: 'bill-pay.list', dropDownID: 'bill-pay'},
                {name:"Contas a Receber", routeName: 'bill-receive.list', dropDownID: 'bill-receive'}
            ],
            menusDropDown:[
                {
                    id: 'bill-pay', items: [
                    {id: 0,name:"Listar Contas", routeName: 'bill-pay.list'},
                    {id: 1,name:"Criar Conta", routeName: 'bill-pay.create'}
                    ]
                },
                {
                    id: 'bill-receive', items: [
                        {id: 0,name:"Listar Contas", routeName: 'bill-receive.list'},
                        {id: 1,name:"Criar Conta", routeName: 'bill-receive.create'}
                    ]
                }
            ],
        };
    }
});