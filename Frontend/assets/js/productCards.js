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


/*==================== AREA DE PESQUISA DE PRODUTOS ====================*/

function selectorTag(element) {
  const el = document.querySelector(element);

  if (el) {
    return el;
  } else {
    console.warn(`Elemento com o seletor '${element}' não encontrado.`);
    return null;
  }
}

const searchProduct = selectorTag('#aria-search');
const products = document.querySelectorAll('[data-products] li');

// Contêiner para exibir os resultados
const searchResultsContainer = document.querySelector('.list-product-register .list-container-register');

const listProducts = [];

if (searchProduct && searchResultsContainer) {
  searchProduct.addEventListener('input', (event) => {
    const input = event.target.value.trim().toLowerCase();

    // Limpa os resultados anteriores
    searchResultsContainer.innerHTML = '';
    listProducts.length = 0; // Limpa a lista dinâmica de produtos

    let productFound = false;

    products.forEach((product) => {
      const productName = product.querySelector('.product-name').textContent.toLowerCase();
      const productValue = product.querySelector('.product-price').textContent;
      const productImage = product.querySelector('img').src;

      if (productName.includes(input)) {
        productFound = true;

        // Verifica se o produto já está na lista dinâmica
        const existingProduct = listProducts.find((p) => p.name === productName);
        if (!existingProduct) {
          const productData = {
            name: productName,
            value: productValue,
            image: productImage,
          };
          listProducts.push(productData);

          // Cria o item da lista e adiciona ao contêiner
          const listItem = document.createElement('li');
          listItem.classList.add('list-register-item', 'grid');
          listItem.innerHTML = `
            <div>
              <img src="${productData.image}" alt="${productData.name}">
            </div>
            <div>
              <h3 class="cor-9">${productData.name}</h3>
              <span class="cor-7">${productData.value}</span>
              <span class="cor-10">
                <p>${productData.description || 'Descrição indisponível.'}</p>
              </span>
            </div>
          `;
          searchResultsContainer.appendChild(listItem);
        }
      }
    });

    if (!productFound) {
      // Exibe uma mensagem de "Nenhum produto encontrado"
      searchResultsContainer.innerHTML = `
        
          <div class="list-error-product">
            <p>Nenhum produto encontrado para: <span>"${input}"</span></p>
            <i class="uil uil-exclamation-octagon"></i>
          </div>
      `;
    }
  });
}


