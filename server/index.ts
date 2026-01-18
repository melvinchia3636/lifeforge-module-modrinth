import { forgeRouter } from '@lifeforge/server-utils'

import * as favouritesRoutes from './routes/favourites'
import * as gameVersionsRoutes from './routes/gameVersions'
import * as projectsRoutes from './routes/projects'

export default forgeRouter({
  projects: projectsRoutes,
  gameVersions: gameVersionsRoutes,
  favourites: favouritesRoutes
})
