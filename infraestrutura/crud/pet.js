const executaQuery = require("../database/queries");

class Pet {
  async lista() {
    const sql =
      "SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id AS clienteId, Clientes.nome AS clienteNome, Clientes.cpf AS clienteCpf FROM Pets INNER JOIN Clientes ON Pets.donoId = Clientes.id";

    const pets = await executaQuery(sql);

    const petsMaped = [...pets].map((item) => ({
      ...item,
      dono: {
        id: item.clienteId,
        nome: item.clienteNome,
        cpf: item.clienteCpf,
      },
    }));

    return petsMaped;
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
