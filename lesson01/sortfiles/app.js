import { Command } from 'commander/esm.mjs'
import SortFiles from './module/sort.js'

const program = new Command()
program
  .requiredOption('-s, --source <type>', 'source folder')
  .option('-o, --output <type>', 'output folder', './dist')

program.parse(process.argv)
const { source, output } = program.opts()

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

try {
  const sorting = new SortFiles(output)
  await sorting.readFolder(resolve(__dirname, source))
} catch (e) {
  console.log(e)
  process.exit(1)
}

console.log('Done')
