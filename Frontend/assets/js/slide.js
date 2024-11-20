/* ===================== PRIMEIRO SLIDE =====================*/ 

const carSld = document.getElementById("carrusel-slides");
const carRight = document.querySelector(".btn-next");
const carLeft = document.querySelector(".btn-prev");

// Obtém a largura de um slide, considerando margem
const getSlideWidth = () => {
  const slide = document.querySelector(".slides .slide");
  return slide ? slide.offsetWidth + 20 : 220; // Slide + margem
};

// Botões de rolagem
carRight.onclick = () => {
  carSld.scrollLeft += getSlideWidth();
};

carLeft.onclick = function () {
  carSld.scrollLeft -= getSlideWidth();
};

// Função de Drag-and-Scroll
let isDragging = false;
let startX, scrollStart;

const startDragging = (e) => {
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX; // Suporte para toque
  scrollStart = carSld.scrollLeft;
  carSld.style.cursor = "grabbing";
};

const stopDragging = () => {
  isDragging = false;
  carSld.style.cursor = "grab";
};

const dragScroll = (e) => {
  if (!isDragging) return;
  const currentX = e.pageX || e.touches[0].pageX;
  const distance = startX - currentX;
  carSld.scrollLeft = scrollStart + distance;
};

// Eventos de mouse e toque
carSld.addEventListener("mousedown", startDragging);
carSld.addEventListener("touchstart", startDragging);

carSld.addEventListener("mousemove", dragScroll);
carSld.addEventListener("touchmove", dragScroll);

carSld.addEventListener("mouseup", stopDragging);
carSld.addEventListener("mouseleave", stopDragging);
carSld.addEventListener("touchend", stopDragging);

const slides = document.querySelectorAll('.slides .slide');

// Configura o IntersectionObserver para monitorar os slides

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {
    // Se o slide está visível (interseção), adiciona a classe 'visible'
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5 }); // Threshold de 50% para ser considerado visível

// Observa todos os slides
slides.forEach(slide => {
  observer.observe(slide);
});


carSld.addEventListener('wheel', function(event) {
  // Se o evento de rolagem for para baixo (roda para baixo)
  if (event.deltaY > 0) {
    // Move o carrossel para a direita
    carSld.scrollLeft += 220;  
  }
  // Se o evento de rolagem for para cima (roda para cima)
  else {
    // Move o carrossel para a esquerda
    carSld.scrollLeft -= 220;
  }

  // Impede o comportamento de rolagem vertical padrão (scroll na página)
  event.preventDefault();
}, { passive: false });


/* ===================== SEGUNDO SLIDE =====================*/ 

// Variáveis do segundo slide
const productSlides = document.querySelector('.products-list-slides');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

// Atualiza a visibilidade das setas
const atualizarSetas = () => {
  const maxScrollLeft = productSlides.scrollWidth - productSlides.clientWidth;
  setaEsquerda.style.display = productSlides.scrollLeft > 0 ? 'block' : 'none';
  setaDireita.style.display = productSlides.scrollLeft < maxScrollLeft ? 'block' : 'none';
};

// Evento de clique nas setas
setaEsquerda.addEventListener('click', () => {
  productSlides.scrollLeft -= 280; // Ajuste baseado no tamanho do item
  atualizarSetas();
});

setaDireita.addEventListener('click', () => {
  productSlides.scrollLeft += 280;
  atualizarSetas();
});

// Suporte para scroll horizontal com o mouse
productSlides.addEventListener('wheel', (event) => {
  event.preventDefault();
  const smoothScrollAmount = 80; // Ajuste para maior ou menor fluidez
  productSlides.scrollLeft += event.deltaY > 0 ? smoothScrollAmount : -smoothScrollAmount;
});

// Inicializa as setas
atualizarSetas();

// Drag-and-Scroll
let Dragging = false;
let startCardX, scrollCardStart;

// Início do arraste
const startSlideDragging = (e) => {
  Dragging = true;
  startCardX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
  scrollCardStart = productSlides.scrollLeft;
  productSlides.style.cursor = 'grabbing';
};

// Arrastando
const dragScrollSlide = (e) => {
  if (!Dragging) return;
  const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
  const distance = startCardX - currentX;
  productSlides.scrollLeft = scrollCardStart + distance;
};

// Fim do arraste
const stopDraggingSlide = () => {
  Dragging = false;
  productSlides.style.cursor = 'grab';
};

// Eventos de mouse e toque
productSlides.addEventListener('mousedown', startSlideDragging);
productSlides.addEventListener('touchstart', startSlideDragging);

productSlides.addEventListener('mousemove', dragScrollSlide);
productSlides.addEventListener('touchmove', dragScrollSlide);

productSlides.addEventListener('mouseup', stopDraggingSlide);
productSlides.addEventListener('mouseleave', stopDraggingSlide);
productSlides.addEventListener('touchend', stopDraggingSlide);
