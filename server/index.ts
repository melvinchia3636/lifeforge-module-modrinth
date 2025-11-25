import { forgeController, forgeRouter } from '@functions/routes'
import { JSDOM } from 'jsdom'
import { z } from 'zod'

export interface Hit {
  project_id: string
  project_type: string
  slug: string
  author: string
  title: string
  description: string
  categories: string[]
  display_categories: string[]
  versions: string[]
  downloads: number
  follows: number
  icon_url: string
  date_created: Date
  date_modified: Date
  latest_version: string
  license: string
  client_side: 'optional' | 'required' | 'unsupported' | 'unknown'
  server_side: 'optional' | 'required' | 'unsupported' | 'unknown'
  gallery: string[]
  featured_gallery: null | string
  color: number | null
}

const API_ENDPOINT = 'https://api.modrinth.com/v2/search'

const listProjects = forgeController
  .query()
  .description('List all Modrinth entries')
  .input({
    query: z.object({
      page: z
        .string()
        .transform(val => parseInt(val, 10))
        .default(1),
      query: z.string().optional(),
      version: z.string().optional(),
      loaders: z.string().optional(),
      categories: z.string().optional()
    })
  })
  .callback(
    async ({
      query: { page, query, version: versions, loaders, categories }
    }) => {
      const facets: string[][] = [['project_type:mod']]

      if (versions) {
        const versionArray = versions.split(',').filter(Boolean)

        facets.push(versionArray.map(v => `versions:${v}`))
      }

      if (loaders) {
        const loaderArray = loaders.split(',').filter(Boolean)

        const positiveFilter = loaderArray
          .filter(l => !l.startsWith('!'))
          .map(l => `categories:${l}`)

        if (positiveFilter.length > 0) {
          facets.push(positiveFilter)
        }

        for (const l of loaderArray.filter(l => l.startsWith('!'))) {
          facets.push([`categories!=${l.replace('!', '')}`])
        }
      }

      if (categories) {
        const categoryArray = categories.split(',').filter(Boolean)

        const positiveFilter = categoryArray
          .filter(c => !c.startsWith('!'))
          .map(c => `categories:${c}`)

        if (positiveFilter.length > 0) {
          facets.push(positiveFilter)
        }

        for (const c of categoryArray.filter(c => c.startsWith('!'))) {
          facets.push([`categories!=${c.replace('!', '')}`])
        }
      }

      const queryParams = new URLSearchParams({
        limit: '20',
        offset: `${(page - 1) * 20}`,
        index: 'relevance',
        query: query ?? '',
        facets: JSON.stringify(facets)
      })

      const response = await fetch(`${API_ENDPOINT}?${queryParams.toString()}`)

      const data = await response.json()

      return {
        items: data.hits as Hit[],
        total: data.total_hits
      }
    }
  )

const listVersions = forgeController
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

export default forgeRouter({ listProjects, listVersions })
