const path = require("path")
const { writeFile, unlink } = require("fs").promises
const { createReadStream } = require("fs")
const { imageFolder } = require("../config/config")
const { generateId } = require("../utils/generateId")

module.exports = class Image {
  constructor(size, mimeType, body, id, uploadedAt) {
    this.id = id || generateId()
    this.uploadedAt = uploadedAt || Date.now()
    this.size = size
    this.body = body
    this.mimeType = mimeType
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
      console.log("Remove file error: file doesn't exist")
    }
  }

  get() {
    try {
      const filePath = path.resolve(imageFolder, this.name)
      return createReadStream(filePath)
    } catch (err) {
      console.log("Get file error: file doesn't exist")
    }
  }

  getPath() {
    try {
      return path.resolve(imageFolder, this.name)
    } catch (err) {
      console.log("Get file-path error: file doesn't exist")
    }
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.uploadedAt,
      size: this.size,
      body: this.body,
      mimeType: this.mimeType
    }
  }
}
