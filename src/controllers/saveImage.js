const Image = require("../entities/Image")
const database = require("../entities/Database")

module.exports = async (req, res, next) => {
  try {
    const { buffer, size } = req.file

    const image = new Image(size)
    await database.insert(image, buffer)

    return res.json(image.toJSON())
  } catch (e) {
    return next(e)
  }
}
