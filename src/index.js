const express = require("express")
const useMiddlewares = require("./middlewares")
const { PORT } = require("./config/config")
const { rootRouter } = require("./routers")
const errorHandler = require("./middlewares/errorHandler")
const notFoundHandler = require("./middlewares/notFoundHandler")

const app = express()

useMiddlewares(app)

app.use("/", rootRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`)
})
