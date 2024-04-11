//lida com o menu hamburguer

const hamburguerBtn = document.querySelector('.cabecalho_botao');
const overlay = document.querySelector('.overlay');

hamburguerBtn.onclick = function(){
    if(hamburguerBtn.checked){
        overlay.classList.remove('overlay_desativado');
    }
}

overlay.onclick = function(){
    overlay.classList.add('overlay_desativado');
    hamburguerBtn.checked = false;
}

const sacolaIcon = document.querySelector('.cabecalho__icons__sacola');
const home = document.querySelector('#home');

const trocarPaginaSacola = ()=>{

    if(home.classList.contains('hide')){
        home.classList.remove('hide');
        return;
    }

    home.classList.add('hide');
}

sacolaIcon.addEventListener('click', trocarPaginaSacola);