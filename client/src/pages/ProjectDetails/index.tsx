import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { type InferOutput } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  ContentWrapperWithSidebar,
  Flex,
  GoBackButton,
  LayoutWithSidebar,
  Scrollbar,
  WithQuery,
  createTabbedView,
  toast,
  useModuleSidebarState
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import {
  getDataPackIcon,
  getDataPackKey
} from '@/pages/DataPackList/constants/icons'
import { getModIcon, getModKey } from '@/pages/ModList/constants/icons'
import {
  getModpackIcon,
  getModpackKey
} from '@/pages/ModpackList/constants/icons'
import { getPluginIcon, getPluginKey } from '@/pages/PluginList/constants/icons'
import {
  getResourcePackIcon,
  getResourcePackKey
} from '@/pages/ResourcePackList/constants/icons'
import { getShaderIcon, getShaderKey } from '@/pages/ShaderList/constants/icons'

import ChangelogSection from './components/ChangelogSection'
import DescriptionSection from './components/DescriptionSection'
import GallerySection from './components/GallerySection'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VersionsSection from './components/VersionsSection'

export type ProjectDetails = InferOutput<typeof forgeAPI.projects.getDetails>

const ALL_ICONS_UTILS = {
  mod: { getIcon: getModIcon, getKey: getModKey },
  modpack: { getIcon: getModpackIcon, getKey: getModpackKey },
  datapack: { getIcon: getDataPackIcon, getKey: getDataPackKey },
  resourcepack: { getIcon: getResourcePackIcon, getKey: getResourcePackKey },
  shader: { getIcon: getShaderIcon, getKey: getShaderKey },
  plugin: { getIcon: getPluginIcon, getKey: getPluginKey }
}

const TABS = [
  {
    id: 'description',
    icon: 'tabler:file-description',
    Component: DescriptionSection
  },
  {
    id: 'gallery',
    icon: 'tabler:photo',
    Component: GallerySection
  },
  {
    id: 'changelog',
    icon: 'tabler:history',
    Component: ChangelogSection
  },
  {
    id: 'versions',
    icon: 'tabler:package',
    Component: VersionsSection
  }
] as const

function ProjectDetails() {
  const { t } = useModuleTranslation()
  const navigate = useNavigate()
  const { projectId } = useParams<{ projectId: string }>()
  const { setIsSidebarOpen } = useModuleSidebarState()

  const dataQuery = useQuery(
    forgeAPI.projects.getDetails
      .input({
        projectId: projectId!
      })
      .queryOptions({
        retry: false
      })
  )

  const { getIcon, getKey } =
    ALL_ICONS_UTILS[
      (dataQuery.data?.project_type || 'mod') as keyof typeof ALL_ICONS_UTILS
    ]

  const TabbedView = createTabbedView({
    tabs: TABS.map(e => ({ ...e, name: `projectDetails.tabs.${e.id}` })),
    enabled: [
      'description',
      (dataQuery.data?.gallery.length || 0) > 0 ? 'gallery' : null,
      'changelog',
      'versions'
    ].filter(Boolean) as (typeof TABS)[number]['id'][]
  })

  useEffect(() => {
    if (
      dataQuery.isError &&
      dataQuery.error.message.toLowerCase().includes('not found')
    ) {
      navigate('/modrinth', { replace: true })
      toast.error(t('projectDetails.projectNotFound'))
    }
  }, [dataQuery.isError, dataQuery.error, navigate, t])

  return (
    <WithQuery query={dataQuery} showRetryButton={false}>
      {data => (
        <>
          <Flex align="center" justify="between">
            <GoBackButton onClick={() => navigate(-1)} />
            <Button
              display={{
                base: 'flex',
                xl: 'none'
              }}
              icon="tabler:info-circle"
              mb="sm"
              variant="plain"
              onClick={() => setIsSidebarOpen(true)}
            />
          </Flex>
          <Header data={data} getIcon={getIcon} getKey={getKey} />
          <LayoutWithSidebar>
            <ContentWrapperWithSidebar>
              <TabbedView.Root>
                <TabbedView.Selector mb="lg" />
                {TABS.map(({ id, Component }) => (
                  <TabbedView.When key={id} tabId={id}>
                    <Box
                      asChild
                      display={{ base: 'none', lg: 'block' }}
                      mb="2xl"
                    >
                      <Scrollbar>
                        <Component />
                      </Scrollbar>
                    </Box>
                    <Box display={{ base: 'block', lg: 'none' }}>
                      <Component />
                    </Box>
                  </TabbedView.When>
                ))}
              </TabbedView.Root>
            </ContentWrapperWithSidebar>
            <Sidebar
              discord_url={data.discord_url}
              getIcon={getIcon}
              hasOrganization={!!data.organization}
              issues_url={data.issues_url}
              license={data.license}
              loaders={data.loaders}
              published={data.published}
              source_url={data.source_url}
              updated={data.updated}
              versions={data.game_versions}
            />
          </LayoutWithSidebar>
        </>
      )}
    </WithQuery>
  )
}

export default ProjectDetails
