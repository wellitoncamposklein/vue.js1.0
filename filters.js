Vue.filter('doneLabel',function (value) {
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
});