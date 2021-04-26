const fs = require('fs/promises')
const argv = process.argv

;(async () => {
  const data = await fs.readFile('data.json')
  const content = JSON.parse(data)
  if (argv[2] === '-l' || argv[2] === '--list') {
    console.table(content)
  } else {
    const [_, __, name, age] = argv
    content.push({ name, age })
    await fs.writeFile('data.json', JSON.stringify(content, null, 2))
  }
})()
