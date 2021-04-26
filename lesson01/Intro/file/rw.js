const fs = require('fs')

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err.message)
    return
  }

  fs.writeFile('data.json', `${data}Hi`, (err) => {
    if (err) {
      console.log(err.message)
      return
    }
  })
})
