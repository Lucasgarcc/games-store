import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS form;`.then(() => {
//   console.log("Tabela apagada!");
// });

sql` CREATE TABLE products ( 
  id TEXT PRIMARY KEY, 
  name TEXT, 
  value DECIMAL(10,2), 
  image TEXT
);
`.then(() => {
  console.log('Tabela criada!');
}).catch(err => {
  console.error('Erro ao criar a tabela:', err);
});