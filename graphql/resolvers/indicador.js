const Operations = require("../../infraestrutura/operations");
const indicador = new Operations("indicador");

const resolvers = {
  Query: {
    indicadores: () => indicador.lista(),
  },
};

module.exports = resolvers;
