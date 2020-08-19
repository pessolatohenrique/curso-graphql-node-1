const executaQuery = require("../database/queries");

class Cliente {
  async lista() {
    const sqlCliente = "SELECT * FROM Clientes";
    const sqlPet = "SELECT * FROM Pets";

    const clientes = await executaQuery(sqlCliente);
    const pets = await executaQuery(sqlPet);

    const clientesMaped = [...clientes].map((item) => {
      const petsCliente = pets.filter((pet) => pet.donoId === item.id);
      return { ...item, pets: petsCliente };
    });

    return clientesMaped;
  }

  async buscaPorId(id) {
    const sqlCliente = `SELECT * FROM Clientes WHERE id=${id}`;
    const resultCliente = await executaQuery(sqlCliente);

    const sqlPet = `SELECT * FROM Pets WHERE donoId=${id}`;
    const pets = await executaQuery(sqlPet);

    const response = {
      ...resultCliente[0],
      pets: pets,
    };

    return response;
  }

  async adiciona(item) {
    const { nome, cpf } = item;
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`;

    const response = await executaQuery(sql);

    return {
      id: response.insertId,
      nome,
      cpf,
    };
  }

  async atualiza(novoItem) {
    const { id, nome, cpf } = novoItem;
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`;

    await executaQuery(sql);

    return novoItem;
  }

  async deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`;

    await executaQuery(sql);

    return id;
  }
}

module.exports = new Cliente();
