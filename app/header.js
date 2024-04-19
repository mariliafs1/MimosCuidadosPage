//lida com o menu hamburguer

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');
const home = document.querySelector('#home');
const sacola = document.querySelector('#sacola__id');
const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const homeIcon = document.querySelector('.cabecalho__icons__home');
const numeroDeProdutosNaSacola = document.querySelector('.numero__produtos__sacola');
const numeroDeProdutosFavoritados = document.querySelector('.numero__produtos__favoritos');
const favoritosIcon = document.querySelector('.cabecalho__icons__favoritos');
const favoritosSection = document.querySelector('.favoritos');
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

function escondeTudo(){
    home.classList.add('hide');
    sacola.classList.add('hide')
    listaMenuAberto.classList.add('hide');
    menuHamburguer.classList.add('hide');
    busca.classList.add('hide');
    login.classList.add('hide');
    favoritosSection.classList.add('hide');
}


const trocarPaginaSacola = ()=>{
    escondeTudo();
    sacola.classList.remove('hide')
}

const trocarPaginaHome = ()=>{

    escondeTudo();
    busca.classList.remove('hide');
    home.classList.remove('hide');
    listaMenuAberto.classList.remove('hide');
    menuHamburguer.classList.remove('hide');
  
}
const trocarPaginaLogin = ()=>{

    escondeTudo()
    login.classList.remove('hide');
  
}

const trocarPaginaFavoritos = () =>{
    escondeTudo();
    favoritosSection.classList.remove('hide')
}

function iconAlteraNumeroDeProdutosSacola(){
    let quantidadeDeProdutosNaSacola = 0;
    carrinho.forEach((produto)=>{
        quantidadeDeProdutosNaSacola = parseInt(produto.quantidade)+quantidadeDeProdutosNaSacola;
    })

   
    numeroDeProdutosNaSacola.textContent=quantidadeDeProdutosNaSacola;
}

function iconAlteraNumeroDeProdutosFavoritados(){
    numeroDeProdutosFavoritados.textContent = favoritos.length;
}

sacolaIcon.addEventListener('click', trocarPaginaSacola);
homeIcon.addEventListener('click', trocarPaginaHome);
loginIcon.addEventListener('click', trocarPaginaLogin);
favoritosIcon.addEventListener('click', trocarPaginaFavoritos);

