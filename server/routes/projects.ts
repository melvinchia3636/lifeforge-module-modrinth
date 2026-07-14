import z from 'zod'

import { API_ENDPOINT_V2 } from '../constants/constants'
import forge from '../forge'
import callModrinthAPI from '../functions/modrinthAPI'
import {
  HitSchema,
  ProjectDetailsSchema,
  ProjectMemberSchema,
  ProjectVersionSchema
} from '../typescript/schema'
import type {
  Hit,
  Organization,
  ProjectDetails,
  ProjectMember,
  ProjectVersion
} from '../typescript/types'

export const list = forge
  .query({
    description: 'List all Modrinth entries',
    input: {
      query: z.object({
        page: z.string().default('1'),
        sort: z
          .enum(['relevance', 'downloads', 'follows', 'newest', 'updated'])
          .default('relevance'),
        query: z.string().optional(),
        version: z.string().optional(),
        categories: z.string().optional(),
        environments: z.string().optional(),
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
          .default('mod')
      })
    },
    output: {
      OK: z.object({
        items: z.array(HitSchema),
        total: z.number()
      })
    }
  })
  .callback(
    async ({
      query: {
        page,
        query,
        version,
        categories,
        environments,
        projectType,
        sort
      },
      response
    }) => {
      const parsedPage = parseInt(page, 10)

      const new_filters: string[] = [`project_types = '${projectType}'`]

      if (version) {
        new_filters.push(`game_versions = '${version}'`)
      }

      if (categories) {
        const categoryArray = categories.split(',').filter(Boolean)

        const positiveFilter = categoryArray.filter(c => !c.startsWith('!'))

        for (const c of positiveFilter) {
          new_filters.push(`categories = '${c}'`)
        }

        const negativeFilter = categoryArray
          .filter(c => c.startsWith('!'))
          .map(c => c.replace('!', ''))

        if (negativeFilter.length > 0) {
          new_filters.push(
            `categories NOT IN [${negativeFilter.map(c => `'${c}'`).join(', ')}]`
          )
        }
      }

      if (environments) {
        const envArray = environments.split(',').filter(Boolean)

        const hasClient = envArray.includes('client')

        const hasServer = envArray.includes('server')

        if (hasClient && !hasServer) {
          new_filters.push(
            `(environment = 'client_only' OR environment = 'client_only_server_optional')`
          )
        } else if (!hasClient && hasServer) {
          new_filters.push(`(environment = 'server_only')`)
        } else if (hasClient && hasServer) {
          new_filters.push(
            `(environment = 'client_or_server' OR environment = 'client_or_server_prefers_both')`
          )
        }
      }

      const queryParams = new URLSearchParams({
        limit: '20',
        offset: `${(parsedPage - 1) * 20}`,
        index: sort,
        query: query ?? '',
        new_filters: new_filters.join(' AND ')
      })

      const res = await fetch(
        `${API_ENDPOINT_V2}/search?${queryParams.toString()}`
      )

      const data = await res.json()

      return response.ok({
        items: data.hits as Hit[],
        total: data.total_hits
      })
    }
  )

export const getDetails = forge
  .query({
    description: 'Get Modrinth project details',
    input: {
      query: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: ProjectDetailsSchema
    }
  })
  .callback(async ({ query: { projectId }, response }) =>
    response.ok(await callModrinthAPI<ProjectDetails>(`project/${projectId}`))
  )

export const listMembers = forge
  .query({
    description: 'List all members of a Modrinth project team',
    input: {
      query: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.array(ProjectMemberSchema)
    }
  })
  .callback(async ({ query: { projectId }, response }) =>
    response.ok(
      await callModrinthAPI<ProjectMember[]>(`project/${projectId}/members`)
    )
  )

export const getOrganization = forge
  .query({
    description: 'Get the organization of a Modrinth project',
    input: {
      query: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.object({
        slug: z.string(),
        name: z.string(),
        icon: z.string(),
        color: z.number()
      })
    }
  })
  .callback(async ({ query: { projectId }, response }) => {
    const data = await callModrinthAPI<Organization>(
      `project/${projectId}/organization`,
      'v3'
    )

    return response.ok({
      slug: data.slug,
      name: data.name,
      icon: data.icon_url,
      color: data.color
    })
  })

export const getVersions = forge
  .query({
    description: 'List all versions for a Modrinth project',
    input: {
      query: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.array(ProjectVersionSchema)
    }
  })
  .callback(async ({ query: { projectId }, response }) =>
    response.ok(
      await callModrinthAPI<ProjectVersion[]>(`project/${projectId}/version`)
    )
  )
