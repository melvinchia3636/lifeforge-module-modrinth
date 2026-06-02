import z from 'zod'

import { API_ENDPOINT_V2 } from '../constants/constants'
import forge from '../forge'
import callModrinthAPI from '../functions/modrinthAPI'
import { Hit, Organization, ProjectDetails, ProjectMember, ProjectVersion } from '../typescript/types'

const HitSchema = z.object({
  project_id: z.string(),
  project_type: z.string(),
  slug: z.string(),
  author: z.string(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  display_categories: z.array(z.string()),
  versions: z.array(z.string()),
  downloads: z.number(),
  follows: z.number(),
  icon_url: z.string(),
  date_created: z.string(),
  date_modified: z.string(),
  newest_version: z.string(),
  license: z.string(),
  client_side: z.enum(['optional', 'required', 'unsupported', 'unknown']),
  server_side: z.enum(['optional', 'required', 'unsupported', 'unknown']),
  gallery: z.array(z.string()),
  featured_gallery: z.string().nullable(),
  color: z.number().nullable()
})

const LicenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().nullable()
})

const GallerySchema = z.object({
  url: z.string(),
  raw_url: z.string(),
  featured: z.boolean(),
  title: z.string().nullable(),
  description: z.null(),
  created: z.string(),
  ordering: z.number()
})

export const ProjectDetailsSchema = z.object({
  client_side: z.string(),
  server_side: z.string(),
  game_versions: z.array(z.string()),
  id: z.string(),
  slug: z.string(),
  project_type: z.string(),
  team: z.string(),
  organization: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  body_url: z.null(),
  published: z.string(),
  updated: z.string(),
  approved: z.string(),
  queued: z.null(),
  status: z.string(),
  requested_status: z.null(),
  moderator_message: z.null(),
  license: LicenseSchema,
  downloads: z.number(),
  followers: z.number(),
  categories: z.array(z.string()),
  additional_categories: z.array(z.unknown()),
  loaders: z.array(z.string()),
  versions: z.array(z.string()),
  icon_url: z.string(),
  issues_url: z.string(),
  source_url: z.string(),
  wiki_url: z.string(),
  discord_url: z.string(),
  donation_urls: z.array(z.unknown()),
  gallery: z.array(GallerySchema),
  color: z.number(),
  thread_id: z.string(),
  monetization_status: z.string()
})

const FileSchema = z.object({
  hashes: z.object({
    sha512: z.string(),
    sha1: z.string()
  }),
  url: z.string(),
  filename: z.string(),
  primary: z.boolean(),
  size: z.number(),
  file_type: z.null()
})

const ProjectVersionSchema = z.object({
  game_versions: z.array(z.string()),
  loaders: z.array(z.string()),
  id: z.string(),
  project_id: z.string(),
  author_id: z.string(),
  featured: z.boolean(),
  name: z.string(),
  version_number: z.string(),
  changelog: z.string(),
  changelog_url: z.null(),
  date_published: z.string(),
  downloads: z.number(),
  version_type: z.enum(['release', 'beta', 'alpha']),
  status: z.string(),
  requested_status: z.null(),
  files: z.array(FileSchema),
  dependencies: z.array(z.unknown())
})

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  created: z.string(),
  role: z.string(),
  badges: z.number(),
  auth_providers: z.null(),
  email: z.null(),
  email_verified: z.null(),
  has_password: z.null(),
  has_totp: z.null(),
  payout_data: z.null(),
  stripe_customer_id: z.null(),
  allow_friend_requests: z.null(),
  github_id: z.null()
})

const ProjectMemberSchema = z.object({
  role: z.string(),
  team_id: z.string(),
  user: UserSchema,
  permissions: z.null(),
  accepted: z.boolean(),
  payouts_split: z.null(),
  ordering: z.number()
})

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
          .default('mod'),
        facets: z.string().optional()
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

      const facets: string[][] = [[`project_type:${projectType}`]]

      if (version) {
        facets.push([`versions:${version}`])
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

      if (environments) {
        const envArray = environments.split(',').filter(Boolean)

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

      const queryParams = new URLSearchParams({
        limit: '20',
        offset: `${(parsedPage - 1) * 20}`,
        index: sort,
        query: query ?? '',
        facets: JSON.stringify(facets)
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
