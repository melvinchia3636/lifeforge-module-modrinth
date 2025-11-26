import { forgeController } from '@functions/routes'
import { JSDOM } from 'jsdom'

export const list = forgeController
  .query()
  .description('List all versions for Minecraft')
  .input({})
  .callback(async () => {
    const raw = await fetch('https://modrinth.com/mods').then(res => res.text())

    const dom = new JSDOM(raw)

    const document = dom.window.document

    return Array.from(
      document
        .querySelector('.normal-page__sidebar .card-shadow')
        ?.querySelectorAll('button') || []
    )
      .map(e => e.textContent)
      .slice(1, -1)
  })
