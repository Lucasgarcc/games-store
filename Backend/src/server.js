import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import { DBPostgres } from './db-postgres.js';

// Criando uma instância do servidor Fastify
const server = fastify();

// Configurar CORS
server.register(fastifyCors, {
  origin: 'https://games-store-garc.vercel.app', // Permite apenas esse domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite envio de cookies (se necessário)
});

// banco de dados criando uma instancia
const database = new DBPostgres();

// Rota para registro dos dados
server.post('/products', async (request, reply) => {
  try {
    const {name,value,image} = request.body;

    await database.create({
      name,
      value,
      image,
    });

    return reply.status(201).send({message: 'Produto cadastrado com sucesso'});
  } catch (error) {
    console.error('Erro ao cadastrar produto!');

    return reply.status(500).send({error: 'Erro ao criar   cadastro de produto'});
  }

});


// Rota listar os dados registrados
server.get('/products', async (request) => {

  const search = request.query.search;
  const register =  await database.list(search);

  return register; 
});

// Rota para atulizar os dados registrados
server.put('/products/:id', async (request, reply) => {

  try {
      const registerID = request.params.id;
    const {name,value,image} = request.body;

    await database.update(registerID, {
      name,
      value,
      image,
    });

    return reply.status(200).send({ messae: 'Produto atualizado com sucesso'});
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);

    return reply.status(500).send({ error: 'Erro ao atualizar produto'});
  }

});

// Rota deletar os dados registrados
server.delete('/products/:id', async (request, reply) => {
  try {
    const registerID = request.params.id;
    await database.delete(registerID);
  
    return reply.status(204).send();
  } catch ( error) {
    console.error('Erro ao deletar produto:', error);
    return reply.status(500).send({ error: 'Erro ao deletar produto:'});
  }
});

// criando a coneção com servidor e resposta.
server.listen({host: '0.0.0.0', port: process.env.PORT ?? 3333 }, (err, address) => {
  if (err) console.error(err), process.exit(1);
  console.log(`Server running on port  ${address}`);
})