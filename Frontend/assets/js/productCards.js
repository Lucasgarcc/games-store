// Selecionar o contêiner principal e os slides
const productContainer = document.querySelector('.product-container');
const cardContainer = document.querySelector('.product-images');
const slideProducts = document.querySelectorAll('.products-list-slides li');

// Selecionar as imagens do card-products
const cardProductsImages = document.querySelectorAll('.card-produtcs .card-item-img');

// Função para verificar se a imagem já existe no card-products
const getCardProductImages = () => {
  const imageSources = [];
  cardProductsImages.forEach((img) => {
    imageSources.push(img.src);
  });
  return imageSources;
};

// Função para pegar uma imagem do slide que não esteja repetida
const getUniqueSlideImage = (excludeImages) => {
  for (let item of slideProducts) {
    const slideImage = item.querySelector('img').src;
    if (!excludeImages.includes(slideImage)) {
      return slideImage;
    }
  }
  return null; // Retorna null se não encontrar uma imagem única
};

// Adicionar event listener para cada item do slide
slideProducts.forEach((item) => {
  const link = item.querySelector('a[href="#"]');
  link.addEventListener('click', () => {
    // Obter informações do produto clicado
    const productImage = link.querySelector('img').src;
    const productName = link.querySelector('h3').textContent;
    const productPrice = link.querySelector('span').textContent;
    const productDescription = link.querySelector('p').textContent; // Obter descrição real do produto

    // Selecionar os elementos do card principal
    const mainImage = cardContainer.querySelector('.card-emphasis-product img');
    const mainName = document.querySelector('.title h1');
    const mainPrice = document.querySelector('.title p');
    const mainDescription = document.querySelector('.product-content p');

    // Armazenar a imagem principal atual para troca
    const previousMainImageSrc = mainImage.src;

    // Verificar se a imagem clicada é diferente da principal
    if (mainImage.src !== productImage) {
      // Atualizar a imagem principal com a nova imagem
      mainImage.src = productImage;
      mainImage.alt = productName; // Atualizar o atributo alt
      // Atualizar nome, preço e descrição
      mainName.textContent = productName;
      mainPrice.textContent = productPrice;
      mainDescription.textContent = productDescription;

      // Verificar e atualizar os slots do card-products
      let cardImages = getCardProductImages(); // Obter imagens atuais no card-products

      cardProductsImages.forEach((cardImage, index) => {
        // Se a imagem do card for igual à do produto clicado, troque por outra imagem
        if (cardImage.src === productImage) {
          const uniqueImage = getUniqueSlideImage(cardImages);
          if (uniqueImage) {
            cardImage.src = uniqueImage;
            cardImage.alt = 'Imagem única';
          }
        }
      });

      // Verificar se algum slot ainda tem a imagem anterior e trocá-la
      cardProductsImages.forEach((cardImage) => {
        if (cardImage.src === previousMainImageSrc) {
          // Verifique se essa imagem já foi substituída e se ela é diferente
          const uniqueImage = getUniqueSlideImage(cardImages);
          if (uniqueImage) {
            cardImage.src = uniqueImage;
            cardImage.alt = 'Imagem única';
          }
        }
      });
    }

    // Scroll suave para o card principal
    cardContainer.scrollIntoView({
      behavior: 'smooth', // Definir o comportamento de rolagem suave
      block: 'start', // Alinha o card no topo da tela
    });
  });
});







