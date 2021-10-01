const path = require("path")
const { writeFile, unlink } = require("fs").promises
const { createReadStream } = require("fs")
const { imageFolder } = require("../config/config")
const { generateId } = require("../utils/generateId")

module.exports = class Image {
  constructor(size, id, createdAt) {
    this.id = id || generateId()
    this.createdAt = createdAt || Date.now()
    this.size = size
    this.name = `${this.id}.jpeg`
  }

  async save(content) {
    await writeFile(path.resolve(imageFolder, this.name), content, {
      encoding: "utf-8",
    })
  }

  async remove() {
    try {
      const filePath = path.resolve(imageFolder, this.name)
      await unlink(filePath)
    } catch (err) {
      console.log(`removeFile error: file ${filePath} doesn't exist...`)
    }
  }

  async get() {
    try {
      const filePath = path.resolve(imageFolder, this.name)
      const stream = createReadStream(filePath)
      return stream
    } catch (err) {
      console.log(`removeFile error: file ${filePath} doesn't exist...`)
    }
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      size: this.size,
    }
  }
}
