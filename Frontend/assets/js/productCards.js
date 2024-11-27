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
const searchResultsContainer = document.querySelector('.list-product-register .list-container-register');

async function initializeSearch() {
  const listProducts = [];

  // Adiciona os produtos locais à lista
  products.forEach((product) => {
    const name = product.querySelector('.product-name').textContent.toLowerCase();
    const value = product.querySelector('.product-price').textContent;
    const image = product.querySelector('img').src;

    listProducts.push({
      id: null,
      name,
      value,
      image,
      description: 'Descrição indisponível.',
    });
  });

  // Busca os produtos da API e os adiciona à lista
  try {
    const response = await fetch('https://games-store-aanh.onrender.com/products');
    const dataAPI = await response.json();

    dataAPI.forEach((product) => {
      listProducts.push({
        id: product.id,
        name: product.name.toLowerCase(),
        value: product.value,
        image: product.image,
        description: product.description || 'Descrição indisponível.',
      });
    });
  } catch (error) {
    console.error('Erro ao obter produtos da API:', error);
  }

  // Configura o evento de pesquisa
  if (searchProduct) {
    searchProduct.addEventListener('input', (event) => {
      const input = event.target.value.trim().toLowerCase();

      // Limpa os resultados anteriores
      searchResultsContainer.innerHTML = '';
      let productFound = false;

      // Filtra e renderiza os produtos que correspondem à pesquisa
      listProducts.forEach((product) => {
        if (product.name.includes(input)) {
          productFound = true;

          const listItem = document.createElement('li');
          listItem.classList.add('list-register-item', 'grid');
          listItem.innerHTML = `
            <div>
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div>
              <h3 class="cor-10">Code: </h3>
             <span class="cor-7" >${product.id || 'Estático' }</span> 
             
              <h3 class="cor-9">${product.name}</h3>
              <span class="cor-7">${product.value}</span>
              <span class="cor-10">
                <p>${product.description}</p>
              </span>
            </div>
          `;
          searchResultsContainer.appendChild(listItem);
        }
      });

      // Exibe mensagem se nenhum produto for encontrado
      if (!productFound) {
        searchResultsContainer.innerHTML = `
          <div class="list-error-product">
            <p>Nenhum produto encontrado para: <span>"${input}"</span></p>
            <i class="uil uil-exclamation-octagon"></i>
          </div>
        `;
      }
    });
  }
}

initializeSearch();


/*==================== CONFIGURAÇÃO DE VARIÁVEIS ====================*/
const url = 'https://games-store-aanh.onrender.com/products';

/*==================== FUNÇÃO CENTRAL DE API ====================*/
async function api(endpoint = '', options = {}) {
  try {
    const headers = options.body ? { 'Content-Type': 'application/json' } : {};

    const response = await fetch(`${url}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro: ${response.status} - ${errorMessage}`);
    }

    if (response.status === 204) return { message: 'Operação concluída com sucesso' };

    return await response.json();
  } catch (error) {
    console.error('Erro ao acessar a API:', error.message);
    return null;
  }
}

/*==================== RENDERIZAÇÃO DE PRODUTOS ====================*/

// Função para adicionar o produto na lista de produtos

async function addProductList(product) {
  // Desestrutura o objeto 'product' para obter os valores: id, name, value e image
  const {id, name, value, image} = product;

  // Cria um elemento li a cada item do produto
  const createItem = document.createElement('li');

  // Define o atributo 'data-id' com o ID do produto
  createItem.setAttribute('data-id', id);

  // Preenche o conteúdo do item da lista com HTML
  createItem.innerHTML = `
    <a href="#!">
      <img src="${image}" alt="${name}">
      <h3 class="product-name">${name}</h3>
      <span class="product-price">R$ ${value}</span>
    </a>
  `;

  // Adiciona o elemento criado à lista de produtos no DOM
   const slideProducts = document.querySelector('.products-list-slides');
  slideProducts.appendChild(createItem);
}


/*==================== GET: LISTAR PRODUTOS ====================*/

// Função para obter a lista de produtos da API
async function getProducts() {
  try {
    // Faz uma requisição à API para obter a lista de produtos
    const products = await api(); 

    // Verifica se há produtos na resposta e os adiciona à lista de produtos no DOM.
    // Caso contrário, exibe um aviso no console.
    (products && products.length) ? products.forEach(addProductList) 
    : console.warn('Nenhum produto encontrado!');
    
  }  catch (error) {
    console.error('Erro ao obter produtos:', error);
  }
}


/*==================== POST: ADICIONAR PRODUTO ====================*/

// Função para adicionar um novo produto
async function createProduct(name, value, image) {
  // Cria um objeto contendo os dados do novo produto
  const newProduct = { name, value, image};

  // Faz uma requisição à API para adicionar o novo produto
  const postProduct = await api('', {
    method: 'POST',
    body: JSON.stringify(newProduct),
  });

  // Se o produto foi criado com sucesso, exibe no console e atualiza o DOM
  postProduct && console.log('Produto criado com sucesso:', postProduct), addProductList(postProduct);
}

// Botão de cadastrar produto (POST)
const sendButton = selectorTag('#send-data');

