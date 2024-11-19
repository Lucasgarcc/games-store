// O token de autenticação deve ser inserido corretamente na string.

const NEON_API_KEY = 'seu_token_aqui';

fetch('https://games-store-aanh.onrender.com/products', {
  method: 'GET', 
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${NEON_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro na requisição:', error));



  
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



const sectionsScroll = document.querySelectorAll('[data-anima="scroll"]');
const windowView = window.innerHeight * 0.5;
const active  = 'active';

// variavel pega valor do window html atraves da prorpriedade
// innerHeight multiplicado por 60% da tela.

function animaScroll () {
  sectionsScroll.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const isSectionVIsible = sectionTop - windowView <= 0;
  // concatena a variavel -[section] a o metodo que pega,

    if (isSectionVIsible) {
      // varifica se valor do scroll da pagina for maior que zero.
        section.classList.add(active);
    } else  {
      section.classList.remove(active);
    }
  });
}

if (sectionsScroll.length) {
  animaScroll();
  window.addEventListener('scroll', animaScroll);
}


tag = document.querySelector('.products-slider-containers');

console.log(tag);


console.log('Arquivo app.js carregado com sucesso!');