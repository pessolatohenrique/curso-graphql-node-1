const Operacoes = require("../../infraestrutura/operations");
const pet = new Operacoes("pet");

const resolvers = {
  Query: {
    pets: () => pet.lista(),
    pet: (root, params) => pet.buscaPorId(params.id),
  },
  Mutation: {
    adicionaPet: (root, params) => {
      return pet.adiciona(params);
    },
    atualizaPet: (root, params) => {
      return pet.atualiza(params);
    },
    deletaPet: (root, params) => {
      return pet.deleta(params.id);
    },
  },
};

module.exports = resolvers;
