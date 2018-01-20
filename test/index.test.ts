import fs from 'fs'
import path from 'path'
import markdownCatalogueParser from '../src/index'

test('main', () => {
  const rawMarkdown: string = <string>fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8')
  const catelogue: string = markdownCatalogueParser(rawMarkdown)
  expect(catelogue).toMatchSnapshot()
})
