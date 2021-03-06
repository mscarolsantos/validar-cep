// jquery wrapper

$(function(){

    console.log(`
    
    ／l、         Silent Judging Cat
    (°､ 。７                   is    
     l、 ~～ヽ           Silently
     じし _,)√    Judging you....

    
    `);

    // ações
    
    var onlyNumbers = function(e){
        // console.log(e.target.value);
        this.value = this.value.replace(/\D/g,""); // esse g habilita modo global de pesquisa, possibilitando a substituição de TODO NÚMERO pra asterísco
    }

    var validateEntry = function(){
        // console.log(this.value);
        var cep = this.value;
        if(cep.length < 8){
            $(this).addClass("error").focus();
        }else{
            $(this).removeClass("error");
            getAddress(cep);
        }
    }

    var getAddress = function(cep){
        var endpoint = `https://viacep.com.br/ws/${cep}/json/`
        $.ajax({
            url: endpoint,
            method: "GET",
            dataType: "json",
            error: genericError,
            success: getAddressSuccess
        }); // método diretamente linkado pro objeto do jquery, sem necessidade de estar acoplado a algum elemento da tela, porque não tem necessidade. no caso o objeto está como parâmetro, passando lá dentro
    }

    var genericError = function(){
        $("#msg").empty(); // tratando pra não ficar floodando mensagem de erro
        $("<p>").text("Serviço indisponível!").addClass("error-message").appendTo("#msg");
    }

    var getAddressSuccess = function(address){
        console.log(address);
        $("#bairro").val(address.bairro); // val serve pra você capturar e setar o valor de um input
        $("#logradouro").val(address.logradouro); 
        $("#cidade").val(address.localidade); 
        $("#estado").val(address.uf); 
    }

    // eventos
    
    $("#cep")
    .on("input",onlyNumbers)
    .on("focusout",validateEntry);
    // depois colocar mais um on pra chamar o validate entry quando clicar enter (key code do enter é 13)
    
});