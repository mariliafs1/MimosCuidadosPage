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

let isArrastoStart = false, prevPageX, prevScrollLeft;


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



const arrastoStart = (e) =>{ 
    isArrastoStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carrossel.scrollLeft;
    console.log(e);
    console.log('aquit');
}

const arrasto = (e) => {
    if(!isArrastoStart) return;
    e.preventDefault();
    carrossel.classList.remove("arrasto__seta");
    carrossel.classList.add("arrasto__cursor");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrossel.scrollLeft = prevScrollLeft - positionDiff;
    mostrarSeta(carrossel, setasBtn);
}

const arrastoStop = () =>{
    isArrastoStart = false;
    carrossel.classList.remove("arrasto__seta");
    carrossel.classList.remove("arrasto__cursor");
}

const scrollWheel = (e) =>{
    e.preventDefault();
    carrossel.classList.remove("arrasto__seta");
    carrossel.scrollLeft += e.deltaY;
    mostrarSeta(carrossel, setasBtn);
}

carrossel.addEventListener("mousedown", arrastoStart);
carrossel.addEventListener("touchstart", arrastoStart);

carrossel.addEventListener("mousemove", arrasto);
carrossel.addEventListener("touchmove", arrasto);

carrossel.addEventListener("mouseup", arrastoStop);
carrossel.addEventListener("touchend", arrastoStop);

carrossel.addEventListener("wheel", scrollWheel);

//carrossel menu fim

//carrossel2

const carrossel2 = document.querySelector('.carrossel2__container');
const setasUltimosLancamentos = document.querySelectorAll('.ultimos__lancamentos__carrossel__seta');
const primeiraImg2 = document.querySelectorAll('.produto')[0];

let isArrastoStart2 = false, prevPageX2, prevScrollLeft2;

arrastoSeta(carrossel2, setasUltimosLancamentos, primeiraImg2, 15);

const arrastoStart2 = ( e) =>{
    isArrastoStart2 = true;
    prevPageX2 = e.pageX || e.touches[0].pageX;
    prevScrollLeft2 = carrossel2.scrollLeft;
    console,log('aqui');
}

const arrasto2 = (e) => {
    if(!isArrastoStart2) return;
    e.preventDefault();
    carrossel2.classList.remove("arrasto__seta");
    carrossel2.classList.add("arrasto__cursor");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX2;
    carrossel2.scrollLeft = prevScrollLeft2 - positionDiff;
    mostrarSeta(carrossel2, setasUltimosLancamentos);
    console.log('aqui2');
}

const arrastoStop2 = () =>{
    isArrastoStart2 = false;
    carrossel2.classList.remove("arrasto__seta");
    carrossel2.classList.remove("arrasto__cursor");
    console.log('aqui3');
}

const scrollWheel2 = (e) =>{
    e.preventDefault();
    carrossel2.classList.remove("arrasto__seta");
    carrossel2.scrollLeft += e.deltaY;
    mostrarSeta(carrossel2, setasUltimosLancamentos);
}

carrossel2.addEventListener("mousedown", arrastoStart2);
carrossel2.addEventListener("touchstart", arrastoStart2);

carrossel2.addEventListener("mousemove", arrasto2);
carrossel2.addEventListener("touchmove", arrasto2);

carrossel2.addEventListener("mouseup", arrastoStop2);
carrossel2.addEventListener("touchend", arrastoStop2);

carrossel2.addEventListener("wheel", scrollWheel2);

//carrossel 2 fim