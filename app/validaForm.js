const camposDoCadastro = document.querySelector('#cadastro').querySelectorAll("[required]");
const camposDoLogin = document.querySelector('#login').querySelectorAll("[required]");
const inputCPF = document.querySelector(".cpf");
const senhaOlho = document.querySelector('#icon__olho')
const inputSenha = document.querySelector('#senha');
const senhaOlho2 = document.querySelector('#icon__olho2');
const loginOlho = document.querySelector('#icon__olho__login');
const inputSenhaRepete = document.querySelector('#repete__senha');
const inputSenhaLogin = document.querySelector('#senha__login');
const botaoSubmit = document.querySelector('#enviar__cadastro');
const termoCheck = document.querySelector('.input__check');


//TRATA CPF




inputCPF.addEventListener('keypress',(e)=>formataCPF(inputCPF,e));

camposDoCadastro.forEach((campo)=>{
    campo.addEventListener("change", ()=>habilitaCadastro());
    campo.addEventListener('keyup', ()=>habilitaCadastro())
    campo.addEventListener("blur", ()=> verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});

camposDoLogin.forEach((campo)=>{
    campo.addEventListener("blur", ()=> verificaCampo(campo));
    campo.addEventListener('invalid', (e) => e.preventDefault());
});


function habilitaCadastro(){
    let validadorForm = Array.from(camposDoCadastro).find((campo) => campo.checkValidity() == false);
    validadorForm ? botaoSubmit.setAttribute('Disabled', "") : botaoSubmit.removeAttribute('Disabled');
}


const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagensErroValidacao ={
    nome: {
        valueMissing: "Preencha o campo Nome.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email_login:{
        valueMissing: "Preencha o campo e-mail.",
        tooShort: "Por favor, preencha um e-mail válido.",
        typeMismatch: "Esse não um e-mail válido."
    },
    email__cadastro:{
        valueMissing: "Preencha o campo e-mail.",
        tooShort: "Por favor, preencha um e-mail válido.",
        typeMismatch: "Esse não um e-mail válido."
    },
    cpf:{
        valueMissing: "Preencha o campo cpf.",
        patternMismatch: "Por favor, preencha um cpf válido.",
        tooShort: "Está Faltando Digitos no CPF",
        customError: "cpf Inválido"
    },
    senha_login:{
        valueMissing: "Preencha o campo senha.",
        // patternMismatch: "Por favor, preencha uma senha válida.", 
        tooShort: "A senha deve ter no mínimo 6 dígitos"
    },
    senha:{
        valueMissing: "Preencha o campo senha.",
        // patternMismatch: "Por favor, preencha uma senha válida.", 
        tooShort: "A senha deve ter no mínimo 6 dígitos"
    },
    senha_repetida:{
        valueMissing: "Preencha esse campo.",
        // patternMismatch: "Por favor, preencha uma senha válida.",
        tooShort: "Por favor, preencha uma senha válida.",
        customError: "Senhas diferentes."
    },
    nascimento:{
        valueMissing: "Preencha o campo data de nascimento.",
        patternMismatch: "Por favor, preencha uma data de nascimento válida.",
        tooShort: "Por favor, preencha uma data de nascimento válida."
    },
    termos:{
        customError: "Precisa estar marcado."
    }
}


function verificaCampo(campo){

    let mensagem = '';
    if(campo.name == "cpf" ){ 
        ehUmCPF(campo);
    }

    if(campo.name == 'senha_repetida' && !verificaSenhaRepetida(campo) && campo.value != ''){
        campo.setCustomValidity('Senhas diferentes.');  
    }else if( campo.name == 'senha_repetida'  ){ 
        campo.setCustomValidity(''); 
    }

    if(campo.name == 'termos' && !campo.checked){
        campo.setCustomValidity('precisas')
    }else if(campo.name == 'termos'){
        campo.setCustomValidity('');
    }
    
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){ 
            mensagem = mensagensErroValidacao[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();
   

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = '';
    }

    // let validadorForm = Array.from(camposDoCadastro).find((campo) => campo.checkValidity() == false);
    // console.log(validadorForm);
    // validadorForm ? botaoSubmit.disabled = true : botaoSubmit.disabled = false;


}

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

function ehUmCPF(campo){
    const cpf = campo.value.replace(/\.|-/g, "");

    if(campo.value.length<11){
        return;
    }else if((validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) && campo.value != ''){
        // console.log('aqui: ', campo.value);
        campo.setCustomValidity('Esse cpf nãe é válido');
        // console.log(campo.validity)

    }else{
        campo.setCustomValidity('');
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


//TRATA SENHA

senhaOlho.addEventListener('click', (e)=>toggleMostrarSenha(e, inputSenha));
senhaOlho2.addEventListener('click', (e)=>toggleMostrarSenha(e, inputSenhaRepete));
loginOlho.addEventListener('click', (e)=>toggleMostrarSenha(e, inputSenhaLogin));

function toggleMostrarSenha(e, campo){
    if(campo.type === 'password'){
        campo.setAttribute('type', 'text');
        e.target.setAttribute('src','./img/olho_open.svg')
        e.target.setAttribute('alt','Icone de olho aberto')
    }else{
        campo.setAttribute('type','password');
        e.target.setAttribute('src','./img/olho_closed.svg')
        e.target.setAttribute('alt','Icone de olho fechado')
    }
}


function verificaSenhaRepetida(campo){
    if(inputSenha.value == campo.value){
        return true;
    }else{
        return false;
    }
}