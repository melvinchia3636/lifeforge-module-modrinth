import forgeAPI from '@/utils/forgeAPI'
import { type InferOutput } from 'shared'

export type Hit = InferOutput<
  typeof forgeAPI.modrinth.projects.list
>['items'][number]

export interface ProjectViewProps {
  entries: Hit[]
  favouritesIds: string[]
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}

export interface ProjectViewItemProps {
  entry: Hit
  isFavourite: boolean
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}
