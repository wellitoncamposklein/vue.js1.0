"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n        <div class=\"row align-items-center justify-content-center text-danger\">\n            <h5>{{ totalPago | currency 'Total a Pagar R$ ' 2 }}</h5>            \n        </div>\n        <div class=\"row align-items-center justify-content-center text-success\">\n            <h5>{{ totalRecebido | currency 'Total a Receber R$ ' 2 }}</h5>\n        </div>\n    ",
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