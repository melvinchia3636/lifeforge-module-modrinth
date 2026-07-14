import z from 'zod'

import forge from '../forge'
import { MinecraftVersionSchema } from '../typescript/schema'

export const list = forge
  .query({
    description: 'List all versions for Minecraft',
    output: {
      OK: z.array(MinecraftVersionSchema)
    }
  })
  .callback(async ({ response }) => {
    const res = await fetch('https://modrinth.com/api/tags/game-versions').then(
      res => res.json()
    )

    return response.ok(res)
  })
