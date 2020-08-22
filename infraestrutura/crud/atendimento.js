const executaQuery = require("../database/queries");

class Atendimento {
  relacionaDados(item) {
    const { id, data, status, observacoes } = item;

    return {
      id,
      data,
      status,
      observacoes,
      cliente: {
        id: item.clienteId,
        nome: item.clienteNome,
        cpf: item.clienteCpf,
      },
      pet: {
        id: item.petId,
        nome: item.petNome,
        tipo: item.petTipo,
        observacoes: item.petObservacoes,
      },
      servico: {
        id: item.servicoId,
        nome: item.servicoNome,
        preco: item.servicoPreco,
        descricao: item.servicoDescricao,
      },
    };
  }

  async lista() {
    const sql = `SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes,
      Clientes.id AS clienteId, Clientes.nome AS clienteNome, Clientes.cpf AS clienteCpf,
      Pets.id AS petId, Pets.nome AS petNome, Pets.tipo AS petTipo, Pets.observacoes AS petObservacoes,
      Servicos.id AS servicoId, Servicos.nome AS servicoNome, Servicos.preco AS servicoPreco, 
      Servicos.descricao AS servicoDescricao
      FROM Atendimentos
      INNER JOIN Clientes ON Atendimentos.clienteId = Clientes.id
      INNER JOIN Pets ON Atendimentos.petId = Pets.id
      INNER JOIN Servicos ON Atendimentos.servicoId = Servicos.id
    `;

    const response = await executaQuery(sql);

    const responseMaped = [...response].map((item) => {
      return this.relacionaDados(item);
    });

    return responseMaped;
  }

  async buscaPorId(id) {
    const sql = `SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes,
      Clientes.id AS clienteId, Clientes.nome AS clienteNome, Clientes.cpf AS clienteCpf,
      Pets.id AS petId, Pets.nome AS petNome, Pets.tipo AS petTipo, Pets.observacoes AS petObservacoes,
      Servicos.id AS servicoId, Servicos.nome AS servicoNome, Servicos.preco AS servicoPreco, 
      Servicos.descricao AS servicoDescricao
      FROM Atendimentos
      INNER JOIN Clientes ON Atendimentos.clienteId = Clientes.id
      INNER JOIN Pets ON Atendimentos.petId = Pets.id
      INNER JOIN Servicos ON Atendimentos.servicoId = Servicos.id
      WHERE Atendimentos.id = ${id}
    `;

    const response = await executaQuery(sql);
    const atendimento = this.relacionaDados(response[0]);

    return atendimento;
  }

  async adiciona(item) {
    const { clienteId, petId, servicoId, status, observacoes } = item;
    const data = new Date().toLocaleDateString();

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${clienteId}, ${petId}, ${servicoId}, '${data}', '${status}', '${observacoes}')`;
    const response = await executaQuery(sql);

    const sqlCliente = `SELECT * FROM Clientes WHERE id = ${clienteId}`;
    const responseCliente = await executaQuery(sqlCliente);

    const sqlPet = `SELECT * FROM Pets WHERE id = ${petId}`;
    const responsePet = await executaQuery(sqlPet);

    const sqlServico = `SELECT * FROM Servicos WHERE id = ${servicoId}`;
    const responseServico = await executaQuery(sqlServico);

    const finalResponse = {
      id: response.insertId,
      data,
      ...item,
      cliente: responseCliente[0],
      pet: responsePet[0],
      servico: responseServico[0],
    };

    return finalResponse;
  }

  async atualiza(item) {
    const { id, clienteId, petId, servicoId, status, observacoes } = item;
    const data = new Date().toLocaleDateString();

    const sql = `UPDATE Atendimentos SET clienteId=${clienteId}, petId=${petId}, servicoId=${servicoId}, 
      data='${data}', status='${status}', observacoes='${observacoes}' WHERE id=${id}`;
    const response = await executaQuery(sql);

    const sqlCliente = `SELECT * FROM Clientes WHERE id = ${clienteId}`;
    const responseCliente = await executaQuery(sqlCliente);

    const sqlPet = `SELECT * FROM Pets WHERE id = ${petId}`;
    const responsePet = await executaQuery(sqlPet);

    const sqlServico = `SELECT * FROM Servicos WHERE id = ${servicoId}`;
    const responseServico = await executaQuery(sqlServico);

    const finalResponse = {
      id: response.insertId,
      data,
      ...item,
      cliente: responseCliente[0],
      pet: responsePet[0],
      servico: responseServico[0],
    };

    return finalResponse;
  }

  async deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`;
    await executaQuery(sql);

    return id;
  }
}

module.exports = new Atendimento();
