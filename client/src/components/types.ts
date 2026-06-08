import { type InferOutput } from '@lifeforge/shared'

import { forgeAPI } from '@/manifest'
import type { ProjectDetails } from '@/pages/ProjectDetails'

export type Hit = InferOutput<typeof forgeAPI.projects.list>['items'][number]

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
