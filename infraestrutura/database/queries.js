const conexao = require("../conexao");

const executaQuery = (query) => {
  const promise = new Promise((resolve, reject) => {
    conexao.query(query, async (erro, resultados, campos) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(resultados);
      }
    });
  });

  return promise;
};

module.exports = executaQuery;
