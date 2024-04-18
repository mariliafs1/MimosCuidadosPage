// localStorage.removeItem('carrinho')
//script que lê o json para renderizar os produtos disponíveis dentro dos carrosseis de produtos da HOME

let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");

let carrinho = JSON.parse(localStorage.getItem('carrinho') ) || [];


let produtosDisponiveis = []; //ARMAZENA OS DADOS DO JSON INDICANDO UMA LISTA DE PRODUTOS DISPONÍVEIS NA LOJA

function atualizarCarrinho() {
	localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
}

//FUNÇAO QUE ADICIONA NOVO PRODUTO AO CARRINHO OU, CASO JÁ EXISTA, ALTERA A SUA QUANTIDADE E CHAMA A FUNÇÃO DE 
//RENDERIZAÇÃO NA SACOLA
function adicionarCarrinho (e){
    console.log('nhaiim')

    let produtoSelecionado = produtosDisponiveis.find((produto) => produto.id === e.target.id);
    let produtoJaExisteNoCarrinho = carrinho.find((produto) => produto.id == produtoSelecionado.id);
   
    if(produtoJaExisteNoCarrinho == undefined){
        produtoSelecionado.quantidade = 1;
        carrinho.push(produtoSelecionado); 
        console.log('carrinhoJSON:',carrinho);
        criarProdutoSacola(produtoSelecionado.nome, produtoSelecionado.preco, produtoSelecionado.imagem, produtoSelecionado.id, produtoSelecionado.quantidade);       
    }else{
        let indexDoProdutoSelecionado = carrinho.indexOf(produtoJaExisteNoCarrinho);
        carrinho[indexDoProdutoSelecionado].quantidade = `${parseInt(produtoJaExisteNoCarrinho.quantidade) + 1}`; 
        let sacolaProduto = document.querySelectorAll('.sacola__produto');
        sacolaProduto.forEach(produto =>{
            if(produto.id == produtoSelecionado.id){
                produto.children[1].lastChild.lastChild.value = `${parseInt(produto.children[1].lastChild.lastChild.value)+1}`
            }
        })
        
    }
    iconAlteraNumeroDeProdutosSacola();
    sacolaVaziaToggle();
    atualizarCarrinho();
    atualizarSubTotal();
    openModal();
}

fetch("dados.json").then((response) =>{
    response.json().then((dados) =>{
        dados.produtos.map((produto) =>{
            carrosselUltimosLancamentos.innerHTML += `<div class="produto">
                <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${produto.nome}</p>
                        <div class="produto__favoritar"><img src="./img/coracao.png" alt=""></div>
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
            </div> `
            let produtoArmazenado ={
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: `${parseInt(produto.quantidade) + 1}`
            }
            produtosDisponiveis.push(produtoArmazenado);

        })
        carrosselUltimosLancamentos.firstChild.nextSibling.classList.add("primeiraImg2");
        
        dados.promocoes.map((promocao)=>{
            carrosselPromo.innerHTML += `<div class="produto">
            <div class="produto__img__container"><img src=${promocao.imagem} alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${promocao.nome}</p>
                    <div class="produto__favoritar"><img src="./img/coracao.png" alt=""></div>
                </div>
                <div class="produto__infos-precos-botao">
                    <div class="produto__infos-precos">
                        <p class="produto__preco">${promocao.preco}</p>
                        <p class="produto__preco-antigo">${promocao.precoAntigo}</p>
                    </div>
                    <div class="produto__infos-botao">
                        <button id=${promocao.id} class="produto__botao">Adicionar à sacola</button>
                    </div>
                </div>
            </div>
            </div>  `
            let promocaoArmazenada ={
                id: promocao.id,
                nome: promocao.nome,
                preco: promocao.preco,
                precoAntigo: promocao.precoAntigo,
                imagem: promocao.imagem,
                quantidade: `${parseInt(promocao.quantidade) + 1}`
            }
            produtosDisponiveis.push(promocaoArmazenada);
        })
        carrosselPromo.firstChild.nextSibling.classList.add("primeiraImg3");

        let produtoBtn = document.querySelectorAll('.produto__botao');
        produtoBtn.forEach( btn => {
            btn.addEventListener('click', (e)=> adicionarCarrinho(e))
        })
    })

})



