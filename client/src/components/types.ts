import { type InferOutput } from 'shared'
import forgeAPI from '@/utils/forgeAPI'

export type Hit = InferOutput<
    typeof forgeAPI.modrinth.projects.list
>['items'][number]

export interface ProjectViewProps {
    entries: Hit[]
    getIcon: (id: string) => string | null
    getKey: (id: string) => string | undefined
}

export interface ProjectViewItemProps {
    entry: Hit
    getIcon: (id: string) => string | null
    getKey: (id: string) => string | undefined
}
