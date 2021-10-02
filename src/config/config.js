const path = require("path")

const databaseFolder = path.resolve(__dirname, "../../db/")
const databaseDump = path.resolve(databaseFolder, "database.json")
const imageFolder = path.resolve(databaseFolder, "images")

module.exports = {
  databaseFolder: databaseFolder,
  databaseDump: databaseDump,
  imageFolder: imageFolder,
  PORT: process.env.PORT || 8080,
}
