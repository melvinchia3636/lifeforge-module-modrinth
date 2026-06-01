import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as favouritesRoutes from './routes/favourites'
import * as gameVersionsRoutes from './routes/gameVersions'
import * as projectsRoutes from './routes/projects'

const routes = forgeRouter({
  projects: projectsRoutes,
  gameVersions: gameVersionsRoutes,
  favourites: favouritesRoutes
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
