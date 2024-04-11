let divProdutos = document.querySelector("#teste");
let carrosselUltimosLancamentos = document.querySelector("#carrossel__ultimos__lancamentos")


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
                        <button class="produto__botao">Adicionar à sacola</button>
                    </div>
                </div>
            </div>
        </div> `
        })
        carrosselUltimosLancamentos.firstChild.nextSibling.classList.add("primeiraImg2");
    })
});