// Adiciona o evento de clique ao botão
sendButton.addEventListener('click', async (event) => {
  // Impede o comportamento padrão do evento (caso o botão seja um link, por exemplo)
  event.preventDefault();

  // Obtém os valores dos campos de entrada: nome, valor e imagem
  const name = selectorTag('#name').value.trim();
  const value = parseFloat(selectorTag('#value').value);  // Converte o valor para número
  const image = selectorTag('#image').value.trim();

  // Exibe no console os dados para cadastro
  console.log(`Dados para cadastro: Name:${name}, Value:${value}, Image:${image}`);

  // Verifica se todos os campos obrigatórios (nome, valor e imagem) estão preenchidos
  if (name && value && image) {
    // Se todos os dados forem válidos, chama a função para cadastrar o produto
    await createProduct(name, value, image);

    // Limpa os campos após o envio do produto
    selectorTag('#name').value = ''; 
    selectorTag('#value').value = '';
    selectorTag('#image').value = ''; 

  } else {
    // Caso algum campo obrigatório esteja vazio, exibe um aviso no console
    console.warn('Prencha todos os dados para cadastrar corretamente!');
  }

});


/*==================== PUT: ATUALIZAR PRODUTO ====================*/


// Função para atualizar um produto (PUT)
async function updateProduct(id, updateData) {
  try {
    // Envia a requisição para atualizar o produto
    const updatedProduct = await api(`/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!updatedProduct) {
      console.error('Erro: Não foi possível atualizar o produto.');
      return;
    }

    console.log('Produto atualizado com sucesso:', updatedProduct);

    // Atualiza os valores na DOM se o produto existir
    const productElement = document.querySelector(`[data-id="${id}"]`);
    if (productElement) {
      productElement.querySelector('.product-name').textContent = updatedProduct.name;
      productElement.querySelector('.product-price').textContent = updatedProduct.value;
      productElement.querySelector('img').src = updatedProduct.image;
    } else {
      console.warn(`Produto com ID ${id} não encontrado no DOM para atualização.`);
    }

    return updatedProduct;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
  }
}

// Evento do botão de atualização
const updateButton = selectorTag('#update-data');

// Adiciona o evento de clique ao botão
updateButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Evita comportamento padrão do botão

  // Obtém os valores dos campos de entrada
  const id = selectorTag('#code').value.trim();
  const name = selectorTag('#name-update').value.trim();
  const value = parseFloat(selectorTag('#value-update').value);  // Converte para número
  const image = selectorTag('#image-update').value.trim();

  // Log para depuração
  console.log(`Dados para Atualização: ID:${id}, Name:${name}, Value:${value}, Image:${image}`);

  // Verifica se o ID é válido
  const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
  if (!id || !isValidUUID) {
    console.warn('ID inválido para atualização. Certifique-se de que é um UUID válido.');
    alert('ID inválido! Por favor, verifique o código.');
    return;
  }

  // Verifica se os dados obrigatórios estão preenchidos
  if (!name || isNaN(value) || value <= 0 || !image) {
    console.warn('Preencha todos os campos corretamente antes de atualizar!');
    alert('Preencha todos os campos corretamente!');
    return;
  }

  try {
    // Chama a função para atualizar o produto
    await updateProduct(id, { name, value, image });
    alert('Produto atualizado com sucesso!');

    // Limpa os campos após o envio do produto
    selectorTag('#code').value = '';
    selectorTag('#name').value = '';
    selectorTag('#value').value = '';
    selectorTag('#image').value = '';
  } catch (error) {
    alert('Erro ao atualizar o produto. Tente novamente mais tarde.');
    console.error(error);
  }
});



/*==================== DELETE: EXCLUIR PRODUTO ====================*/

async function deleteProduct(id) {
  // Exclui o produto utilizando o ID fornecido
  const deleteResp = await api(`/${id}`, {
    method: 'DELETE',
  });

  // Se a resposta for bem-sucedida, remove o item da lista
  if (deleteResp) {
    const product = document.querySelector(`[data-id="${id}"]`);
    product && product.remove();
    console.log('Produto excluído com sucesso!');
  } else {
    console.error('Falha ao excluir o produto!');
  }
}


// Botão de deletar produto (DELETE)
const deleteButton = selectorTag('#delete-data');

deleteButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const id = selectorTag('#code').value.trim();

  console.log(`Tentativa de exclusão do produto com ID: ${id}`);

  if (!id || id.length !== 36) {
    console.warn('ID inválido para exclusão.');
    return;
  }

  // Exibe um aviso no console caso queira mesmo deletar produto
  const confirmDelete = confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`);
  if (confirmDelete) {
    await deleteProduct(id);
  }
});


/*==================== INICIALIZAÇÃO ====================*/
getProducts();

/*==================== SCROLL BOTÂO PESQUISAR ATÈ MODAL  ====================*/

selectorTag('.search-button').addEventListener('click', (event) => {
  event.preventDefault(); // Impede o comportamento padrão do link

  const modalElement = selectorTag('.modal-content');
  if (modalElement) {
    modalElement.scrollIntoView({
      behavior: 'smooth', // Rola suavemente
      block: 'start', // Alinha ao topo do elemento
    });
  } else {
    console.warn('Elemento com a classe ".modal" não encontrado.');
  }
});
