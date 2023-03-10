import { opine, json, urlencoded } from 'opine/mod.ts'
import { fg } from 'colors/mod.ts'
import { opineCors } from 'cors/mod.ts'
import config from './config.ts'
import { htmlToJSON, jsonToHTML, type JsonDBO } from 'markuptojson/'

const app = opine()

app.use(json({ limit: '100mb' }))
app.use(urlencoded({ extends: false, limit: '100mb' }))
app.use(opineCors({
  allowedHeaders: '*',
  origin: '*',
  methods: 'PUT, POST, GET, DELETE, OPTIONS, PATCH',
  credentials: true
}))

// routes

app.get('/', (_req, res) => {
  res.setStatus(200).json([
    {
      route: '/api/json',
      description: 'Create valid Json DBO for interactivity with the [markupjson(NodeJS, Deno, CDNs, Browser)] package and this API',
      format: 'HTML',
      type: 'string',
      method: 'POST',
      exampleInput: "<h1 class='main-title' id='title'>Hello World <span>By markuptojson</span></h1>",
      output: [
        {
          tagName: 'h1',
          tagAttrs: {
            class: 'main-title',
            id: 'title'
          },
          children: [
            {
              tagName: 'span',
              tagAttrs: {},
              children: [],
              content: 'By markuptojson'
            }
          ],
          content: 'Hello World'
        }
      ],
      limit: '100mb',
      bodyRequestNameParam: 'htmlContent',
      responseParamName: 'data',
      statusCodes: [
        {
          500: 'Internal error server',
          400: 'Bad request, not valid html content',
          200: 'Success'
        }
      ]
    },
    {
      route: '/api/html',
      description: 'Convert JsonDBO create by API or markuptojson module to html',
      format: 'ARRAY',
      type: {
        tagAttrs: 'string',
        content: 'string',
        children: 'array of this type',
        tagName: 'string'
      },
      method: 'POST',
      exampleInput: [
        {
          tagName: 'h1',
          tagAttrs: {
            class: 'main-title',
            id: 'title'
          },
          children: [
            {
              tagName: 'span',
              tagAttrs: {},
              children: [],
              content: 'By markuptojson'
            }
          ],
          content: 'Hello World'
        }
      ],
      output: "<h1 class='main-title' id='title'>Hello World <span>By markuptojson</span></h1>",
      limit: '100mb',
      bodyRequestNameParam: 'jsonContent',
      responseParamName: 'data',
      statusCodes: [
        {
          500: 'Internal error server',
          400: 'Bad request, not valid JsonDBO array content',
          200: 'Success'
        }
      ]
    }
  ])
})

app.post('/api/json', (req, res) => {
  const html: string = String(req.body.htmlContent)
  const regex = /<[a-z][\s\S]*>/i
  try {
    if (!regex.test(html)) {
      return res.setStatus(400).json({
        message: 'Require a valid body param [htmlContent] => html content'
      })
    }

    const jsonResult = htmlToJSON(html)

    res.setStatus(200).json({
      data: jsonResult
    })
  } catch (_error) {
    res.setStatus(500).json({
      message: 'Internal error server...'
    })
  }
})

app.post('/api/html', (req, res) => {
  const json = req.body.jsonContent as JsonDBO[]

  try {
    if (!Array.isArray(json)) {
      return res.setStatus(400).json({
        message: 'Require Array of param [jsonContent]'
      })
    }

    const validData: JsonDBO[] = json.filter((item: any) => {
      return (
        typeof item === 'object' &&
        (Boolean(item.tagAttrs)) &&
        typeof item.tagAttrs === 'object' &&
        (Boolean(item.content)) &&
        typeof item.content === 'string' &&
        Array.isArray(item.children) &&
        (Boolean(item.tagName)) &&
        typeof item.tagName === 'string'
      )
    })

    if (validData.length !== json.length) {
      return res.setStatus(400).json({
        message: 'Incorrect format, generate valid [jsonContent] in [POST] /api/json'
      })
    }

    const html = jsonToHTML(json)

    res.setStatus(200).json({
      data: html
    })
  } catch (_error) {
    res.setStatus(500).json({
      message: 'Internal error server...'
    })
  }
})

app.listen(config.PORT, () => {
  fg.green(`[APP]: listening in http://localhost:${String(config.PORT)}`)
})
