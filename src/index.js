const express = require("express")
const { PORT } = require("./config.json")
const { rootRouter } = require("./routers")

const app = express()

app.use("/", rootRouter)

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`)
})