//lida com o menu hamburguer

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');

hamburguerBtn.onclick = function(){
    if(hamburguerBtn.checked){
        overlay.classList.remove('overlay_desativado');
    }
}

overlay.onclick = function(){
    overlay.classList.add('overlay_desativado');
    hamburguerBtn.checked = false;
}

const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const home = document.querySelector('#home');
const sacola = document.querySelector('#sacola__id')
const finalizarSacolaBtn = document.querySelector('.finalizar__compra__sacola');
const sacolaItens = document.querySelector('.sacola__itens');
const lixoBtn = document.querySelectorAll('.lixo');

const trocarPaginaSacola = ()=>{

    if(home.classList.contains('hide')){
        home.classList.remove('hide');
        sacola.classList.add('hide')
        return;
    }

    home.classList.add('hide');
    sacola.classList.remove('hide')
}

function criarProdutoSacola(){
    const divSacolaProdutoTotal = document.createElement('div');
    divSacolaProdutoTotal.classList.add('sacola__produto__total');

    

    const divSacolaProduto = document.createElement('div');
    divSacolaProduto.classList.add('sacola__produto');

    const imgSacolaProdutoImg = document.createElement('img')
    imgSacolaProdutoImg.classList.add('sacola__produto__img');
    imgSacolaProdutoImg.setAttribute('src', './img/produto_oleo.png' );

    divSacolaProduto.appendChild(imgSacolaProdutoImg);
    sacolaItens.appendChild(divSacolaProduto);

    const divSacolaProdutoInfo = document.createElement('div');
    divSacolaProdutoInfo.classList.add('sacola__produto__info');
    const h2SacolaProdutoInfo = document.createElement('h2');
    const pSacolaProdutoInfo = document.createElement('p');

    h2SacolaProdutoInfo.textContent = 'Produto Óleo';
    pSacolaProdutoInfo.textContent = 'R$ 50,00';

    divSacolaProdutoInfo.appendChild(h2SacolaProdutoInfo);
    divSacolaProdutoInfo.appendChild(pSacolaProdutoInfo);

    const divlixo = document.createElement('div');
    divlixo.classList.add('lixo');
    divlixo.addEventListener('click', (e)=>removeProduto(e))
    const imgLixo = document.createElement('img');
    imgLixo.setAttribute('src', './img/lixo.svg');

    divlixo.appendChild(imgLixo);
    divSacolaProduto.appendChild(divSacolaProdutoInfo);
    divSacolaProduto.appendChild(divlixo);


    divSacolaProdutoTotal.appendChild(divSacolaProduto);
    sacolaItens.appendChild(divSacolaProdutoTotal);
   
}

function removeProduto(e){
    e.preventDefault();
    console.log(e.target.parentElement);
    // e.target.parent;
    e.target.parentElement.parentElement.parentElement.remove();
}

sacolaIcon.addEventListener('click', trocarPaginaSacola);
finalizarSacolaBtn.addEventListener('click', criarProdutoSacola); //alterar esse botao

// lixoBtn[0].addEventListener('click', (e)=>removeProduto(e));
// lixoBtn[1].addEventListener('click', (e)=>removeProduto(e));