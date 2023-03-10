/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { config as access } from 'https://deno.land/std@0.173.0/dotenv/mod.ts'

const env = await access()

const config: {
  PORT: number
} = {
  PORT: Number(env.PORT || Deno.env.get('PORT') || 4000)
}

export default config
