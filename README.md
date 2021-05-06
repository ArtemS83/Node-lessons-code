# Node-lessons-code

# npm пакеты

```shell
# Nodemon - автоматически перегружает сервер после измнений в коде
https://www.npmjs.com/package/nodemon

npm install --save-dev nodemon
```

```shell
# Express - веб-фреймворк для приложений Node.js
https://expressjs.com/ru/
```

```shell
# Commander || yargs - парсит строки запросов
https://github.com/tj/commander.js
https://www.npmjs.com/package/yargs

npm install commander -E || npm i yargs
```

```shell
# Eslint - проверка синтаксиса
https://eslint.org/docs/user-guide/getting-started

npx eslint --init

выбираем:
- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- None of these
- No (TypeScript)
- Node (чтоб убрать галочку возле Browser нажимаем пробел, чтоб выбрать Node тоже нажимаем пробел)
- Use a popular style guide
- Standard: https://github.com/standard/standard
- JavaScript
- Yes
```

```shell
# Babel
npm i @babel/core @babel/eslint-parser @babel/plugin-proposal-class-properties @babel/plugin-proposal-private-methods @babel/plugin-syntax-top-level-await -D

- создаем файл babel.config.json
{
  "plugins": [
    "@babel/plugin-syntax-top-level-await",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods"
  ]
}
- в файл .eslintrc.js добавляем поле:
  parser: '@babel/eslint-parser',
```
