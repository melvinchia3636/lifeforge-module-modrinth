import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Modrinth',
  icon: 'simple-icons:modrinth',
  routes: {
    '/': lazy(() => import('@')),
    '/project/:projectId': lazy(() => import('@/pages/ProjectDetails')),
    '/mods': lazy(() => import('@/pages/ModList'))
  },
  subsection: [
    { icon: 'tabler:cube', label: 'Mods', path: 'mods' },
    {
      icon: 'tabler:paint',
      label: 'Resource Packs',
      path: 'resource-packs'
    },
    { icon: 'tabler:braces', label: 'Datapacks', path: 'datapacks' },
    { icon: 'tabler:eyeglass', label: 'Shaders', path: 'shaders' },
    { icon: 'uil:box', label: 'Modpacks', path: 'modpacks' },
    { icon: 'tabler:plug', label: 'Plugins', path: 'plugins' }
  ],
  category: 'Information'
} satisfies ModuleConfig
