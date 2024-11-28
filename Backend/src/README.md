# **📚 Backend da Games Store - Estrutura e Funcionalidades**

Projeto contruído com o objetivo fornece uma visão geral da estrutura e das funcionalidades do backend do projeto Games Store. O backend foi desenvolvido utilizando Fastify, CORS e PostgreSQL.

<!-- **[🔗 Clique aqui para acessar]()** -->

## **🛠 Tecnologias**
- Fastify: Framework web rápido e eficiente para Node.js.
- CORS: Módulo para habilitar Cross-Origin Resource Sharing, permitindo que o frontend se comunique com o backend.
- PostgreSQL: Sistema de gerenciamento de banco de dados relacional robusto e escalável.

## **🌐 Rotas Implementadas:**
### POST /products:
- Descrição: Cadastra um novo produto no banco de dados.

- Parâmetros: name, value, image.

### Exemplo de Requisição:
![image](https://github.com/user-attachments/assets/b6644064-49b8-4756-b95d-264dd23c294a)


- Validação de Resposta: Valida o status da resposta com try e catch, emitindo mensagens personalizadas em caso de erro.

### GET /products:

- Descrição: Consulta todos os produtos cadastrados no banco de dados.

- Validação de Resposta: Valida o status da resposta com try e catch, emitindo mensagens personalizadas em caso de erro.

### PUT /products/:id:

- Descrição: Atualiza um produto existente no banco de dados com base no id e nos dados fornecidos.

- Parâmetros: id, name, value, image.

### Exemplo de Requisição:
![image](https://github.com/user-attachments/assets/adfe6284-1f4b-4fdd-9dd2-be788e1573be)

### DELETE /products/:id:

-  Descrição: Deleta um produto do banco de dados com base no id.

- Parâmetros: id.

- Validação de Resposta: Valida o status da resposta com try e catch, emitindo mensagens personalizadas em caso de erro.


##⚙️ **Validação e Tratamento de Erros:**
- Todas as rotas possuem validação de resposta utilizando blocos try e catch para garantir que, em caso de erro, uma mensagem personalizada seja emitida.

- 🚀**Instruções para Configuração:**
- #### **Instalar Dependências:**
![image](https://github.com/user-attachments/assets/3fd407b8-e329-46b0-a2da-ea9714b49688)


### **Configurar Banco de Dados:**

- Certifique-se de ter o PostgreSQL instalado e configurado.

- Crie um banco de dados para o projeto.

- Configurar Conexão com o Banco de Dados:

- No arquivo de configuração do projeto, forneça as credenciais de acesso ao banco de dados.

- **Inicializar o Servidor:**

  
 ![image](https://github.com/user-attachments/assets/06dbd998-4567-495b-be9a-0c19cfe10db0)



##Descrição: Cadastra um novo produto no banco de dados.





> ### _Banco de Dados_
>
> ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
>
> ### _Server_
>
> ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
>
> ### _Librarys e Ferramentas_
>
> ![Visual Studio Code](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
> ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
> ![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
>
> ### _Pacotes e extensões_
>
> ![EsLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
> ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
