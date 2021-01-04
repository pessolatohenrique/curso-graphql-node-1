const executaQuery = require("../database/queries");

class Indicador {
  async lista() {
    const sqlAtendimentos = `SELECT COUNT(Atendimentos.id) AS total_atendimentos FROM Atendimentos`;
    const responseAtendimentos = await executaQuery(sqlAtendimentos);

    const sqlClientes = `SELECT COUNT(Clientes.id) AS total_clientes FROM Clientes`;
    const responseClientes = await executaQuery(sqlClientes);

    const sqlPets = `SELECT COUNT(Pets.id) AS total_pets FROM Pets`;
    const responsePets = await executaQuery(sqlPets);

    const sqlServicos = `SELECT COUNT(Servicos.id) AS total_servicos FROM Servicos`;
    const responseServicos = await executaQuery(sqlServicos);

    const sqlServicosGrafico = `
        SELECT servicoId, Servicos.nome AS label,COUNT(servicoId) AS data
        FROM Atendimentos
        LEFT JOIN Servicos ON Atendimentos.servicoId = Servicos.id
        GROUP BY servicoId;
    `;
    const responseServicosGrafico = await executaQuery(sqlServicosGrafico);

    const sqlClientesGrafico = `
        SELECT clienteId, Clientes.nome AS label,COUNT(clienteId) AS data
        FROM Atendimentos
        LEFT JOIN Clientes ON Atendimentos.clienteId = Clientes.id
        GROUP BY clienteId;
    `;
    const responseClientesGrafico = await executaQuery(sqlClientesGrafico);

    return {
      totalAtendimentos: responseAtendimentos[0].total_atendimentos,
      totalClientes: responseClientes[0].total_clientes,
      totalPets: responsePets[0].total_pets,
      totalServicos: responseServicos[0].total_servicos,
      servicos: responseServicosGrafico,
      clientes: responseClientesGrafico,
    };
  }
}

module.exports = new Indicador();
