import { forgeController, forgeRouter } from '@functions/routes'
import { ClientError } from '@functions/routes/utils/response'
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

export interface ProjectDetails {
  client_side: string
  server_side: string
  game_versions: string[]
  id: string
  slug: string
  project_type: string
  team: string
  organization: string | null
  title: string
  description: string
  body: string
  body_url: null
  published: Date
  updated: Date
  approved: Date
  queued: null
  status: string
  requested_status: null
  moderator_message: null
  license: License
  downloads: number
  followers: number
  categories: string[]
  additional_categories: any[]
  loaders: string[]
  versions: string[]
  icon_url: string
  issues_url: string
  source_url: string
  wiki_url: string
  discord_url: string
  donation_urls: any[]
  gallery: Gallery[]
  color: number
  thread_id: string
  monetization_status: string
}

export interface Gallery {
  url: string
  raw_url: string
  featured: boolean
  title: null | string
  description: null
  created: Date
  ordering: number
}

export interface License {
  id: string
  name: string
  url: null
}

export interface ProjectMember {
  role: string
  team_id: string
  user: User
  permissions: null
  accepted: boolean
  payouts_split: null
  ordering: number
}

export interface Organization {
  id: string
  slug: string
  name: string
  team_id: string
  description: string
  icon_url: string
  color: number
  members: Member[]
}

export interface Member {
  team_id: string
  user: User
  role: string
  is_owner: boolean
  permissions: null
  organization_permissions: null
  accepted: boolean
  payouts_split: null
  ordering: number
}

export interface User {
  id: string
  username: string
  avatar_url: string
  bio: string | null
  created: Date
  role: string
  badges: number
  auth_providers: null
  email: null
  email_verified: null
  has_password: null
  has_totp: null
  payout_data: null
  stripe_customer_id: null
  allow_friend_requests: null
  github_id: null
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

const getProjectDetails = forgeController
  .query()
  .description('Get Modrinth project details')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `https://api.modrinth.com/v2/project/${projectId}`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new ClientError('Project not found', 404)
      }

      throw new Error('Failed to fetch project details')
    }

    const data = await response.json()

    return data as ProjectDetails
  })

const listGameVersions = forgeController
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

const listProjectMembers = forgeController
  .query()
  .description('List all members of a Modrinth project team')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `https://api.modrinth.com/v2/project/${projectId}/members`
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

const getProjectOrganization = forgeController
  .query()
  .description('Get the organization of a Modrinth project')
  .input({
    query: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ query: { projectId } }) => {
    const response = await fetch(
      `https://api.modrinth.com/v3/project/${projectId}/organization`
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

export default forgeRouter({
  listProjects,
  getProjectDetails,
  listProjectMembers,
  getProjectOrganization,
  listGameVersions
})
