
let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");



let carrinho = JSON.parse(localStorage.getItem('carrinho') ) || [];


function atualizarCarrinho2 () {
	localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
}

let produtosDisponiveis = []; 

function adicionarCarrinho (e){
    let produtoAtual = carrinho.find((produto) => produto[0].id === e.target.id);
    if(produtoAtual == undefined){
        carrinho.push(produtosDisponiveis.filter((produto) => produto.id === e.target.id));//remover ids metodos repetidos
        atualizarCarrinho2();
        
    }else{
        let posicaoProduto = carrinho.indexOf(produtoAtual);
        carrinho[posicaoProduto][0].quantidade = `${parseInt(carrinho[posicaoProduto][0].quantidade) + 1}`
        atualizarCarrinho2();
       
    }
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

    atualizarSubTotal();
})



