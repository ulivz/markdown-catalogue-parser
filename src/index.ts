/**
 * Get indent
 *
 * @param {number} len
 * @returns {string} indent
 * @private
 */

function getIndent(len: number): string {
  let indent: string = ''
  while (len > 0) {
    indent += '  '
    len--
  }
  return indent
}

/**
 * Get prefix for each item
 *
 * @param {string} len
 * @returns {string} prefix
 * @private
 */

function getPrefix(len: string): string {
  const prefixs: string[] = ['-', '*', '+']
  return prefixs[(len - 1) % 3]
}

/**
 * Remove section number
 *
 * @param str
 * @returns {string}
 * @private
 */

function removeSectionNumber(str: string): string {
  const sectionNumberReg: RegExp = /^(\d{1,2}\.?){1,3}/
  return str.replace(sectionNumberReg, '').trim()
}

/**
 * Get hash link
 *
 * @param title
 * @param {boolean} removeSectionNumber
 * @returns {string}
 * @private
 */
function getHashLink(title: string, removeSectionLabel: boolean = false): string {
  const label: string = removeSectionLabel ? title : removeSectionNumber(title)
  const hashLink: string = title.replace(/\./g, '').toLowerCase().split(' ').join('-')
  return `[${label}](#${hashLink})`
}

/**
 * Main
 *
 * @param {string} raw
 * @param  {boolean} removeSectionNumber
 * @returns {string}
 */
function parse(raw: string, { removeSectionLabel = false } = {}): string {
  const lines: string[] = raw.split('\n').filter(line => line.startsWith('#'))
  return lines.map(line => {
    let [, hash, title] = line.match(/^\s*(#*)\s(.*)/)
    const hashLen = hash.length
    title = title.trim()
    return getIndent(hashLen) + getPrefix(hashLen) + ' ' +
      getHashLink(title, removeSectionLabel)
  }).join('\n')
}


export default parse
