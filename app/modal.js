
const modalContainer = document.querySelector('.modal__sacola__container');
const modal = document.querySelector('.modal__sacola p');
const botaoModalClose = document.querySelector('.modalBtn__sacola__close')


function openModal(modalText){
    modalContainer.classList.add('modal__sacola__show');
    modal.textContent = modalText;
}

function closeModal(){
    modalContainer.classList.remove('modal__sacola__show');
}

botaoModalClose.addEventListener('click', closeModal);
modalContainer.addEventListener('click', closeModal);
