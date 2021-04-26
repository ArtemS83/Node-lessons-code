const fs = require('fs')

fs.unlink('temp/temp.txt', (err) => {
  if (err) {
    console.log(err.message)
    return
  }
  fs.rmdir('temp', (err) => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log('Done del temp folder')
  })
  console.log('Done del temp.txt')
})
