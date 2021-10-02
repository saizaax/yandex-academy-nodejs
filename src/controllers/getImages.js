const database = require("../entities/Database")

module.exports = async (req, res) => {
  const images = await Promise.all(
    database.find().map(async (image) => await image.toPublicJSON())
  )
  return res.json(images)
}
