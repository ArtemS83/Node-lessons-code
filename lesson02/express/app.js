const express = require('express')
const app = express()
const port = 3000
const { articles } = require('./model/data.json')

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs') // hbs
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { title: 'GoIt' })
})

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'GoIt' })
})

app.post('/contact', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.get('/blog', (req, res) => {
  res.render('blog', { articles })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
