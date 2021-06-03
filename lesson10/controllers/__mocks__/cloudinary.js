module.exports.v2 = {
  config: () => {},
  uploader: {
    upload: (pathFile, options, cb) => {
      cb(null, { public_id: 'publicId', secure_url: 'avatar' })
    },
  },
}
