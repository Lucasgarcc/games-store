import { sql } from "./db.js";

sql`
  CREATE TABLE IF NOT EXISTS products ( 
    id UUID PRIMARY KEY, 
    name TEXT NOT NULL, 
    value DECIMAL(10, 2) NOT NULL, 
    image TEXT
  );
`
  .then(() => {
    console.log('Tabela "products" criada com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao criar a tabela "products":', err);
  });
