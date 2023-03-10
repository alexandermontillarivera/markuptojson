// @ts-expect-error deno
import markuptojson, { htmlToJSON, jsonToHTML } from './src/index.ts'

export interface JsonDBO {
  tagAttrs: Record<string, string>
  content: string
  children: JsonDBO[] | never[]
  tagName: string
}

export {
  htmlToJSON,
  jsonToHTML
}

export interface MarkupToJSON {
  jsonToHTML: (arrayJson: JsonDBO[]) => string
  htmlToJSON: (htmlString: string) => JsonDBO[]
}

export default markuptojson
