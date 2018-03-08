window.billComponent = Vue.extend({
    template: `
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper container">               
                    <a href="#" class="right brand-logo">$ Contas</a>
                    <a href="#" data-activates="nav-mobile" class="button-collapse">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="left hide-on-med-and-down">
                        <li v-for="menu in menus">
                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>
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
        });
    },
    data() {
        return{
            menus: [
                // {id: 0,name:"Listar Contas", url: '/bills'},
                // {id: 1,name:"Criar Conta", url: '/bill/create'}
                {name:"Dashboard", routeName: 'dashboard-bills'},
                {name:"Contas a Pagar", routeName: 'bill-pay.list'},
                {name:"Contas a Receber", routeName: 'bill-receive.list'}
            ],
        };
    }
});