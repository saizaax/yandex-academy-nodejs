const database = require("../entities/Database")

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    ;(await database.findById(id).get()).pipe(res)
  } catch (e) {
    return next(e)
  }
}
