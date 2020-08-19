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

  async buscaPorId(id) {
    const sql = `SELECT Pets.id, Pets.nome, Pets.tipo, Pets.observacoes, Clientes.id AS clienteId, 
    Clientes.nome AS clienteNome, Clientes.cpf AS clienteCpf 
    FROM Pets INNER JOIN Clientes ON Pets.donoId = Clientes.id 
    WHERE Pets.id=${parseInt(id)}`;

    const result = await executaQuery(sql);

    const pet = result[0];

    const petMaped = {
      ...pet,
      dono: {
        id: pet.clienteId,
        nome: pet.clienteNome,
        cpf: pet.clienteCpf,
      },
    };

    return petMaped;
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

  async atualiza(novoItem) {
    const { id, nome, donoId, tipo, observacoes } = novoItem;

    const sqlUpdate = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`;
    await executaQuery(sqlUpdate);

    const sqlClient = `SELECT * FROM Clientes WHERE id = ${donoId}`;
    const clientResponse = await executaQuery(sqlClient);

    const response = {
      ...novoItem,
      dono: clientResponse[0],
    };

    return response;
  }

  async deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`;
    await executaQuery(sql);

    return id;
  }
}

module.exports = new Pet();
