import type { MarkupToJSON } from '../types'
import { htmlToJSON, jsonToHTML } from './utils'
export { htmlToJSON, jsonToHTML } from './utils'

const markuptojson: MarkupToJSON = {
  htmlToJSON,
  jsonToHTML
}

export default markuptojson
