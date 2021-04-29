const http = require('http')
const fs = require('fs/promises')
const path = require('path')

const TypeMime = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

http
  .createServer(async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    let filename = pathname
    console.log(pathname)
    switch (pathname) {
      case '/':
        filename = 'index.html'
        break
      case '/contact':
        filename = 'contact.html'
        break
      case '/blog':
        filename = 'blog.html'
        break
      default:
        break
    }
    const content = await fs.readFile(path.join(__dirname, filename))
    res.writeHead(200, { 'Content-Type': TypeMime[path.extname(filename)] })
    res.write(content)
    res.end()
  })
  .listen(3000, () => {
    console.log('Server start')
  })
