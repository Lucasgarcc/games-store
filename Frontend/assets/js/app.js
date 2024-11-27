
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


/*==================== ANIMA SCROLL ====================*/

const sectionsScroll = document.querySelectorAll('[data-anima="scroll"]');
const windowView = window.innerHeight * 0.5;
const active = 'active';
const modalProduct = document.querySelector('.modal'); // Seleciona o modal
const activeModalProduct = 'active-modal-products'; // Classe usada para indicar que o modal está ativo

// Função para animar as sections
function animaScroll() {
  // Verificar se o modal está ativo
  if (modalProduct && modalProduct.classList.contains(activeModalProduct)) {
    return; // Interromper a animação se o modal estiver ativo
  }

  sectionsScroll.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const isSectionVisible = sectionTop - windowView <= 0;

    if (isSectionVisible) {
      section.classList.add(active);
    } else {
      section.classList.remove(active);
    }
  });
}

// Verificar se há sections para animar
if (sectionsScroll.length) {
  animaScroll();
  window.addEventListener('scroll', animaScroll);
}

/*==================== ICONE DE SCROLL ====================*/

window.addEventListener('load', function () {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const bottomPosition = scrollIndicator.getAttribute('data-bottom');

  scrollIndicator.style.bottom = `${bottomPosition}px`;
});

window.addEventListener('scroll', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (window.scrollY > 0) {
    scrollIndicator.style.display = 'none';
  } else {
    scrollIndicator.style.display = 'block';
  }
});

/*==================== GERENCIAR MODAL ====================*/

const modalManage = document.querySelectorAll('.services-modal');
const buttonManage = document.querySelectorAll('.services-button');
const closeManage = document.querySelectorAll('.services-modal-close');
const activeModal = 'active-modal';

buttonManage.forEach((button, i) => {
  button.addEventListener('click', () => {
    if (modalManage[i]) {
      modalManage[i].classList.add(activeModal);
    }
  });
});

closeManage.forEach((closeButton, index) => {
  closeButton.addEventListener('click', () => {
    if (modalManage[index]) {
      modalManage[index].classList.remove(activeModal);
    }
  });
});

// Gerenciar o modal e esconder o container
const container = document.querySelector('.product-slide-section');
const buttonProduct = document.querySelector('.search-button'); // Botão para abrir o modal
const closeProduct = document.querySelector('.modal-close'); // Botão para fechar o modal

if (buttonProduct && modalProduct && closeProduct) {
  buttonProduct.addEventListener('click', () => {
    modalProduct.classList.add(activeModalProduct);
    container.style.display = 'none'; // Esconde o container
  });

  closeProduct.addEventListener('click', () => {
    modalProduct.classList.remove(activeModalProduct);
    container.style.display = 'block'; // Mostra o container novamente
  });
} else {
  console.warn('Alguns elementos do modal não foram encontrados no DOM.');
}
