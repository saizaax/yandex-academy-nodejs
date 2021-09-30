const express = require("express")

const rootRouter = express.Router()

/* GET */

rootRouter.get("/ping", (req, res) => { // TODO: Delete
  res.json({ ping: "pong" })
})

/** Получить список изображений в формате json (должен содержать их id, размер, дата загрузки) */
rootRouter.get("/list", (req, res) => {
  res.json({ ping: "pong" })
})

/** Скачать изображение с заданным id */
rootRouter.get("/image/:id", (req, res) => {
  res.json({ ping: "pong" })
})

/** Замена фона у изображения */
rootRouter.get("/merge?front=<id>&back=<id>&color=145,54,32&threshold=5", (req, res) => {
  res.json({ ping: "pong" })
})

/* POST */

/** Загрузка изображения (сохраняет его на диск и возвращает идентификатор сохраненного изображения) */
rootRouter.post("/upload", (req, res) => {
  res.json({ ping: "pong" })
})

/* DELETE */

/** Удалить изображение */
rootRouter.delete("/image/:id", (req, res) => {
  res.json({ ping: "pong" })
})

exports.rootRouter = rootRouter
