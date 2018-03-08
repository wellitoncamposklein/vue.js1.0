window.billComponent = Vue.extend({
    template: `
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper container">               
                    <a href="#" class="brand-logo right">Fokushima Contas</a>
                    <ul id="nav-mobile" class="left">
                        <li v-for="menu in menus">
                            <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                        </li>
                    </ul>                   
                </div>
            </nav>
        </div>        
        <router-view></router-view>
    `,
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