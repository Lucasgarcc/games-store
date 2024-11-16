// const BearerToken = `9333xcilsoxkqi23rhd45vpeko9vgg82xm57ozjvnn7s7g7uvj7np4wpdc1dns3n`

// fetch('https://console.neon.tech/api/v2/',
//  'Accept: application/json', 
//   "Authorization: Bearer ${NEON_API_KEY}", 
//  'Content-Type: application/json',
// )


const carSld = document.getElementById("carrusel-slides");
const carRight = document.querySelector(".btn-next");
const carLeft = document.querySelector(".btn-prev");

// Obtém a largura de um slide, considerando margem
const getSlideWidth = () => {
  const slide = document.querySelector(".slides .slide");
  return slide ? slide.offsetWidth + 20 : 220; // Slide + margem
};

// Botões de rolagem
carRight.onclick = function () {
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
const observer = new IntersectionObserver((entries, observer) => {
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



/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.querySelector('#nav-menu'),
  navToggle = document.querySelector('#nav-toggle'),
  navClose = document.querySelector('#nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
function toggleMenu() {
  // Alterna a classe de mostrar o menu
  navMenu.classList.toggle('show-menu');

  // Também alterna a classe para mudar o ícone do botão
  navToggle.classList.toggle('active');
}

// Exibe o menu ao clicar no ícone de abrir
if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

// Esconde o menu ao clicar no ícone de fechar
if (navClose) {
  navClose.addEventListener('click', toggleMenu);
}


/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
  const menu = document.querySelector('#nav-menu')
  toggleMenu(navMenu);
}
navLink.forEach(item => item.addEventListener('click', linkAction));


/*==================== ADD ICONE LINKS DO MENU ====================*/

const menuContent = document.querySelectorAll('.menu-content'); // Seleciona todos os menu-content


menuContent.forEach(menu =>  {
  const menuItem = menu.querySelectorAll('li'); 

  menuItem.forEach(item => {
    item.addEventListener('click', () => {

      // Remove active se tiver active
      menuItem.forEach(link => link.classList.remove('active'));
    
      // Adiciona active a cada link for clicado
      item.classList.add('active')

    });
  });
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sectionsScroll = document.querySelectorAll('[data-anima-scroll]');
const viewWindow = window.innerHeight * 0.5; // Corrigido de 'veiwWindow' para 'viewWindow'
const active = 'active';

function animaScroll() {
  sectionsScroll.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top; // Corrigido de 'getBoundingClientReact' para 'getBoundingClientRect'
    const isSectionVisible = sectionTop - (window.innerHeight - viewWindow) <= 0; // Corrigido de 'isSectinVisible' para 'isSectionVisible'

    if (isSectionVisible) {
      section.classList.add(active);
    } else {
      section.classList.remove(active);
    }
  });
}

// Adiciona o evento 'scroll' para chamar a animação quando o usuário rolar
window.addEventListener('scroll', animaScroll);

// Chamada inicial para verificar a visibilidade ao carregar a página
animaScroll(); 

/*==================== SCROLL SECTIONS ====================*/
// Seleciona todas as seções que possuem um ID
const sections = document.querySelectorAll('section[id]');

function handleVisibility() {
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    // Se a seção estiver visível no viewport
    if (sectionTop < windowHeight && sectionBottom > 0) {
      section.classList.add('visible'); // Adiciona a classe "visible" quando a seção está visível
    } else {
      section.classList.remove('visible'); // Remove a classe "visible" quando a seção não está visível
    }
  });
}

// Adiciona o evento 'scroll' para monitorar a rolagem e chamar a função
window.addEventListener('scroll', handleVisibility);

// Chama a função inicialmente para verificar as seções visíveis ao carregar
handleVisibility(); 


