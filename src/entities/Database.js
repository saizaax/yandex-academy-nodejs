const { EventEmitter } = require("events")
const { databaseDump } = require("../config/config")
const { existsSync } = require("fs")
const { writeFile } = require("fs").promises
const { prettifyJson } = require("../utils/prettifyJson")
const Image = require("./Image")

class Database extends EventEmitter {
  constructor() {
    super()
    this.images = {}
  }

  async initFromDump() {
    if (existsSync(databaseDump) === false) {
      return
    }

    const dump = require(databaseDump)

    if (typeof dump.images === "object") {
      this.images = {}

      for (let id in dump.images) {
        const image = dump.images[id]
        this.images[id] = new Image(image.id, image.createdAt)
      }
    }
  }

  async insert(image, content) {
    await image.save(content)
    this.images[image.id] = image
    this.emit("changed")
  }

  async remove(id) {
    const imageObject = this.images[id]
    const image = new Image(imageObject.id, imageObject.createdAt)

    await image.remove()
    delete this.images[id]

    this.emit("changed")
    return id
  }

  findById(id) {
    const imageObject = this.images[id]

    if (!imageObject) return null

    const image = new Image(imageObject.id, imageObject.createdAt)
    return image
  }

  find() {
    let allImages = Object.values(this.images)
    allImages.sort((a, b) => a.createdAt - b.createdAt)

    return allImages
  }

  toJSON() {
    return {
      images: this.images,
    }
  }
}

const database = new Database()

database.initFromDump()

database.on("changed", () => {
  writeFile(databaseDump, prettifyJson(database.toJSON()))
})

module.exports = database
