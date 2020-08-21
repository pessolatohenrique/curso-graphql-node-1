const executaQuery = require("../database/queries");

class Servico {
  lista() {
    const sql = "SELECT * FROM Servicos";

    return executaQuery(sql);
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`;
    const result = await executaQuery(sql);

    return result[0];
  }

  async adiciona(item) {
    const { nome, preco, descricao } = item;
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`;

    const response = await executaQuery(sql);
    const finalResponse = {
      id: response.insertId,
      ...item,
    };

    return finalResponse;
  }

  async atualiza(novoItem) {
    const { id, nome, preco, descricao } = novoItem;
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`;
    await executaQuery(sql);

    return novoItem;
  }

  async deleta(id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`;
    await executaQuery(sql);

    return id;
  }
}

module.exports = new Servico();
