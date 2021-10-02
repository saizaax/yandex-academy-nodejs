const Image = require("../entities/Image")
const database = require("../entities/Database")
const { BadRequestApiError } = require("../validators/ApiError")

module.exports = async (req, res, next) => {
  try {
    const file = req.file

    if (!file) {
      throw new BadRequestApiError("No file attached")
    }

    if (file.mimetype !== "image/jpeg") {
      throw new BadRequestApiError(
        "Prohibited format, only .jpeg images are accepted"
      )
    }

    const { buffer, size, mimetype } = file

    const image = new Image(size, mimetype, buffer)
    await database.insert(image, buffer)

    return res.json(image.toJSON())
  } catch (err) {
    return next(err)
  }
}
