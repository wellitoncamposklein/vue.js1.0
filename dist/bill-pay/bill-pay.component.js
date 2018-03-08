'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '      \n        <style type="text/css">         \n            .green{\n                color: green;\n            }\n            .gray{\n                color: gray;\n            }\n            .red{\n                color: red;\n            }\n            .minha-classe{\n                background-color: cornsilk;\n            }\n        </style>\n        <div class="section">\n            <div class="container">\n                <h3>{{ title }}</h3>\n                <h5 :class="{\'gray\': status === false, \'green\': status === 0, \'red\': status > 0}">\n                    {{ status | statusGeneral}}\n                </h5>        \n                <div class="row">\n                    <div class="col s3 offset-s8 z-depth-1 deep-purple accent-1">\n                        <h5>{{ total | numberFormat \'pt-BR\'}}</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="container">                     \n            <router-view></router-view>\n        </div>     \n    ',
    data: function data() {
        return {
            title: "Contas a Pagar",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Bills.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bills.totals().then(function (response) {
                _this2.total = response.data;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});