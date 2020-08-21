const Operacoes = require("../../infraestrutura/operations");

const cliente = new Operacoes("cliente");

const resolvers = {
  Query: {
    clientes: () => cliente.lista(),
    cliente: (root, params) => cliente.buscaPorId(params.id),
  },
  Mutation: {
    adicionaCliente: (root, params) => {
      return cliente.adiciona(params);
    },
    atualizaCliente: (root, params) => {
      return cliente.atualiza(params);
    },
    deletaCliente: (root, params) => {
      return cliente.deleta(params.id);
    },
  },
};

module.exports = resolvers;
