//carrossel menu inicio
const carrossel = document.querySelector('.carrossel__container');
const setasBtn = document.querySelectorAll('.carrossel__seta');
const primeiraImg = document.querySelectorAll('.carrossel_img')[0];

let isArrastoStart = false, prevPageX, prevScrollLeft;

const mostrarSeta = () =>{
    let scrollWidth = carrossel.scrollWidth - carrossel.clientWidth;
    carrossel.scrollLeft == 0 ? setasBtn[0].classList.add("seta__hide") : setasBtn[0].classList.remove("seta__hide");
    carrossel.scrollLeft >= (scrollWidth - 1) ? setasBtn[1].classList.add("seta__hide") : setasBtn[1].classList.remove("seta__hide");
    console.log(scrollWidth);
    console.log("client: " + carrossel.clientWidth);
    console.log("scrollwidth: "+ carrossel.scrollWidth);
    console.log(carrossel.scrollLeft);
}

setasBtn.forEach(seta =>{
    seta.addEventListener("click", ()=>{
        let primeiraImgWidth = primeiraImg.clientWidth + 8;
        carrossel.classList.add("arrasto__seta");
        carrossel.scrollLeft += seta.id == 'left' ? -primeiraImgWidth : +primeiraImgWidth;
        setTimeout(()=> mostrarSeta(), 60);
    });
});


const arrastoStart = ( e) =>{
    isArrastoStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carrossel.scrollLeft;
}

const arrasto = (e) => {
    if(!isArrastoStart) return;
    e.preventDefault();
    carrossel.classList.remove("arrasto__seta");
    carrossel.classList.add("arrasto__cursor");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrossel.scrollLeft = prevScrollLeft - positionDiff;
    mostrarSeta();
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
    mostrarSeta();
}

carrossel.addEventListener("mousedown", arrastoStart);
carrossel.addEventListener("touchstart", arrastoStart);

carrossel.addEventListener("mousemove", arrasto);
carrossel.addEventListener("touchmove", arrasto);

carrossel.addEventListener("mouseup", arrastoStop);
carrossel.addEventListener("touchend", arrastoStop);

carrossel.addEventListener("wheel", scrollWheel);

//carrossel menu fim

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