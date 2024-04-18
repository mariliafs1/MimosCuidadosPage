//lida com o menu hamburguer

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');
const home = document.querySelector('#home');
const sacola = document.querySelector('#sacola__id');
const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const homeIcon = document.querySelector('.cabecalho__icons__home');
const numeroDeProdutosNaSacola = document.querySelector('.numero__produtos__sacola');
const listaMenuAberto = document.querySelector('.lista__menu__aberto');
const menuHamburguer = document.querySelector('.cabecalho__menu-hamburguer');
const busca = document.querySelector('.busca');
const login = document.querySelector('.login');
const loginIcon = document.querySelector('.cabecalho__icons__login')



hamburguerBtn.onclick = function(){
    if(hamburguerBtn.checked){
        overlay.classList.remove('overlay_desativado');
    }
}

overlay.onclick = function(){
    overlay.classList.add('overlay_desativado');
    hamburguerBtn.checked = false;
}



const trocarPaginaSacola = ()=>{

    home.classList.add('hide');
    sacola.classList.remove('hide')
    listaMenuAberto.classList.add('hide');
    menuHamburguer.classList.add('hide')
    busca.classList.add('hide');
    login.classList.add('hide');
}

const trocarPaginaHome = ()=>{

    home.classList.remove('hide');
    sacola.classList.add('hide')
    listaMenuAberto.classList.remove('hide');
    menuHamburguer.classList.remove('hide');
    busca.classList.remove('hide');
    login.classList.add('hide');
  
}
const trocarPaginaLogin = ()=>{

    home.classList.add('hide');
    sacola.classList.add('hide')
    listaMenuAberto.classList.add('hide');
    menuHamburguer.classList.add('hide');
    busca.classList.add('hide');
    login.classList.remove('hide');
  
}

function iconAlteraNumeroDeProdutosSacola(){
    let quantidadeDeProdutosNaSacola = 0;
    carrinho.forEach((produto)=>{
        quantidadeDeProdutosNaSacola = parseInt(produto.quantidade)+quantidadeDeProdutosNaSacola;
    })
    numeroDeProdutosNaSacola.textContent=quantidadeDeProdutosNaSacola;
}

sacolaIcon.addEventListener('click', trocarPaginaSacola);
homeIcon.addEventListener('click', trocarPaginaHome);
loginIcon.addEventListener('click', trocarPaginaLogin);

console.log(numeroDeProdutosNaSacola.textContent);
