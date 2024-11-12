import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DBPostgres {
  // Método para listar produtos, com filtro opcional
  async list(search) {
    try {
      let data;

    if (search) {
        data = await sql`
          SELECT * FROM products 
          WHERE name ILIKE ${'%' + search + '%'}
        `;
      } else {
        data = await sql`SELECT * FROM products`;
      }
      
      return data;
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw new Error("Erro ao listar produtos");
    }
  }

  // Método para criar um novo produto
  async create(data) {
    try {
      const dataID = randomUUID();
      const { name, value, image } = data;

      await sql`
        INSERT INTO products (id, name, value, image) 
        VALUES (${dataID}, ${name}, ${value}, ${image})
      `;

    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Erro ao criar produto");
    }
  }

  // Método para atualizar um produto existente
  async update(id, data) {
    try {
      const { name, value, image } = data;

      await sql`
        UPDATE products 
        SET name = ${name},
            value = ${value},
            image = ${image}
        WHERE id = ${id}
      `;

    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw new Error("Erro ao atualizar produto");
    }
  }

  // Método para deletar um produto
  async delete(id) {
    try {
      await sql`DELETE FROM products WHERE id = ${id}`;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw new Error("Erro ao deletar produto");
    }
  }
}
