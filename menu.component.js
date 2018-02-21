window.menuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="menu in menus">
                    <a href="#" @click.prevent="showView(menu.id)">{{menu.name}}</a>
                </li>
            </ul>
        </nav>
    `,
    data: function () {
        return{
            menus: [
                {id: 0,name:"Listar Contas"},
                {id: 1,name:"Criar Conta"}
            ],
        };
    },
    methods:{
        showView: function (id) {
            this.$dispatch('change-activedview',id);// root.$children[0].activedView = id;
            if (id == 1){
                this.$dispatch('change-formtype','insert');//$root.$children[0].formType = 'insert';
            }
        }
    }
});