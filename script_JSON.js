let divProdutos = document.querySelector("#teste");
let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")
let carrosselPromo = document.querySelector("#carrossel__promo");

let produtosArmazenados = []; 
let promocoesArmazenadas = [];

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
                imagem: produto.imagem
            }
            produtosArmazenados.push(produtoArmazenado);
            localStorage.setItem('produtosArmazenados', JSON.stringify(produtosArmazenados));
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
                imagem: promocao.imagem
            }
            promocoesArmazenadas.push(promocaoArmazenada);
            localStorage.setItem('promocoesArmazenadas', JSON.stringify(promocoesArmazenadas));
        })
        carrosselPromo.firstChild.nextSibling.classList.add("primeiraImg3");
    })
})



