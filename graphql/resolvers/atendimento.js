const Operations = require("../../infraestrutura/operations");
const atendimento = new Operations("atendimento");

const resolvers = {
  Query: {
    atendimentos: () => atendimento.lista(),
    atendimento: (root, params) => atendimento.buscaPorId(params.id),
  },
  Mutation: {
    adicionaAtendimento: (root, params) => atendimento.adiciona(params),
    atualizaAtendimento: (root, params) => atendimento.atualiza(params),
    deletaAtendimento: (root, params) => atendimento.deleta(params.id),
  },
};

module.exports = resolvers;
