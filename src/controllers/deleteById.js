const database = require("../entities/Database")
const { NotFoundApiError } = require("../validators/ApiError")

module.exports = async (req, res, next) => {
  try {
    const imageId = req.params.id

    const image = database.findById(imageId)

    if (!image) {
      throw new NotFoundApiError("Image associated with this ID was not found")
    }

    const id = await database.remove(imageId)
    return res.json({ id })
  } catch (err) {
    return next(err)
  }
}
