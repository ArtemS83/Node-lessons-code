const os = require('os')
const path = require('path')

// console.log(os.cpus().length)
// console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))

// console.log(path.resolve('/foo/bar', './baz'))
// console.log(path.resolve('foo', 'tmp/file/', '../gif/image.gif'))
// console.log(path.resolve('wwwroot', '/static_files/png/', '../gif/image.gif'))
// const url1 = '/foo/bar'
// const url2 = 'baz'
// console.log(path.normalize(`${url1}${path.sep}${url2}`))

// console.log(process.cwd())
// console.log(__dirname)
// console.log(__filename)

console.log(process.argv)

process.on('exit', (code) => {
  console.log(`Exit with code ${code}`)
})

process.exit(1)

console.log('!!!!')
