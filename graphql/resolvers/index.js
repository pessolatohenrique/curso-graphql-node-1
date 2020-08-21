const path = require("path");
const mergeGraphQLSchemas = require("merge-graphql-schemas");

const files = path.join(__dirname, "./");

const { fileLoader } = mergeGraphQLSchemas;

const loadedFiles = fileLoader(files);

module.exports = loadedFiles;
