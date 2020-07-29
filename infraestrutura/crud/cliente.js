const executaQuery = require("../database/queries");

class Cliente {
  lista() {
    const sql = "SELECT * FROM Clientes";

    return executaQuery(sql);
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}`;
    const result = await executaQuery(sql);

    return result[0];
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
