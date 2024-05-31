if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", complete);
}else{
  
    const inputBuscar = document.querySelector('.busca__input');
    const buscaCategorizada = document.querySelector("#busca__categorizada");
    const menuCarrossel = document.querySelector("#carrossel__menu").querySelectorAll('img');
    const buscaCategorizadaContainer = document.querySelector('.busca__categorizada__container');

    let buscaProdutoFiltrado = document.querySelector('.busca__produto__filtrado');

    buscaCategorizada.addEventListener('click', (e) =>fecharCategorias(e));
    // buscaCategorizada.addEventListener('click', (e)=>toggleFavoritosCategorizados(e))
    
    menuCarrossel.forEach((icone)=>{
        icone.addEventListener("click", (e) => filtrarCategoria(e));
    });
    
   inputBuscar.addEventListener("input", filtrarPesquisa);

   function fecharCategorias(e){
        if(e.target.classList.contains('busca__categorizada__cross')){
            buscaCategorizada.classList.add('hide');
        }
        return;
    }

    // function toggleFavoritosCategorizados(e){
    //     console.log('entrou');
    //     console.log(e.target);
    //     if(e.target.classList.contains('coracaoCategorizado')){
    //         toggleFavoritos(e);

    //     }
    //     return;
    // }




   function filtrarCategoria(e){

        buscaCategorizada.classList.remove('hide');
        buscaCategorizadaContainer.innerHTML = '';
        let categoriaSelecionada = e.target.id.slice(7);
        buscaCategorizadaContainer.innerHTML = `<div class="cross__background"><img class="busca__categorizada__cross" src="img/cross.svg" alt=""></div>`;
        
        produtosDisponiveis.forEach((produto) =>{
            let produtoJaExisteNosFavoritos = favoritos.find((favorito) => favorito.id == produto.id);
            if(produto.categoria == categoriaSelecionada){
                buscaCategorizadaContainer.innerHTML += `
                <div class="produto">
                    <div class="produto__img__container"><img src=${produto.imagem}  alt="" class="produto__img"></div>
                    <div class="produto__infos">
                        <div class="produto__nome__favoritar">
                            <p>${produto.nome}</p>
                            <div class="produto__favoritar ${produtoJaExisteNosFavoritos 
                                ? ''
                                : 'produto__nome__favoritar__desativado'}" >
                                <img id=${produto.id} src="./img/coracao.png" alt="Icone de coração" class='coracaoCategorizado'>
                            </div>
                        </div>
                        <div class="produto__infos-precos-botao">
                            <div class="produto__infos-precos">
                                ${produto.promocao  
                                    ? `<p class="produto__preco">${produto.preco}</p> 
                                    <p class="produto__preco-antigo">${produto.precoAntigo}</p>` 
                                    :`<p class="produto__preco">R$ 50,00</p>`
                                }
                            </div>
                            <div class="produto__infos-botao">
                                <button id=${produto.id} class="produto__botao">Adicionar à sacola</button>
                            </div>
                        </div>
                    </div>
                </div>  
                `;
            }
        })

        let produtoBtn = buscaCategorizadaContainer.querySelectorAll('.produto__botao');
                produtoBtn.forEach( btn => {
                    btn.addEventListener('click', (e)=> adicionarCarrinho(e))
                })
                let btnCoracao2 = buscaCategorizadaContainer.querySelectorAll('.produto__favoritar'); 
                console.log(btnCoracao2);
                 btnCoracao2.forEach(btn => btn.addEventListener('click', (e) => toggleFavoritos(e)));
                       
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
