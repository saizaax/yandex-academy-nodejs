const express = require("express")
const multer = require("multer")
const api = require("./controllers/index")

const rootRouter = express.Router()

/* GET */

/** Получить список изображений в формате json (должен содержать их id, размер, дата загрузки) */
rootRouter.get("/list", api.getImages)

/** Скачать изображение с заданным id */
rootRouter.get("/image/:id", api.getImageById)

/** Замена фона у изображения */
rootRouter.get("/merge", api.mergeImages)

/* POST */

/** Загрузка изображения (сохраняет его на диск и возвращает идентификатор сохраненного изображения) */
rootRouter.post("/upload", multer().single("image"), api.saveImage)

/* DELETE */

/** Удалить изображение */
rootRouter.delete("/image/:id", api.deleteById)

exports.rootRouter = rootRouter
