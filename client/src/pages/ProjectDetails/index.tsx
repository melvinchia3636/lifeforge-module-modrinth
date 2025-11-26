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

function ProjectDetails() {
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

  useEffect(() => {
    if (
      dataQuery.isError &&
      dataQuery.error.message.toLowerCase().includes('not found')
    ) {
      navigate('/modrinth', { replace: true })
      toast.error('Project not found')
    }
  }, [dataQuery.isError, dataQuery.error, navigate])

  return (
    <WithQuery query={dataQuery} showRetryButton={false}>
      {data => (
        <>
          <div className="flex-between flex">
            <GoBackButton onClick={() => navigate(-1)} />
            <Button
              className="mb-2"
              icon="tabler:info-circle"
              variant="plain"
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
          <Header data={data} />
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
                    name: 'Description',
                    icon: 'tabler:file-description'
                  },
                  {
                    id: 'gallery',
                    name: 'Gallery',
                    icon: 'tabler:photo'
                  },
                  {
                    id: 'changelog',
                    name: 'Changelog',
                    icon: 'tabler:history'
                  },
                  {
                    id: 'versions',
                    name: 'Versions',
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
