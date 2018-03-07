window.billPayMenuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="menu in menus">
                    <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                </li>
            </ul>
        </nav>
    `,
    data () {
        return{
            menus: [
                // {id: 0,name:"Listar Contas", url: '/bills'},
                // {id: 1,name:"Criar Conta", url: '/bill/create'}
                {id: 0,name:"Listar Contas", routeName: 'bill-pay.list'},
                {id: 1,name:"Criar Conta", routeName: 'bill-pay.create'}
            ],
        };
    }
});