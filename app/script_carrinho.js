//Cria e atualizar os itens da Sacola


const finalizarSacolaBtn = document.querySelector('.finalizar__compra__sacola');
const sacolaItens = document.querySelector('.sacola__itens');
const lixoBtn = document.querySelectorAll('.lixo');
const sacolaVazia = document.querySelector('.sacola__vazia');

let carrinhoSacola = JSON.parse(localStorage.getItem('carrinho')) || [];
console.log(carrinhoSacola);



//INICIALIZAÇÃO DA SACOLA
carrinhoSacola.forEach(produto => {
    criarProdutoSacola(produto.nome, produto.preco, produto.imagem, produto.id, produto.quantidade);
});

atualizarSubTotal();
sacolaVaziaToggle();

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
    console.log('carrinho:', carrinho);
    e.target.parentElement.parentElement.parentElement.remove();
    sacolaVaziaToggle();
    atualizarSubTotal();
    atualizarCarrinho();
}

function atualizarSubTotal2(e){
    atualizarSubTotal();
    novaQuantidadeDoProduto = e.target.value;
    idDoProduto = e.target.parentElement.parentElement.parentElement.id;

    carrinho.forEach(produto =>{
        if(produto.id==idDoProduto){
            produto.quantidade = novaQuantidadeDoProduto;
        }
    })

    atualizarCarrinho();
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
    inputQuantidade.addEventListener("change", (e) =>atualizarSubTotal2(e))

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


