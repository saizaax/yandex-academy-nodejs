const { ApiError } = require("../validators/ApiError")

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return err.sendResponse(res)
  }

  return res.status(500).json({ message: err.message })
}
