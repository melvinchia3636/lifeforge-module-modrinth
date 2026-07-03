import { lazy } from 'react'

import { createForgeModuleClient } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModuleClient({
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
    { icon: 'tabler:cube', label: 'Mod', path: 'mods' },
    { icon: 'tabler:texture', label: 'Resource Pack', path: 'resource-packs' },
    { icon: 'tabler:database', label: 'Datapack', path: 'datapacks' },
    { icon: 'tabler:sun', label: 'Shader', path: 'shaders' },
    { icon: 'uil:box', label: 'Modpack', path: 'modpacks' },
    { icon: 'tabler:plug', label: 'Plugin', path: 'plugins' }
  ],
  contract
})

export default manifest

export { forgeAPI }
