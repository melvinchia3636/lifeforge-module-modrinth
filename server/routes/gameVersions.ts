import { forgeController } from '@functions/routes'
import { JSDOM, VirtualConsole } from 'jsdom'

export const list = forgeController
  .query()
  .description('List all versions for Minecraft')
  .input({})
  .callback(async () => {
    const raw = await fetch('https://modrinth.com/mods').then(res => res.text())

    const virtualConsole = new VirtualConsole()

    // @ts-ignore
    const dom = new JSDOM(raw, { virtualConsole, contentType: "text/html;charset=UTF-8", verbose: false })

    virtualConsole.on("error", (e: any) => {
      console.error(e)
    })

    const document = dom.window.document

    return Array.from(
      document
        .querySelector('.normal-page__sidebar .card-shadow')
        ?.querySelectorAll('button') || []
    )
      .map(e => e.textContent)
      .slice(1, -1)
  })
