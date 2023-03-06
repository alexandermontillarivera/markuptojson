export interface JsonDBO {
  tagAttrs: Record<string, string>
  content: string
  children: JsonDBO[] | never[]
  tagName: string
}

export function jsonToHTML (arrayJson: JsonDBO[]): string

export function htmlToJSON (htmlString: string): JsonDBO[]

export interface MarkupToJSON {
  jsonToHTML: (arrayJson: JsonDBO[]) => string
  htmlToJSON: (htmlString: string) => JsonDBO[]
}

declare const lib: MarkupToJSON

export default lib
