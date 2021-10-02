const database = require("../entities/Database")
const {
  NotFoundApiError,
  BadRequestApiError,
} = require("../validators/ApiError")
const { replaceBackground } = require("backrem")
const { createReadStream } = require("fs")
const parseColor = require("../utils/parseColor")

module.exports = async (req, res, next) => {
  try {
    const { front, back, color, threshold } = req.query

    if (!front || !back) {
      throw new BadRequestApiError(
        "Front-image-id and back-image-id query params are required"
      )
    }

    const frontImage = database.findById(front)
    const backImage = database.findById(back)

    if (!frontImage || !backImage) {
      throw new NotFoundApiError(
        "Images associated with this IDs ware not found"
      )
    }

    const frontImageStream = createReadStream(frontImage.getPath())
    const backImageStream = createReadStream(backImage.getPath())

    const bgrColor = parseColor(color)
    const thresholdValue = threshold ? Number(threshold) : 0

    replaceBackground(
      frontImageStream,
      backImageStream,
      bgrColor,
      thresholdValue
    )
      .then((readableStream) => {
        res.set("Content-Type", "image/jpeg")
        readableStream.pipe(res)
      })
      .catch((err) => {
        next(new BadRequestApiError(err.message))
      })
  } catch (err) {
    return next(err)
  }
}
