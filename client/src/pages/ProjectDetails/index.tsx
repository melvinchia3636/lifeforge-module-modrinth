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
import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  ContentWrapperWithSidebar,
  GoBackButton,
  LayoutWithSidebar,
  Scrollbar,
  Tabs,
  WithQuery,
  useModuleSidebarState
} from 'lifeforge-ui'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { type InferOutput, useNavigate, useParams } from 'shared'

import ChangelogSection from './components/ChangelogSection'
import DescriptionSection from './components/DescriptionSection'
import GallerySection from './components/GallerySection'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VersionsSection from './components/VersionsSection'

export type ProjectDetails = InferOutput<
  typeof forgeAPI.modrinth.projects.getDetails
>

const ALL_ICONS_UTILS = {
  mod: { getIcon: getModIcon, getKey: getModKey },
  modpack: { getIcon: getModpackIcon, getKey: getModpackKey },
  datapack: { getIcon: getDataPackIcon, getKey: getDataPackKey },
  resourcepack: { getIcon: getResourcePackIcon, getKey: getResourcePackKey },
  shader: { getIcon: getShaderIcon, getKey: getShaderKey },
  plugin: { getIcon: getPluginIcon, getKey: getPluginKey }
}

function ProjectDetails() {
  const { t } = useTranslation('apps.modrinth')

  const navigate = useNavigate()

  const { projectId } = useParams<{ projectId: string }>()

  const [currentSection, setCurrentSection] = useState<
    'description' | 'gallery' | 'changelog' | 'versions'
  >('description')

  const { setIsSidebarOpen } = useModuleSidebarState()

  const dataQuery = useQuery(
    forgeAPI.modrinth.projects.getDetails
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
          <div className="flex-between flex">
            <GoBackButton onClick={() => navigate(-1)} />
            <Button
              className="mb-2 xl:hidden"
              icon="tabler:info-circle"
              variant="plain"
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
          <Header data={data} getIcon={getIcon} getKey={getKey} />
          <LayoutWithSidebar>
            <ContentWrapperWithSidebar>
              <Tabs
                active={currentSection}
                className="mb-6"
                enabled={
                  [
                    'description',
                    data.gallery.length > 0 ? 'gallery' : null,
                    'changelog',
                    'versions'
                  ].filter(Boolean) as string[]
                }
                items={[
                  {
                    id: 'description',
                    name: t('projectDetails.tabs.description'),
                    icon: 'tabler:file-description'
                  },
                  {
                    id: 'gallery',
                    name: t('projectDetails.tabs.gallery'),
                    icon: 'tabler:photo'
                  },
                  {
                    id: 'changelog',
                    name: t('projectDetails.tabs.changelog'),
                    icon: 'tabler:history'
                  },
                  {
                    id: 'versions',
                    name: t('projectDetails.tabs.versions'),
                    icon: 'tabler:package'
                  }
                ]}
                onNavClick={(id: string) => {
                  setCurrentSection(
                    id as 'description' | 'gallery' | 'changelog' | 'versions'
                  )
                }}
              />
              <Scrollbar className="hidden lg:block">
                {currentSection === 'description' && (
                  <DescriptionSection description={data.body} />
                )}
                {currentSection === 'gallery' && (
                  <GallerySection gallery={data.gallery} />
                )}
                {currentSection === 'changelog' && <ChangelogSection />}
                {currentSection === 'versions' && <VersionsSection />}
              </Scrollbar>
              <div className="block lg:hidden">
                {currentSection === 'description' && (
                  <DescriptionSection description={data.body} />
                )}
                {currentSection === 'gallery' && (
                  <GallerySection gallery={data.gallery} />
                )}
                {currentSection === 'changelog' && <ChangelogSection />}
                {currentSection === 'versions' && <VersionsSection />}
              </div>
            </ContentWrapperWithSidebar>
            <Sidebar
              discord_url={data.discord_url}
              getIcon={getIcon}
              getKey={getKey}
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
