import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
export class DBPostgres {
  async list(search) {
    let data;

    if (search) {
      data = await sql`select * from  products where title ilike ${
      "%" + search + "%"}`;
    } else {
      data = await sql`select * from forms`;
    }
    return data;
  }

  async create(data) {
    const dataID = randomUUID();
    const {name, value, image} = data;

    await sql`insert into products (id, name, value, image) VALUES (${dataID}, ${name}, ${value}, ${image})`;

  }

  async update(id, data) {
    const { name, value, image } = data;
    await sql`
      update products 
    set name = ${name},
        value = ${value},
        image = ${image}
    WHERE id = ${id}
    `;
  }

  async delete(id) {
    await sql`delete from products where id = ${id}`;
  }
};

