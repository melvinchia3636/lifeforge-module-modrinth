import z from 'zod'

import forge from '../forge'
import callModrinthAPI from '../functions/modrinthAPI'

import { ProjectDetailsSchema } from './projects'
import { ProjectDetails } from '../typescript/types'

const TEMP_FILE_NAME = 'modrinth_favourites.json'

export const addItem = forge
  .mutation({
    description: 'Add a favourite project',
    input: {
      body: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.array(ProjectDetailsSchema),
      CONFLICT: true
    }
  })
  .callback(async ({ body: { projectId }, core: { tempFile }, response }) => {
    const tempFileManager = new tempFile(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    if (tempFileContent.find(item => item.id === projectId)) {
      return response.conflict()
    }

    const project = await callModrinthAPI<ProjectDetails>(
      `project/${projectId}`
    )

    // @ts-expect-error - lazy to fix
    delete project['versions']
    // @ts-expect-error - lazy to fix
    delete project['game_versions']

    tempFileContent.push(project)

    tempFileManager.write(JSON.stringify(tempFileContent, null, 2))

    return response.ok(
      tempFileContent.filter(
        item => item.project_type === project.project_type
      )
    )
  })

export const listItemIds = forge
  .query({
    description: 'List all favourite project IDs',
    input: {
      query: z.object({
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
      })
    },
    output: {
      OK: z.array(z.string())
    }
  })
  .callback(async ({ query: { projectType }, core: { tempFile }, response }) => {
    const tempFileManager = new tempFile(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    let filteredContent = tempFileContent

    if (projectType) {
      filteredContent = tempFileContent.filter(
        item => item.project_type === projectType
      )
    }

    return response.ok(filteredContent.map(item => item.id))
  })

export const listItems = forge
  .query({
    description: 'List all favourite projects',
    input: {
      query: z.object({
        projectType: z.enum([
          'mod',
          'modpack',
          'resourcepack',
          'shader',
          'datapack',
          'plugin'
        ]),
        query: z.string().optional(),
        page: z.string().optional()
      })
    },
    output: {
      OK: z.object({
        items: z.array(ProjectDetailsSchema),
        total: z.number()
      })
    }
  })
  .callback(
    async ({ query: { projectType, page, query }, core: { tempFile }, response }) => {
      const tempFileManager = new tempFile(TEMP_FILE_NAME)

      const tempFileContent = tempFileManager.read<ProjectDetails[]>()

      const allItems = tempFileContent.filter(
        item =>
          item.project_type === projectType &&
          (!query || item.title.toLowerCase().includes(query.toLowerCase()))
      )

      const parsedPage = page ? parseInt(page) : 1

      return response.ok({
        items: allItems.slice(parsedPage * 20 - 20, parsedPage * 20),
        total: allItems.length
      })
    }
  )

export const checkItem = forge
  .query({
    description: 'Check if a project is in favourites',
    input: {
      query: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.boolean()
    }
  })
  .callback(async ({ query: { projectId }, core: { tempFile }, response }) => {
    const tempFileManager = new tempFile(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    return response.ok(tempFileContent.some(item => item.id === projectId))
  })

export const removeItem = forge
  .mutation({
    description: 'Remove a favourite project',
    input: {
      body: z.object({
        projectId: z.string()
      })
    },
    output: {
      OK: z.array(ProjectDetailsSchema)
    }
  })
  .callback(async ({ body: { projectId }, core: { tempFile }, response }) => {
    const tempFileManager = new tempFile(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    const updatedContent = tempFileContent.filter(item => item.id !== projectId)

    tempFileManager.write(JSON.stringify(updatedContent, null, 2))

    return response.ok(updatedContent)
  })
