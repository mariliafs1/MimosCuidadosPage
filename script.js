//barra menu

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

//fim barra menu


//carrossel menu inicio
const carrossel = document.querySelector('.carrossel__container');
const setasBtn = document.querySelectorAll('.carrossel__seta');
const primeiraImg_carrossel = document.querySelectorAll('.carrossel_img')[0];


const carrossel2 = document.querySelector('.carrossel2__container');
const setasUltimosLancamentos = document.querySelectorAll('.ultimos__lancamentos__carrossel__seta');
const primeiraImg2 = document.querySelectorAll('.produto')[0];
const primeiraImgProduto = document.querySelectorAll('.produto__img')[0];

let isArrastoStart = false, prevPageX, prevScrollLeft, prevPageX2, prevScrollLeft2;


const mostrarSeta = (carrosselVar, setasBtnVar) =>{
    let scrollWidth = carrosselVar.scrollWidth - carrosselVar.clientWidth;
    carrosselVar.scrollLeft == 0 ? setasBtnVar[0].classList.add("seta__hide") : setasBtnVar[0].classList.remove("seta__hide");
    carrosselVar.scrollLeft >= (scrollWidth - 1) ? setasBtnVar[1].classList.add("seta__hide") : setasBtnVar[1].classList.remove("seta__hide");
}

const arrastoSeta = (carrosselVar, setasBtnVar, primeiraImg, diff) =>{
    setasBtnVar.forEach(seta =>{
        seta.addEventListener("click", ()=>{
            let primeiraImgWidth = primeiraImg.clientWidth + diff;
            carrosselVar.classList.add("arrasto__seta");
            carrosselVar.scrollLeft += seta.classList.contains('left') ? -primeiraImgWidth : +primeiraImgWidth;
            setTimeout(()=> mostrarSeta(carrosselVar, setasBtnVar), 60);
        });
    });
}

arrastoSeta(carrossel, setasBtn, primeiraImg_carrossel, 15);

arrastoSeta(carrossel2, setasUltimosLancamentos, primeiraImg2, 15);

let positionDiff2;



const autoSlide = ()=>{

    if(carrossel2.scrollLeft == (carrossel2.scrollWidth - carrossel2.clientWidth)) return;
    if(carrossel2.scrollLeft == (0)) return;
    
    
    positionDiff2 = Math.abs(positionDiff2);
    let primeiraImg2Width = primeiraImg2.clientWidth +15;
    let valDifference = primeiraImg2Width - positionDiff2;
    if(carrossel2.scrollLeft > prevScrollLeft2 ){
        return carrossel2.scrollLeft += positionDiff2 > primeiraImg2Width/3 ? valDifference : -positionDiff2;

    }
    carrossel2.scrollLeft -= positionDiff2 > primeiraImg2Width/3 ? valDifference : -positionDiff2;
}

const arrastoStart = (e) =>{ 
    isArrastoStart = true;
    let elementoCarrossel = e.target.parentElement;
    

    if(elementoCarrossel.classList.contains('carrossel__container')){
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = elementoCarrossel.scrollLeft;
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        prevPageX2 = e.pageX || e.touches[0].pageX;
        prevScrollLeft2 = elementoCarrossel2.scrollLeft;
    }
    
}

const arrasto = (e) => {
    if(!isArrastoStart) return;
    e.preventDefault();

    let elementoCarrossel = e.target.parentElement;
    
    if(elementoCarrossel.classList.contains('carrossel__container')){
        
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.classList.add("arrasto__cursor");
        let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        elementoCarrossel.scrollLeft = prevScrollLeft - positionDiff;
        mostrarSeta(e.target.parentElement, setasBtn);

    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){

        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.classList.add("arrasto__cursor");
        positionDiff2 = (e.pageX || e.touches[0].pageX) - prevPageX2;
        elementoCarrossel2.scrollLeft = prevScrollLeft2 - positionDiff2;
        mostrarSeta(elementoCarrossel2, setasUltimosLancamentos);
    }
}

const arrastoStop = (e) =>{
    isArrastoStart = false;
    let elementoCarrossel = e.target.parentElement;
    if(elementoCarrossel.classList.contains('carrossel__container')){
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.classList.remove("arrasto__cursor");
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.classList.remove("arrasto__cursor");
        if(window.innerWidth<=550){
            autoSlide();
        }
    }
}

const scrollWheel = (e) =>{
    e.preventDefault();
    let elementoCarrossel = e.target.parentElement;
    if(elementoCarrossel.classList.contains('carrossel__container')){
        elementoCarrossel.classList.remove("arrasto__seta");
        elementoCarrossel.scrollLeft += e.deltaY;
        mostrarSeta(elementoCarrossel, setasBtn);
    }else if(elementoCarrossel.parentElement.parentElement.classList.contains('carrossel2__container')){
        let elementoCarrossel2 = elementoCarrossel.parentElement.parentElement;
        elementoCarrossel2.classList.remove("arrasto__seta");
        elementoCarrossel2.scrollLeft += e.deltaY;
        mostrarSeta(elementoCarrossel2, setasUltimosLancamentos);
    }
}

carrossel.addEventListener("mousedown", arrastoStart);
carrossel.addEventListener("touchstart", arrastoStart);

carrossel.addEventListener("mousemove", arrasto);
carrossel.addEventListener("touchmove", arrasto);

carrossel.addEventListener("mouseup", arrastoStop);
carrossel.addEventListener("touchend", arrastoStop);

carrossel.addEventListener("wheel", scrollWheel);

carrossel2.addEventListener("mousedown", arrastoStart);
carrossel2.addEventListener("touchstart", arrastoStart);

carrossel2.addEventListener("mousemove", arrasto);
carrossel2.addEventListener("touchmove", arrasto);

carrossel2.addEventListener("mouseup", arrastoStop);
carrossel2.addEventListener("touchend", arrastoStop);

carrossel2.addEventListener("wheel", scrollWheel);

//carrossel menu fim

//carrossel2









//carrossel 2 fim