import { forgeController } from '@functions/routes'
import { SCHEMAS } from '@schema'
import z from 'zod'

export const list = forgeController
  .query()
  .description('List all entries')
  .input({})
  .callback(({ pb }) => pb.getFullList.collection('modrinth__entries').execute())

export const getById = forgeController
  .query()
  .description('Get entry by ID')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'modrinth__entries'
  })
  .callback(({ pb, query: { id } }) =>
    pb.getOne.collection('modrinth__entries').id(id).execute()
  )

export const create = forgeController
  .mutation()
  .description('Create a new entry')
  .input({
    body: SCHEMAS.modrinth.entries.schema.omit({ created: true, updated: true })
  })
  .callback(({ pb, body }) =>
    pb.create.collection('modrinth__entries').data(body).execute()
  )

export const update = forgeController
  .mutation()
  .description('Update an existing entry')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.modrinth.entries.schema
      .partial()
      .omit({ created: true, updated: true })
  })
  .existenceCheck('query', {
    id: 'modrinth__entries'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('modrinth__entries').id(id).data(body).execute()
  )

export const remove = forgeController
  .mutation()
  .description('Delete an entry')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'modrinth__entries'
  })
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('modrinth__entries').id(id).execute()
  )
