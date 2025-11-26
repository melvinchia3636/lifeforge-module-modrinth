import { forgeController } from '@functions/routes'
import { ClientError } from '@functions/routes/utils/response'
import z from 'zod'

import { API_ENDPOINT_V2, API_ENDPOINT_V3 } from '../constants/constants'
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
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(`${API_ENDPOINT_V2}/project/${projectId}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new ClientError('Project not found', 404)
      }

      throw new Error('Failed to fetch project details')
    }

    const data = await response.json()

    return data as ProjectDetails
  })

export const listMembers = forgeController
  .query()
  .description('List all members of a Modrinth project team')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `${API_ENDPOINT_V2}/project/${projectId}/members`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new ClientError('Project not found', 404)
      }
      throw new Error('Failed to fetch project members')
    }

    const data = await response.json()

    return data as ProjectMember[]
  })

export const getOrganization = forgeController
  .query()
  .description('Get the organization of a Modrinth project')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `${API_ENDPOINT_V3}/project/${projectId}/organization`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new ClientError('Organization not found', 404)
      }
      throw new Error('Failed to fetch project organization')
    }

    const data = (await response.json()) as Organization

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
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `${API_ENDPOINT_V2}/project/${projectId}/version`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new ClientError('Project not found', 404)
      }
      throw new Error('Failed to fetch project versions')
    }

    const data = await response.json()

    return data as ProjectVersion[]
  })
