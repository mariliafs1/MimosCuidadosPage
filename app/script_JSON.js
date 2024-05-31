localStorage.removeItem('favoritos')
//script que lê o json para renderizar os produtos disponíveis dentro dos carrosseis de produtos da HOME

let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");

let carrinho = JSON.parse(localStorage.getItem('carrinho') ) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];



let produtosDisponiveis = []; //VARIÁVEL QUE ARMAZENA OS DADOS DO JSON INDICANDO UMA LISTA DE PRODUTOS DISPONÍVEIS NA LOJA

function atualizarCarrinho() {
	localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
}

function atualizarFavoritos(){
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
}

//FUNÇAO QUE ADICIONA NOVO PRODUTO AO CARRINHO OU, CASO JÁ EXISTA, ALTERA A SUA QUANTIDADE E CHAMA A FUNÇÃO DE 
//RENDERIZAÇÃO NA SACOLA
function adicionarCarrinho (e){
    let produtoSelecionado = produtosDisponiveis.find((produto) => produto.id === e.target.id);
    let produtoJaExisteNoCarrinho = carrinho.find((produto) => produto.id == produtoSelecionado.id);
   
    if(produtoJaExisteNoCarrinho == undefined){
        produtoSelecionado.quantidade = 1;
        carrinho.push(produtoSelecionado); 
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
    openModal('Item adicionado à sacola!');
}

function toggleFavoritos(e){
    let produtoSelecionado = produtosDisponiveis.find((produto) => produto.id == e.target.id);
    let produtoJaExisteNosFavoritos = favoritos.find((produto) => produto.id == produtoSelecionado.id);
    if (produtoJaExisteNosFavoritos == undefined){
        produtoSelecionado.favorito = 'true';
        favoritos.push(produtoSelecionado);
    }else{
        produtoSelecionado.favorito = 'false'
        let indexDoProdutoSelecionado = favoritos.indexOf(produtoJaExisteNosFavoritos);
        favoritos.splice(indexDoProdutoSelecionado, 1);
    }
    atualizarFavoritos();
    toggleCoracaoCor(e.target);
    atualizarRenderizacaoFavoritos();

    if(produtoSelecionado.favorito == 'true'){
        openModal('Item adicionado aos favoritos!');
    }else{
        openModal('Item removido dos favoritos!')
    }
}

function toggleCoracaoCor(coracao){
    let coracaoProdutos = document.querySelectorAll('.produto__favoritar');
    let coracaoProdutosArray = Array.from(coracaoProdutos);

    let coracaoClicado = coracaoProdutosArray.filter((produto) => (produto.firstChild.id == coracao.id ))
    console.log('aqui:',coracaoClicado);
    coracaoClicado.forEach((produto)=>{
        
        if(produto.firstChild.classList.contains('produto__nome__favoritar__desativado')){
            produto.firstChild.classList.remove('produto__nome__favoritar__desativado');
        }else{
            produto.firstChild.classList.add('produto__nome__favoritar__desativado');
        }
    })
    

}

fetch("dados.json").then((response) =>{
    response.json().then((dados) =>{
        dados.produtos.map((produto) =>{
            carrosselUltimosLancamentos.innerHTML += `<div class="produto">
                <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
                <div class="produto__infos">
                    <div class="produto__nome__favoritar">
                        <p>${produto.nome}</p>
                        <div class="produto__favoritar" ><img class='produto__nome__favoritar__desativado' id=${produto.id} src="./img/coracao.png" alt=""></div>
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
                categoria: produto.categoria,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: `${parseInt(produto.quantidade) + 1}`,
                favorito: produto.favorito,
                promocao: false
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
                    <div class="produto__favoritar"><img class='produto__nome__favoritar__desativado' id=${promocao.id} src="./img/coracao.png" alt=""></div>
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
                categoria: promocao.categoria,
                preco: promocao.preco,
                precoAntigo: promocao.precoAntigo,
                imagem: promocao.imagem,
                quantidade: `${parseInt(promocao.quantidade) + 1}`,
                favorito: promocao.favorito,
                promocao: true
            }
            produtosDisponiveis.push(promocaoArmazenada);
        })
        carrosselPromo.firstChild.nextSibling.classList.add("primeiraImg3");

        let produtoBtn = document.querySelectorAll('.produto__botao');
        let produtoFavoritarBtn = document.querySelectorAll('.produto__favoritar');
        produtoFavoritarBtn.forEach(produto=>{
            let estaFavoritado = favoritos.find((favorito) => favorito.id == produto.firstChild.id);
            if(estaFavoritado != undefined){
                toggleCoracaoCor(produto.firstChild);
            }
        })

        produtoBtn.forEach( btn => {
            btn.addEventListener('click', (e)=> adicionarCarrinho(e))
        })
        produtoFavoritarBtn.forEach(btn =>{
            btn.addEventListener('click',(e) => toggleFavoritos(e))
        })
    })

})



