import fs from 'fs/promises'
import path from 'path'
import { isAccessible } from '../helper/accessible.js'

class SortFiles {
  constructor(dist) {
    this.dist = dist
    process.nextTick(async () => {
      if (!(await isAccessible(dist))) {
        await fs.mkdir(dist)
      }
    })
  }
  async #copyFile(file) {
    const folder = path.extname(file.name)
    const targetFolder = path.join(this.dist, folder)
    try {
      if (!(await isAccessible(targetFolder))) {
        await fs.mkdir(targetFolder)
      }
      await fs.copyFile(file.path, path.join(targetFolder, file.name))
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  async readFolder(base) {
    const files = await fs.readdir(base)
    for (const item of files) {
      const localBase = path.join(base, item)
      const state = await fs.stat(localBase)
      if (state.isDirectory()) {
        await this.readFolder(localBase)
      } else {
        await this.#copyFile({ name: item, path: localBase })
      }
    }
  }
}

export default SortFiles
