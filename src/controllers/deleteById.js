const database = require("../entities/Database")

module.exports = async (req, res) => {
  const imageId = req.params.id
  const id = await database.remove(imageId)
  return res.json({ id })
}
