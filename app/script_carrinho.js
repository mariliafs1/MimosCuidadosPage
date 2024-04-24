//Cria e atualizar os itens da Sacola e dos Favoritos



const finalizarSacolaBtn = document.querySelector('.finalizar__compra__sacola');
const sacolaItens = document.querySelector('.sacola__itens');
const lixoBtn = document.querySelectorAll('.lixo');
const sacolaVazia = document.querySelector('.sacola__vazia');

let carrinhoSacola = JSON.parse(localStorage.getItem('carrinho')) || [];




//INICIALIZAÇÃO DA SACOLA
carrinhoSacola.forEach(produto => {
    if(parseInt(produto.quantidade) > 0){
        criarProdutoSacola(produto.nome, produto.preco, produto.imagem, produto.id, produto.quantidade);
    }
});



iconAlteraNumeroDeProdutosSacola();
atualizarSubTotal();
sacolaVaziaToggle();
atualizarRenderizacaoFavoritos();

function atualizarRenderizacaoFavoritos(){
    let favoritosItens = document.querySelector('.favoritos__itens');
    favoritosItens.innerHTML = "";
    favoritos.forEach(produto=>{
        criarProdutoFavorito(produto);     
    })
    iconAlteraNumeroDeProdutosFavoritados();

}

function criarProdutoFavorito(produto){
    let favoritosItens = document.querySelector('.favoritos__itens');
    
    favoritosItens.innerHTML += `<div class="produto">
        <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
        <div class="produto__infos">
            <div class="produto__nome__favoritar">
                <p>${produto.nome}</p>
                <div class="produto__favoritar"><img id=${produto.id} src="./img/coracao.png" alt=""></div>
            </div>
            <div class="produto__infos-precos-botao">
                <div class="produto__infos-precos">
                    <p class="produto__preco">${produto.preco}</p>
                </div>
                <div class="produto__infos-botao">
                    <button id=${produto.id} class="produto__botao">Adicionar à sacola</button>
                </div>
            </div>
        </div>
    </div>  `

    let btnCoracao = favoritosItens.querySelectorAll('.produto__favoritar'); 
    btnCoracao.forEach(btn => btn.addEventListener('click', (e) => toggleFavoritos(e)))
 
}


function sacolaVaziaToggle(){
    if(carrinho.length == 0){
        sacolaVazia.classList.remove('hide');    
    }else{
        sacolaVazia.classList.add('hide');
    }
}


function atualizarSubTotal(){

    const sacolaPreco = document.querySelectorAll('.sacola__preco');
    let precoTotal = document.querySelector('.sacola__finalizar__subtotal');
    
    let precoTotalCalc = 0;
    let precoTratado = []
    let quantidadeProduto = []

    for (let i=0; i<sacolaPreco.length; i++){
        precoTratado[i] = sacolaPreco[i].firstChild.innerText.replace("R$ ", "").replace(",",".");
        quantidadeProduto[i] = sacolaPreco[i].lastChild.value;
        precoTotalCalc += (precoTratado[i]*quantidadeProduto[i])
    }

    precoTotalCalc = precoTotalCalc.toFixed(2);
    precoTotalCalc = precoTotalCalc.replace(".",",");
    precoTotal.lastChild.previousSibling.innerText = "R$ "+precoTotalCalc;
}


function removeProduto(e){

    let seletor = e.target.parentElement.id;

    carrinho = carrinho.filter((produto) => (produto.id != seletor));
    e.target.parentElement.parentElement.parentElement.remove();
    sacolaVaziaToggle();
    atualizarSubTotal();
    atualizarCarrinho();
    iconAlteraNumeroDeProdutosSacola();
}

function atualizarSubTotalInputTexto(e){
    atualizarSubTotal();
    novaQuantidadeDoProduto = e.target.value;
    idDoProduto = e.target.parentElement.parentElement.parentElement.id;

    carrinho.forEach(produto =>{
        if(produto.id==idDoProduto){
            produto.quantidade = novaQuantidadeDoProduto;
        }
    })
    
    atualizarCarrinho();
    iconAlteraNumeroDeProdutosSacola();
}



function criarProdutoSacola(nome, preco, imagem, id, quantidade){
    const divSacolaProdutoTotal = document.createElement('div');
    divSacolaProdutoTotal.classList.add('sacola__produto__total');

    

    const divSacolaProduto = document.createElement('div');
    divSacolaProduto.classList.add('sacola__produto');
    divSacolaProduto.id = id;

    const imgSacolaProdutoImg = document.createElement('img')
    imgSacolaProdutoImg.classList.add('sacola__produto__img');
    imgSacolaProdutoImg.setAttribute('src', imagem );

    divSacolaProduto.appendChild(imgSacolaProdutoImg);
    sacolaItens.appendChild(divSacolaProduto);

    const divSacolaProdutoInfo = document.createElement('div');
    divSacolaProdutoInfo.classList.add('sacola__produto__info');
    const h2SacolaProdutoInfo = document.createElement('h2');
    const pSacolaProdutoInfo = document.createElement('p');
    const inputQuantidade = document.createElement('input');
    inputQuantidade.classList.add('sacola__produto__quantidade')
    inputQuantidade.addEventListener("change", (e) =>atualizarSubTotalInputTexto(e))

    inputQuantidade.setAttribute('type', 'number');
    inputQuantidade.setAttribute('min', '1');
    inputQuantidade.value = quantidade;

    h2SacolaProdutoInfo.textContent = nome;
    pSacolaProdutoInfo.textContent = preco;

    const divPreco = document.createElement('div');
    divPreco.classList.add('sacola__preco');
    divPreco.appendChild(pSacolaProdutoInfo);
    divPreco.appendChild(inputQuantidade);

    divSacolaProdutoInfo.appendChild(h2SacolaProdutoInfo);
    divSacolaProdutoInfo.appendChild(divPreco);

    const divlixo = document.createElement('div');
    divlixo.classList.add('lixo');
    const imgLixo = document.createElement('img');
    imgLixo.setAttribute('src', './img/lixo.svg');
    
    divlixo.appendChild(imgLixo);
    divlixo.id = id;
    divlixo.addEventListener('click', (e)=>removeProduto(e))
    divSacolaProduto.appendChild(divSacolaProdutoInfo);
    divSacolaProduto.appendChild(divlixo);


    divSacolaProdutoTotal.appendChild(divSacolaProduto);
    sacolaItens.appendChild(divSacolaProdutoTotal);
   
}


