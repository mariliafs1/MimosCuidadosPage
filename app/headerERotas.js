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
const loginIcon = document.querySelector('.cabecalho__icons__login')
const queroCadastrarBtn = document.querySelector('.quero__cadastrar');
const tenhoCadastroBtn = document.querySelector('.tenho__cadastro');
const pagLogin = document.querySelector('#login');
const pagCadastro = document.querySelector('#cadastro');

const paginas = [home, sacola, listaMenuAberto, menuHamburguer, busca, pagLogin, favoritosSection, pagCadastro];

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
    paginas.forEach((pagina) =>{
        if(!pagina.classList.contains('hide')){
            if(pagina.id == 'home'){
                console.log('euuu');
            }
            pagina.classList.add('hide');
        }
    });

    // home.classList.add('hide');
    // sacola.classList.add('hide')
    // listaMenuAberto.classList.add('hide');
    // menuHamburguer.classList.add('hide');
    // busca.classList.add('hide');
    // pagLogin.classList.add('hide');
    // favoritosSection.classList.add('hide');
    // pagCadastro.classList.add('hide');
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

    escondeTudo();
    pagLogin.classList.remove('hide');
  
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

function trocarPaginaCadastro(){
    console.log('ihuuuu1');
    escondeTudo();
    pagCadastro.classList.remove('hide');
}


sacolaIcon.addEventListener('click', trocarPaginaSacola);
homeIcon.addEventListener('click', trocarPaginaHome);
loginIcon.addEventListener('click', trocarPaginaLogin);
favoritosIcon.addEventListener('click', trocarPaginaFavoritos);
queroCadastrarBtn.addEventListener('click', trocarPaginaCadastro);
tenhoCadastroBtn.addEventListener('click', trocarPaginaLogin);
