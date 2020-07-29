const executaQuery = require("../database/queries");

class Pet {
  lista() {
    const sql = "SELECT * FROM Pets";

    return executaQuery(sql);
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Pets WHERE id=${parseInt(id)}`;

    executaQuery(sql);
  }

  async adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item;

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`;

    const response = await executaQuery(sql);

    return {
      id: response.insertId,
      nome,
      donoId,
      tipo,
      observacoes,
    };
  }

  atualiza(novoItem, id) {
    const { nome, dono, tipo, observacoes } = novoItem;

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${dono}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`;

    executaQuery(sql);
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`;

    executaQuery(sql);
  }
}

module.exports = new Pet();
