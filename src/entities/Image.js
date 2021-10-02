const path = require("path")
const { readFile, writeFile, unlink } = require("fs").promises
const { createReadStream } = require("fs")
const { imageFolder } = require("../config/config")
const { generateId } = require("../utils/generateId")

module.exports = class Image {
  constructor(size, mimeType, id, uploadedAt) {
    this.id = id || generateId()
    this.uploadedAt = uploadedAt || Date.now()
    this.size = size
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

  async toPublicJSON() {
    try {
      const imageBuffer = await readFile(this.getPath())

      return {
        id: this.id,
        uploadedAt: this.uploadedAt,
        size: this.size,
        body: imageBuffer,
        mimeType: this.mimeType,
      }
    } catch (err) {
      console.log("Get file-buffer error: file doesn't exist")
    }
  }

  toJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
      mimeType: this.mimeType,
    }
  }
}
