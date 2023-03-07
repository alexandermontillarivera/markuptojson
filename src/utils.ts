import { type JsonDBO } from '../types/index'

export const jsonToHTML = (json: JsonDBO[]): string => {
  return json.map((el: JsonDBO) => {
    const attrs = Object.entries(el.tagAttrs).reverse().map(([key, value]) => `${key}='${value}'`).join(' ')
    const attrsStr = (attrs.length !== 0) ? ` ${attrs}` : ''
    if (Array.isArray(el.children)) {
      return `<${el.tagName}${attrsStr}>${el.content}${jsonToHTML(el.children)}</${el.tagName}>`
    } else {
      return `<${el.tagName}${attrsStr}>${el.content}${el.children as string}</${el.tagName}>`
    }
  }).join('')
}

export const htmlToJSON = (html: string): JsonDBO[] => {
  const regex = /<([^\s]+)([^>]*)>(.*?)<\/\1>/g
  const matches: any[] = []
  let match
  while ((match = regex.exec(html)) != null) {
    const tagName = match[1]
    const tagAttrs = match[2].trim()
    const tagContent = match[3].trim()
    const tagAttrsObj: any = {}
    let content = ''
    const tagAttrsRegex = /(\w+)=["']([^"']+)["']/g
    let attrMatch
    while ((attrMatch = tagAttrsRegex.exec(tagAttrs)) != null) {
      tagAttrsObj[attrMatch[1]] = attrMatch[2]
    }
    let children

    if (tagContent.length === 0) {
      children = []
    } else if (tagContent.length > 0) {
      children = htmlToJSON(tagContent)
    } else {
      children = tagContent
    }

    content = tagContent.split('<')[0]
    matches.push({ tagName, tagAttrs: tagAttrsObj, children, content })
  }
  return matches
}
