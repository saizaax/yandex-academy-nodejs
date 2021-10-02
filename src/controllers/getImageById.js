const database = require("../entities/Database")
const { NotFoundApiError } = require("../validators/ApiError")

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id

    const image = database.findById(id)

    if (!image) {
      throw new NotFoundApiError("Image associated with this ID was not found")
    }

    res.set("Content-Type", image.mimeType)
    image.get().pipe(res)
  } catch (err) {
    return next(err)
  }
}
