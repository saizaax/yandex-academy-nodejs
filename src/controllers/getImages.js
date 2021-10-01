const database = require("../entities/Database")

module.exports = (req, res) => {
  const images = database.find().map((image) => image.toJSON())
  return res.json({ images })
}
