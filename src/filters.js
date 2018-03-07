//Arrow Functions
// Após ( => ) já estamos pedindo para retornar o valor
Vue.filter('doneLabel',(value) => value==0 ?"Não Paga":"Paga");
Vue.filter('statusGeneral',(value) => {
    if (value === false){
        return 'Nenhuma conta cadastrada';
    }
    if (!value){
        return 'Nenhuma conta a pagar';
    }else{
        return 'Existem '+value+' contas a serem pagas';
    }
});

Vue.filter('doneLabel1',(value) => value==0 ?"Não Recebido":"Recebido");
Vue.filter('statusGeneral1',(value) => {
    if (value === false){
        return 'Nenhuma conta cadastrada';
    }
    if (!value){
        return 'Nenhuma conta a receber';
    }else{
        return 'Existem '+value+' contas a serem recebidas';
    }
});

Vue.filter('numberFormat',{
    read(value){//mostrar a informacao na viewq
        let number = 0;
        if (value && typeof value !== undefined){
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        let numberFormat = new Intl.NumberFormat('pt-BR',{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        });

        return numberFormat.format(number);
    },
    write(value){//pegar o valor da view e converter para armazenar no modelo
        let number = 0;
        if(value.length > 0){
            number = value.replace(/[^\d,]/g,'').replace(/\,/g,'.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat',{
    read(value){//mostrar a informacao na viewq
        if(value && typeof value !== undefined){
            if (!value instanceof Date){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString){
                    value = new Date(dateString+"T03:00:00");
                }else{
                    return value;
                }
            }
            return value.toLocaleString('pt-BR');
            // return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
        }
        return value;
    },
    write(value){//pegar o valor da view e converter para armazenar no modelo
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-'));

            if (!isNaN(date.getTime())){
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