const fs = require('fs/promises')

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud
  }

  async saveAvatarToCloud(pathFile, userIdImg) {
    const { public_id: publicId, secure_url: avatar } = await this.uploadCloud(
      pathFile,
      {
        public_id: userIdImg?.replace('Photo/', ''),
        folder: 'Photo',
        transformation: { width: 250, crop: 'pad' },
      },
    )
    await this.deleteTemporyFile(pathFile)
    return { userIdImg: publicId, avatarUrl: avatar }
  }

  async deleteTemporyFile(pathFile) {
    try {
      await fs.unlink(pathFile)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = Upload
