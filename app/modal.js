
const modalContainer = document.querySelector('.modal__sacola__container');
const modal = document.querySelector('.modal__sacola');
const botaoModalClose = document.querySelector('.modalBtn__sacola__close')

function openModal(){
    modalContainer.classList.add('modal__sacola__show');
}

function closeModal(){
    modalContainer.classList.remove('modal__sacola__show');
}

botaoModalClose.addEventListener('click', closeModal);
modalContainer.addEventListener('click', closeModal);
