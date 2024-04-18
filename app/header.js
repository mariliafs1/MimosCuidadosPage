//lida com o menu hamburguer

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');
const home = document.querySelector('#home');
const sacola = document.querySelector('#sacola__id');
const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const homeIcon = document.querySelector('.cabecalho__icons__home');
const numeroDeProdutosNaSacola = document.querySelector('.numero__produtos__sacola');
// const modal = document.querySelector('#dialog');
// const teste = document.querySelector('.teste');

// teste.addEventListener('click', ()=>{
//     modal.showModal();
//     setTimeout(()=>{
//         modal.close();
//     }, 600)
// })



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
}

const trocarPaginaHome = ()=>{

    home.classList.remove('hide');
    sacola.classList.add('hide')
  
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

console.log(numeroDeProdutosNaSacola.textContent);
