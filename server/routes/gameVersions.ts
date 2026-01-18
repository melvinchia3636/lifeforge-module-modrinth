import { JSDOM, VirtualConsole } from 'jsdom'

import forge from '../forge'

export const list = forge
  .query()
  .description('List all versions for Minecraft')
  .input({})
  .callback(async () => {
    const raw = await fetch('https://modrinth.com/mods').then(res => res.text())

    const virtualConsole = new VirtualConsole()

    const dom = new JSDOM(raw, {
      virtualConsole,
      contentType: 'text/html;charset=UTF-8',
      // @ts-expect-error -- lazy to fix for now
      verbose: false
    })

    virtualConsole.on('error', (e: any) => {
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
