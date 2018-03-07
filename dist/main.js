'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* let -> escopo e contexto local - variavel com ciclo de vida menor - em estrutura de repeticao
* const -> declarar um valor que vai ser apenas para leitura
* var -> escopo e contexto global
* */

var router = new VueRouter();

var mainComponent = Vue.extend({
    components: { 'bill-component': billComponent },
    template: '<bill-component></bill-component>',
    data: function data() {
        return {
            billspay: [{ date_due: '2017-08-20', name: 'Conta de luz', value: '70.99', done: 1 }, { date_due: '2017-08-10', name: 'Conta de agua', value: '95.99', done: 0 }, { date_due: '2017-08-10', name: 'Internet', value: '200.99', done: 0 }]
        };
    }
});

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': { name: 'bill-pay.list', component: billPayListComponent },
            '/create': { name: 'bill-pay.create', component: billPayCreateComponent },
            '/:id/update': { name: 'bill-pay.update', component: billPayCreateComponent },
            '*': { component: billPayComponent }
        }
    },
    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': { name: 'bill-receive.list', component: billReceiveListComponent },
            '/create': { name: 'bill-receive.create', component: billReceiveCreateComponent },
            '/:id/update': { name: 'bill-receive.update', component: billReceiveCreateComponent },
            '*': { component: billReceiveComponent }
        }
    },
    '/': { component: dashboardComponent, name: 'dashboard-bills' }
});

router.start({
    components: { 'main-component': mainComponent }
}, '#app');

router.redirect({
    '*': '/'
});

var Bill = function () {
    function Bill(id, name) {
        _classCallCheck(this, Bill);

        this._id = id;
        this._name = name;
    }

    _createClass(Bill, [{
        key: 'showVariables',
        value: function showVariables() {
            var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nenhum texto';

            console.log(this.id);
            console.log(this.name);
            console.log(texto);
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        },
        set: function set(id) {
            return this._id = id;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            return this._name = name;
        }
    }]);

    return Bill;
}();

var BillPay = function (_Bill) {
    _inherits(BillPay, _Bill);

    function BillPay(id, name, pago) {
        _classCallCheck(this, BillPay);

        var _this = _possibleConstructorReturn(this, (BillPay.__proto__ || Object.getPrototypeOf(BillPay)).call(this, id, name));

        _this._pago = pago;
        return _this;
    }

    _createClass(BillPay, [{
        key: 'showVariables',
        value: function showVariables() {
            var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nenhum texto';

            _get(BillPay.prototype.__proto__ || Object.getPrototypeOf(BillPay.prototype), 'showVariables', this).call(this);
            console.log(this._pago);
        }
    }, {
        key: 'pago',
        get: function get() {
            return this._pago;
        },
        set: function set(pago) {
            return this._pago = pago;
        }
    }]);

    return BillPay;
}(Bill);

var bill = new BillPay(1, "Fokushima", false);

console.log(bill);
bill.id = 1000;
bill.name = "Fatura de cartão";
// console.log(bill.id);
// console.log(bill.name);
// console.log(bill.pago);
bill.showVariables();