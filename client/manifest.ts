import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Modrinth',
  icon: 'simple-icons:modrinth',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Information'
} satisfies ModuleConfig
