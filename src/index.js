const express = require("express")
const useMiddlewares = require("./middlewares")
const { PORT } = require("./config/config")
const { rootRouter } = require("./routers")

const app = express()

useMiddlewares(app)

app.use("/", rootRouter)

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`)
})
