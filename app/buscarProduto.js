if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", complete);
}else{
  
    const inputBuscar = document.querySelector('.busca__input');
    let buscaProdutoFiltrado = document.querySelector('.busca__produto__filtrado');

    const menuCarrossel = document.querySelector("#carrossel__menu").querySelectorAll('img');
    menuCarrossel.forEach((icone)=>{
        icone.addEventListener("click", filtrarCategoria)
    })
    
   inputBuscar.addEventListener("input", filtrarPesquisa);

   function filtrarCategoria(){
        console.log('funciona');
   }

   function filtrarPesquisa(){
        buscaProdutoFiltrado.innerHTML = '';
        console.log(produtosDisponiveis);
        if(inputBuscar.value != ''){
            produtosDisponiveis.forEach((produto) => {
                let produtoJaExisteNosFavoritos = favoritos.find((favorito) => favorito.id == produto.id);
                if(produto.nome.toLowerCase().includes(inputBuscar.value.toLowerCase()) && !produto.promocao){
                buscaProdutoFiltrado.innerHTML +=
                        `
                            <div class="produto">
                                <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
                                <div class="produto__infos">
                                    <div class="produto__nome__favoritar">
                                        <p>${produto.nome}</p>
                                        <div class="produto__favoritar ${produtoJaExisteNosFavoritos ? '': 'produto__nome__favoritar__desativado'}" ><img id=${produto.id} src="./img/coracao.png" alt=""></div>
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
                            </div>  
                        `
                       
                    }else if(produto.nome.toLowerCase().includes(inputBuscar.value.toLowerCase()) && produto.promocao){
                        buscaProdutoFiltrado.innerHTML +=
                        `
                            <div class="produto">
                                <div class="produto__img__container"><img src=${produto.imagem} alt="" class="produto__img"></div>
                                <div class="produto__infos">
                                    <div class="produto__nome__favoritar">
                                        <p>${produto.nome}</p>
                                        <div class="produto__favoritar ${produtoJaExisteNosFavoritos ? '': 'produto__nome__favoritar__desativado'}" ><img id=${produto.id} src="./img/coracao.png" alt=""></div>
                                    </div>
                                    <div class="produto__infos-precos-botao">
                                        <div class="produto__infos-precos">
                                            <p class="produto__preco">${produto.preco}</p>
                                            <p class="produto__preco-antigo">${produto.precoAntigo}</p>
                                        </div>
                                        <div class="produto__infos-botao">
                                            <button id=${produto.id} class="produto__botao">Adicionar à sacola</button>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        `
                    }                   
                })


                let produtoBtn = buscaProdutoFiltrado.querySelectorAll('.produto__botao');
                produtoBtn.forEach( btn => {
                    btn.addEventListener('click', (e)=> adicionarCarrinho(e))
                })
                let btnCoracao = buscaProdutoFiltrado.querySelectorAll('.produto__favoritar'); 
                btnCoracao.forEach(btn => btn.addEventListener('click', (e) => toggleFavoritos(e)))
        }
    }
    
    
}
