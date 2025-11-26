import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import {
  Button,
  ContentWrapperWithSidebar,
  GoBackButton,
  LayoutWithSidebar,
  Scrollbar,
  Tabs,
  WithQuery
} from 'lifeforge-ui'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { type InferOutput, useNavigate, useParams } from 'shared'

import CategoryIcon from '../ModList/components/CategoryIcon'
import { getKey } from '../ModList/constants/icons'
import DescriptionSection from './components/DescriptionSection'
import GallerySection from './components/GallerySection'
import Sidebar from './components/Sidebar'

export type ProjectDetails = InferOutput<
  typeof forgeAPI.modrinth.getProjectDetails
>

function ProjectDetails() {
  const navigate = useNavigate()

  const { projectId } = useParams<{ projectId: string }>()

  const [currentSection, setCurrentSection] = useState<
    'description' | 'gallery' | 'changelog' | 'versions'
  >('description')

  const dataQuery = useQuery(
    forgeAPI.modrinth.getProjectDetails
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
          <GoBackButton onClick={() => navigate(-1)} />
          <header className="flex-between border-bg-200 dark:border-bg-700/50 mt-2 mb-6 gap-12 border-b pb-6">
            <div className="flex gap-4">
              <div className="bg-bg-100 border-bg-200 dark:border-bg-700/50 shadow-custom dark:bg-bg-800/70 relative isolate size-32 shrink-0 overflow-hidden rounded-lg border">
                {data.icon_url ? (
                  <img
                    alt={`${data.title} icon`}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={data.icon_url}
                  />
                ) : (
                  <Icon
                    className="text-bg-200 dark:text-bg-700 absolute bottom-1/2 left-1/2 z-[-1] size-12 -translate-x-1/2 translate-y-1/2"
                    icon="simple-icons:modrinth"
                  />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-medium">{data.title}</h3>
                <p className="text-bg-500 mt-2">{data.description}</p>
                <div className="text-bg-500 mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center gap-1">
                    <Icon className="size-5" icon="tabler:download" />
                    <span className="text-base">
                      {
                        sizeFormatter({
                          render: (literal, suffix) => `${literal}${suffix}`
                        })(data.downloads) as string
                      }{' '}
                      downloads
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon className="size-5" icon="tabler:users" />
                    <span className="text-base">
                      {sizeFormatter()(data.followers) as string} follows
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon className="size-5" icon="tabler:history" />
                    <span className="text-base">
                      Updated {dayjs(data.updated).fromNow()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.categories.map(category => (
                    <span
                      key={category}
                      className="bg-bg-200 dark:bg-bg-800 text-bg-500 flex items-center gap-2 rounded-full px-3 py-1 text-sm"
                    >
                      <CategoryIcon id={category} />
                      {getKey(category) || category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button icon="tabler:download" onClick={() => {}}>
                Download
              </Button>
              <Button
                icon="tabler:heart"
                variant="secondary"
                onClick={() => {}}
              >
                Add to Favourites
              </Button>
            </div>
          </header>
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
              <Scrollbar>
                {currentSection === 'description' && (
                  <DescriptionSection description={data.body} />
                )}
                {currentSection === 'gallery' && (
                  <GallerySection gallery={data.gallery} />
                )}
              </Scrollbar>
            </ContentWrapperWithSidebar>
            <Sidebar
              discordUrl={data.discord_url}
              hasOrganization={!!data.organization}
              issuesUrl={data.issues_url}
              loaders={data.loaders}
              sourceUrl={data.source_url}
              versions={data.game_versions}
            />
          </LayoutWithSidebar>
        </>
      )}
    </WithQuery>
  )
}

export default ProjectDetails
