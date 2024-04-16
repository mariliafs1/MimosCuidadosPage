
const finalizarSacolaBtn = document.querySelector('.finalizar__compra__sacola');
const sacolaItens = document.querySelector('.sacola__itens');
const lixoBtn = document.querySelectorAll('.lixo');

setTimeout(()=>{
    const produtoBotao = document.querySelectorAll('.produto__botao');
    produtoBotao.forEach((btn)=> btn.addEventListener('click', (e)=>atualizarProdutosListados(e)));
}, 1000)

// localStorage.removeItem('carrinho');

let carrinhoSacola = JSON.parse(localStorage.getItem('carrinho')) || [];

console.log('produtos no carrinho: ',carrinhoSacola);


function atualizarCarrinho () {
	localStorage.setItem('carrinho', JSON.stringify(carrinhoSacola));
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
    divlixo.addEventListener('click', (e)=>removeProduto(e))
    const imgLixo = document.createElement('img');
    imgLixo.setAttribute('src', './img/lixo.svg');

    divlixo.appendChild(imgLixo);
    divlixo.id = id;
    divSacolaProduto.appendChild(divSacolaProdutoInfo);
    divSacolaProduto.appendChild(divlixo);


    divSacolaProdutoTotal.appendChild(divSacolaProduto);
    sacolaItens.appendChild(divSacolaProdutoTotal);
   
}

function removeProduto(e){
    e.preventDefault();

    console.log(e);
    atualizarSubTotal();
    
    let seletor = e.target.parentElement.id;

    //  carrinhoSacolaTeste = carrinhoSacola.filter((produto) => (produto[0].id != seletor));

    // atualizarCarrinho();
    // e.target.parentElement.parentElement.parentElement.remove();
}


carrinhoSacola.forEach(produto => {
    criarProdutoSacola(produto[0].nome, produto[0].preco, produto[0].imagem, produto[0].id, produto[0].quantidade);
});


//Lidando com o valor total





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


function atualizarProdutosListados(e){
   
    let produtoClicado = carrinhoSacola.find((produto) => produto.id === e.target.id);
    let sacolaProdutoClicado = 0;
    let sacolaProdutoBtn = document.querySelectorAll('.produto__botao'); // pega os botoes da home
    
    let posicaoProdutoClicado = carrinhoSacola.indexOf(produtoClicado);
  
    if(produtoClicado !== undefined){ //verifica se o produto já existe na sacola, se sim entra no if
      
        let sacolaProduto = document.querySelectorAll('.sacola__produto');
        for(let i=0; i<sacolaProduto.length; i++){  //atualiza o valor do input do produto da sacola
            if(sacolaProduto[i].id == produtoClicado.id){
                sacolaProduto[i].children[1].lastChild.lastChild.value = `${parseInt(sacolaProduto[i].children[1].lastChild.lastChild.value)+1}`
            }
        }

        for(let i=0; i<sacolaProdutoBtn.length; i++){
            if(sacolaProdutoBtn[i].id == produtoClicado.id){
                sacolaProdutoClicado = sacolaProdutoBtn[i];
                sacolaProdutoClicado.lastChild.value = `${parseInt(sacolaProdutoClicado.lastChild.value)+ 1}`;
                carrinhoSacola[posicaoProdutoClicado].quantidade = `${parseInt(carrinhoSacola[posicaoProdutoClicado].quantidade)+ 1}`;
                return
            }
        }
    }else{
       
        let precoClicado = e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
        let quantidadeProdutoClicado = 1;
        let idProdutoClicado = e.target.id;
        let imgProdutoClicado = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute('src');
        let nomeProdutoClicado = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.innerText;
        criarProdutoSacola(nomeProdutoClicado, precoClicado, imgProdutoClicado, idProdutoClicado , quantidadeProdutoClicado);

        let produtoArmazenado ={
            id: idProdutoClicado,
            nome: nomeProdutoClicado,
            preco: precoClicado,
            imagem: imgProdutoClicado,
            quantidade: quantidadeProdutoClicado 
        }
            carrinhoSacola.push(produtoArmazenado);
       
    }
    atualizarSubTotal();
    
}



