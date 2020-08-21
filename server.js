const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const resolvers = require("./graphql/resolvers/index");
const typeDefs = require("./graphql/schemas/index");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  }

  console.log("conectou no banco");

  Tabelas.init(conexao);
});

const servidor = new GraphQLServer({
  typeDefs,
  resolvers,
});

servidor.start(() => console.log("Servidor ativo!"));
