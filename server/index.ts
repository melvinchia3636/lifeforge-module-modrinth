import { forgeRouter } from '@functions/routes'

import * as favouritesRoutes from './routes/favourites'
import * as gameVersionsRoutes from './routes/gameVersions'
import * as projectsRoutes from './routes/projects'

export default forgeRouter({
  projects: projectsRoutes,
  gameVersions: gameVersionsRoutes,
  favourites: favouritesRoutes
})
