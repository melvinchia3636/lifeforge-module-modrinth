import { forgeController } from '@functions/routes'
import { ClientError } from '@functions/routes/utils/response'
import TempFileManager from '@functions/utils/tempFileManager'
import z from 'zod'

import callModrinthAPI from '../functions/modrinthAPI'
import { ProjectDetails } from '../typescript/types'

const TEMP_FILE_NAME = 'modrinth_favourites.json'

export const addItem = forgeController
  .mutation()
  .description('Add a favourite project')
  .input({
    body: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ body: { projectId } }) => {
    const tempFileManager = new TempFileManager(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    if (tempFileContent.find(item => item.id === projectId)) {
      throw new ClientError('Project is already in favourites')
    }

    const project = await callModrinthAPI<ProjectDetails>(
      `project/${projectId}`
    )

    tempFileContent.push(project)

    tempFileManager.write(JSON.stringify(tempFileContent, null, 2))

    return tempFileContent.filter(
      item => item.project_type === project.project_type
    )
  })

export const listItemIds = forgeController
  .query()
  .description('List all favourite project IDs')
  .input({
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
  })
  .callback(async ({ query: { projectType } }) => {
    const tempFileManager = new TempFileManager(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    let filteredContent = tempFileContent

    if (projectType) {
      filteredContent = tempFileContent.filter(
        item => item.project_type === projectType
      )
    }

    return filteredContent.map(item => item.id)
  })

export const listItems = forgeController
  .query()
  .description('List all favourite projects')
  .input({
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
  })
  .callback(async ({ query: { projectType } }) => {
    const tempFileManager = new TempFileManager(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    if (projectType) {
      return tempFileContent.filter(item => item.project_type === projectType)
    }

    return tempFileContent
  })

export const removeItem = forgeController
  .mutation()
  .description('Remove a favourite project')
  .input({
    body: z.object({
      projectId: z.string()
    })
  })
  .callback(async ({ body: { projectId } }) => {
    const tempFileManager = new TempFileManager(TEMP_FILE_NAME)

    const tempFileContent = tempFileManager.read<ProjectDetails[]>()

    const updatedContent = tempFileContent.filter(item => item.id !== projectId)

    tempFileManager.write(JSON.stringify(updatedContent, null, 2))

    return updatedContent
  })
