window.billReceiveMenuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="menu in menus">
                    <a v-link="{name: menu.routeName}">{{menu.name}}</a>
                </li>
            </ul>
        </nav>
    `,
    data: function () {
        return{
            menus: [
                // {id: 0,name:"Listar Contas", url: '/bills'},
                // {id: 1,name:"Criar Conta", url: '/bill/create'}
                {id: 0,name:"Listar Contas", routeName: 'bill-receive.list'},
                {id: 1,name:"Criar Conta", routeName: 'bill-receive.create'}
            ],
        };
    }
});