import { type InferOutput } from 'shared'

import type { ProjectDetails } from '@/pages/ProjectDetails'
import forgeAPI from '@/utils/forgeAPI'

export type Hit = InferOutput<
  typeof forgeAPI.melvinchia3636$modrinth.projects.list
>['items'][number]

export interface ProjectViewProps {
  entries: (Hit | ProjectDetails)[]
  favouritesIds: string[]
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}

export interface ProjectViewItemProps {
  entry: Hit | ProjectDetails
  isFavourite: boolean
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}
