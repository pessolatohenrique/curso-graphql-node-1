const Operations = require("../../infraestrutura/operations");

const servicos = new Operations("servico");

const resolvers = {
  Mutation: {
    adicionaServico: (root, params) => servicos.adiciona(params),
    atualizaServico: (root, params) => servicos.atualiza(params),
    deletaServico: (root, params) => servicos.deleta(params.id),
  },
  Query: {
    servicos: (root, params) => servicos.lista(),
    servico: (root, params) => servicos.buscaPorId(params.id),
  },
};

module.exports = resolvers;
