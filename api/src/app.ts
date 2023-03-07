import { Application, Router } from 'https://deno.land/x/oak@v12.1.0/mod.ts'
import config from './config.ts'

const router = new Router()
const app = new Application()

router.post('/', (ctx) => {
  // const s = ctx.request.body()?.value('asdsad')
})

app.use(router.routes())
await app.listen({ port: config.PORT })
