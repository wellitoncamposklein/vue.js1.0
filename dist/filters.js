"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Arrow Functions
// Após ( => ) já estamos pedindo para retornar o valor
Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não Paga" : "Paga";
});
Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }
    if (!value) {
        return 'Nenhuma conta a pagar';
    } else {
        return 'Existem ' + value + ' contas a serem pagas';
    }
});

Vue.filter('doneLabel1', function (value) {
    return value == 0 ? "Não Recebido" : "Recebido";
});
Vue.filter('statusGeneral1', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }
    if (!value) {
        return 'Nenhuma conta a receber';
    } else {
        return 'Existem ' + value + ' contas a serem recebidas';
    }
});

Vue.filter('numberFormat', {
    read: function read(value) {
        //mostrar a informacao na viewq
        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        var numberFormat = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        });

        return numberFormat.format(number);
    },
    write: function write(value) {
        //pegar o valor da view e converter para armazenar no modelo
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        //mostrar a informacao na viewq
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!value instanceof Date) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return value.toLocaleString('pt-BR');
            // return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        //pegar o valor da view e converter para armazenar no modelo
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-'));

            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});

/*Vue.filter('doneLabel',function (value) {
    if (value == 0){
        return "Não Paga"
    }else{
        return "Paga"
    }
});

Vue.filter('statusGeneral',function (value) {
    if (value === false){
        return 'Nenhuma conta cadastrada';
    }
    if (!value){
        return 'Nenhuma conta a pagar';
    }else{
        return 'Existem '+value+' contas a serem pagas';
    }
});

Vue.filter('doneLabel1',function (value) {
    if (value == 0){
        return "Não Recebido"
    }else{
        return "Recebido"
    }
});

Vue.filter('statusGeneral1',function (value) {
    if (value === false){
        return 'Nenhuma conta cadastrada';
    }
    if (!value){
        return 'Nenhuma conta a receber';
    }else{
        return 'Existem '+value+' contas a serem recebidas';
    }
});*/