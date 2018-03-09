'use strict';

window.billReceiveComponent = Vue.extend({
    template: '      \n        <div class="section">\n            <div class="container">\n                <h3>{{ title }}</h3>\n                <div class="row">\n                    <div class="col s7">\n                        <div class="card z-depth-2" :class="{\'gray\': status === false, \'green\': status === 0, \'red\': status > 0}">\n                            <div class="card-content white-text">\n                                <p class="card-title">\n                                    <i class="material-icons">account_balance</i>\n                                </p>\n                                <h5>{{ status | statusGeneral1}}</h5>                                  \n                            </div>\n                        </div>\n                    </div>\n                    <div class="col s5">\n                        <div class="card z-depth-2">\n                            <div class="card-content black-text">\n                                <p class="card-title">\n                                    <i class="material-icons">payment</i>\n                                </p>\n                                <h5>{{ total | numberFormat moneyFormat}}</h5>                                  \n                            </div>\n                        </div>\n                    </div>\n                </div>                       \n            </div>\n        </div>\n        <div class="container">                  \n            <router-view></router-view>\n        </div>\n    ',
    data: function data() {
        return {
            title: "Contas a Receber",
            status: false,
            total: 0,
            moneyFormat: 'pt-BR'
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(receives) {
            if (!receives.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in receives) {
                if (!receives[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Receives.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Receives.totals().then(function (response) {
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