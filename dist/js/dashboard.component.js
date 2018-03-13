"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n        <div class=\"section\">\n            <div class=\"container\"> \n                <div class=\"row\"> \n                    <div class=\"col s6\">\n                        <a href=\"#\" v-link=\"{name: 'bill-pay.list'}\">\n                            <div class=\"card z-depth-2 red\">\n                                <div class=\"card-content white-text\">\n                                    <p class=\"card-title\">\n                                        <i class=\"material-icons\">sentiment_very_dissatisfied</i>\n                                    </p>\n                                    <h5>Total a Pagar {{ totalPago | numberFormat 'pt-BR' }}</h5>\n                                </div>\n                            </div>\n                        </a>                                            \n                    </div>\n                    <div class=\"col s6\">\n                        <a href=\"#\" v-link=\"{name: 'bill-receive.list'}\">\n                            <div class=\"card z-depth-2 green\">\n                                <div class=\"card-content white-text\">\n                                    <p class=\"card-title\">\n                                        <i class=\"material-icons\">sentiment_very_satisfied</i>\n                                    </p>\n                                    <h5>Total a Receber {{ totalRecebido | numberFormat 'pt-BR' }}</h5>\n                                </div>\n                            </div>\n                        </a>                                            \n                    </div> \n                </div>                        \n            </div>\n        </div>\n    ",
    data: function data() {
        return {
            totalPago: 0,
            totalRecebido: 0
        };
    },
    created: function created() {
        this.updateTotal();
        this.updateTotal1();
    },

    methods: {
        updateTotal: function updateTotal() {
            var self = this;
            Bills.totals().then(function (response) {
                self.totalPago = response.data;
            });
        },
        updateTotal1: function updateTotal1() {
            var self = this;
            Receives.totals().then(function (response) {
                self.totalRecebido = response.data;
            });
        }
    }
});