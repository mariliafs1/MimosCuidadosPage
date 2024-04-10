const setas_up = document.querySelectorAll('.seta_up');
const setas_down = document.querySelectorAll('.seta_down');

const listas_menu = document.querySelectorAll('.footer ul');

const footerMenu = document.querySelectorAll('.footer__menu');

let isOpen = false;



const handdleMenuList = () =>{
    setas_up.forEach(seta => seta.classList.add('hide')); 
    listas_menu.forEach(lista => lista.classList.add('hide'));

}

const toggleMenu = (menu) =>{
    console.log(menu);

    if(!menu.children[1].classList.contains('hide')){
        menu.children[1].classList.add('hide');
        menu.children[2].classList.remove('hide');
        menu.nextElementSibling.classList.remove('hide');
    }else{
        menu.children[1].classList.remove('hide');
        menu.children[2].classList.add('hide');
        menu.nextElementSibling.classList.add('hide');
    }
}


footerMenu.forEach(menu => menu.addEventListener('click', () => toggleMenu(menu)));
handdleMenuList();






