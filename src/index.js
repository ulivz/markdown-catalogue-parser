/**
 * Get indent
 *
 * @param len
 * @returns {string}
 * @private
 */

function _getIndent(len) {
  let indent = ''
  while (len > 0) {
    indent += '  '
    len--
  }
  return indent
}

/**
 * Get prefix for each item
 *
 * @param len
 * @returns {string}
 * @private
 */

function _getPrefix(len) {
  const prefixs = ['-', '*', '+']
  return prefixs[(len - 1) % 3]
}

/**
 * Remove section number
 *
 * @param str
 * @returns {string}
 * @private
 */

function _removeSectionNumber(str) {
  const sectionNumberReg = /^(\d{1,2}\.?){1,3}/
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
function _getHashLink(title, removeSectionNumber = false) {
  const label = removeSectionNumber ? title : _removeSectionNumber(title)
  const hashLink = title.replace(/\./g, '').toLowerCase().split(' ').join('-')
  return `[${label}](#${hashLink})`
}

/**
 *
 * @param {string} raw
 * @param  {boolean} removeSectionNumber
 * @returns {string}
 */
function parse(raw, { removeSectionNumber = false } = {}) {
  const lines = raw.split('\n').filter(line => line.startsWith('#'))
  return lines.map(line => {
    let [, hash, title] = line.match(/^\s*(#*)\s(.*)/)
    const hashLen = hash.length
    title = title.trim()
    return _getIndent(hashLen) + _getPrefix(hashLen) + ' ' +
      _getHashLink(title, removeSectionNumber)
  }).join('\n')
}

module.exports = parse
