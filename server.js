const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const Operacoes = require("./infraestrutura/operations");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  }

  console.log("conectou no banco");

  Tabelas.init(conexao);
});

const cliente = new Operacoes("cliente");
const pet = new Operacoes("pet");

const resolvers = {
  Query: {
    name: () => "Henrique Pessolato",
    status: (_) => "Hello Graphql!",
    clientes: () => cliente.lista(),
    cliente: (root, params) => cliente.buscaPorId(params.id),
    pets: () => pet.lista(),
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
    adicionaPet: (root, params) => {
      return pet.adiciona(params);
    },
  },
};

const servidor = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
});

servidor.start(() => console.log("Servidor ativo!"));
