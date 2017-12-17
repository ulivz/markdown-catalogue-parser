import fs from 'fs'
import path from 'path'
import markdownCatalogueParser from '../'

test('main', () => {
  const rawMarkdown = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8')
  const catelogue = markdownCatalogueParser(rawMarkdown)
  expect(catelogue).toMatchSnapshot()
})
