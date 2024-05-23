const camposDoCadastro = document.querySelectorAll("[required]");
const inputCPF = document.querySelector(".cpf");


inputCPF.addEventListener('keypress',(e)=>formataCPF(inputCPF,e));
camposDoCadastro.forEach((campo)=>{
    campo.addEventListener("blur", ()=> verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]


function formataCPF(cpf, e ){
    let inputLength = cpf.value.length;
    let stringTeste = [3,7,11];
 
    if(!stringTeste.includes(inputLength)){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
    }
    if((inputLength==3 || inputLength == 7) && e.key != '.'){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
        cpf.value += '.';
    }else if((inputLength == 11)&& e.key !='-'){
        if(!/[\d]/.test(e.key)){
            e.preventDefault();
            return;
        }
        cpf.value += '-';
    }
}
function verificaCampo(campo){
    if(campo.name == "cpf" && campo.value.length>= 11){
        ehUmCPF(campo);
    }
}

function ehUmCPF(campo){
    const cpf = campo.value.replace(/\.|-/g, "");
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)){
        console.log("Esse CPF não existe!");
    }else{
        console.log('ok!');
    }
}

function validaNumerosRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]

    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++){
        soma += cpf[tamanho]*multiplicador;
        multiplicador--;
    }

    soma = (soma*10) % 11;
    if(soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++){
        soma += cpf[tamanho]*multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;
    if(soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[10];
}
