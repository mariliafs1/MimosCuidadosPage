if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", complete);
}else{
  
    const inputBuscar = document.querySelector('.busca__input');
    let buscaProdutoFiltrado = document.querySelector('.busca__produto__filtrado');
    
    
   inputBuscar.addEventListener("input", filtrarPesquisa);

   function filtrarPesquisa(){
        buscaProdutoFiltrado.innerHTML = '';
        if(inputBuscar.value != ''){
            produtosDisponiveis.forEach((produto) => {
                if(produto.nome.toLowerCase().includes(inputBuscar.value.toLowerCase())){
                buscaProdutoFiltrado.innerHTML +=
                        `
                            <div class="produto">
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
                            </div>  
                        `
                    }
                    
                })
                let produtoBtn = buscaProdutoFiltrado.querySelectorAll('.produto__botao');
                produtoBtn.forEach( btn => {
                    btn.addEventListener('click', (e)=> adicionarCarrinho(e))
                })
        }
    }
    
    
}
