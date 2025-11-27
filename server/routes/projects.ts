import { forgeController } from '@functions/routes'
import z from 'zod'

import { API_ENDPOINT_V2 } from '../constants/constants'
import callModrinthAPI from '../functions/modrinthAPI'
import {
  Hit,
  Organization,
  ProjectDetails,
  ProjectMember,
  ProjectVersion
} from '../typescript/types'

export const list = forgeController
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
      categories: z.string().optional(),
      environment: z.string().optional(),
      projectType: z
        .enum([
          'mod',
          'modpack',
          'resourcepack',
          'shader',
          'datapack',
          'plugin'
        ])
        .optional()
        .default('mod'),
      facets: z.string().optional() // Additional facets as JSON string
    })
  })
  .callback(
    async ({
      query: {
        page,
        query,
        version: versions,
        loaders,
        categories,
        environment,
        projectType,
        facets: additionalFacets
      }
    }) => {
      const facets: string[][] = [[`project_type:${projectType}`]]

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

      if (environment) {
        const envArray = environment.split(',').filter(Boolean)

        const hasClient = envArray.includes('client')

        const hasServer = envArray.includes('server')

        if (hasClient && !hasServer) {
          facets.push(['client_side:optional', 'client_side:required'])
          facets.push(['server_side:optional', 'server_side:unsupported'])
        } else if (!hasClient && hasServer) {
          facets.push(['client_side:optional', 'client_side:unsupported'])
          facets.push(['server_side:optional', 'server_side:required'])
        } else if (hasClient && hasServer) {
          facets.push(['client_side:required'])
          facets.push(['server_side:required'])
        }
      }

      // Parse and merge additional facets if provided
      if (additionalFacets) {
        try {
          const parsedFacets = JSON.parse(additionalFacets) as string[][]

          facets.push(...parsedFacets)
        } catch {
          // Ignore invalid JSON facets
        }
      }

      const queryParams = new URLSearchParams({
        limit: '20',
        offset: `${(page - 1) * 20}`,
        index: 'relevance',
        query: query ?? '',
        facets: JSON.stringify(facets)
      })

      const response = await fetch(
        `${API_ENDPOINT_V2}/search?${queryParams.toString()}`
      )

      const data = await response.json()

      return {
        items: data.hits as Hit[],
        total: data.total_hits
      }
    }
  )

export const getDetails = forgeController
  .query()
  .description('Get Modrinth project details')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(({ query: { projectId } }) =>
    callModrinthAPI<ProjectDetails>(`project/${projectId}`)
  )

export const listMembers = forgeController
  .query()
  .description('List all members of a Modrinth project team')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(({ query: { projectId } }) =>
    callModrinthAPI<ProjectMember[]>(`project/${projectId}/members`)
  )

export const getOrganization = forgeController
  .query()
  .description('Get the organization of a Modrinth project')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const data = await callModrinthAPI<Organization>(
      `project/${projectId}/organization`,
      'v3'
    )

    return {
      slug: data.slug,
      name: data.name,
      icon: data.icon_url,
      color: data.color
    }
  })

export const getVersions = forgeController
  .query()
  .description('List all versions for a Modrinth project')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(({ query: { projectId } }) =>
    callModrinthAPI<ProjectVersion[]>(`project/${projectId}/version`)
  )
