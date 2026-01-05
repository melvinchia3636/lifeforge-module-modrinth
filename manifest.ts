import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  icon: 'simple-icons:modrinth',
  routes: {
    '/': lazy(() => import('@')),
    '/project/:projectId': lazy(() => import('@/pages/ProjectDetails')),
    '/mods': lazy(() => import('@/pages/ModList')),
    '/resource-packs': lazy(() => import('@/pages/ResourcePackList')),
    '/datapacks': lazy(() => import('@/pages/DataPackList')),
    '/shaders': lazy(() => import('@/pages/ShaderList')),
    '/modpacks': lazy(() => import('@/pages/ModpackList')),
    '/plugins': lazy(() => import('@/pages/PluginList'))
  },
  subsection: [
    { icon: 'tabler:cube', label: 'Mods', path: 'mods' },
    { icon: 'tabler:texture', label: 'Resource Packs', path: 'resource-packs' },
    { icon: 'tabler:database', label: 'Datapacks', path: 'datapacks' },
    { icon: 'tabler:sun', label: 'Shaders', path: 'shaders' },
    { icon: 'uil:box', label: 'Modpacks', path: 'modpacks' },
    { icon: 'tabler:plug', label: 'Plugins', path: 'plugins' }
  ],
  category: 'Information'
} satisfies ModuleConfig
