import forgeAPI from '@/utils/forgeAPI'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Button, Pagination, WithQueryData } from 'lifeforge-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useParams, usePersonalization } from 'shared'

function ChangelogSection() {
  const { t } = useTranslation('apps.modrinth')

  const { projectId } = useParams<{ projectId: string }>()

  const { language } = usePersonalization()

  const [page, setPage] = useState(1)

  return (
    <>
      <WithQueryData
        controller={forgeAPI.modrinth.projects.getVersions.input({
          projectId: projectId!
        })}
      >
        {data => (
          <>
            <Pagination
              page={page}
              totalPages={Math.ceil(data.length / 20)}
              onPageChange={setPage}
            />
            <WithQueryData
              controller={forgeAPI.modrinth.projects.listMembers.input({
                projectId: projectId!
              })}
            >
              {members => (
                <div className="my-6 space-y-6">
                  {data.slice((page - 1) * 20, page * 20).map(version => (
                    <div
                      key={version.version_number}
                      className={clsx(
                        'before:bg-bg-100 dark:before:bg-bg-900 relative min-w-0 pl-8 before:absolute before:top-3 before:left-0 before:z-10 before:size-5 before:rounded-full before:border-[3px] after:absolute after:top-3 after:left-0 after:h-[calc(100%-1rem)] after:w-[3px] after:translate-x-2 after:rounded-full',
                        version.version_type === 'release'
                          ? 'before:border-green-500 after:bg-green-500'
                          : version.version_type === 'beta'
                            ? 'before:border-yellow-500 after:bg-yellow-500'
                            : 'before:border-red-500 after:bg-red-500'
                      )}
                    >
                      <div className="flex-between w-full min-w-0 gap-12">
                        <h3 className="mb-2 flex min-w-0 flex-col text-2xl font-bold sm:flex-row sm:items-end sm:gap-2">
                          {version.version_number}
                          <span className="text-bg-500 w-full min-w-0 truncate text-base font-normal">
                            <span>{t('projectDetails.changelog.by')}</span>
                            <span className="text-custom-500 ml-1.5 text-base font-medium">
                              {members.find(
                                member => member.user.id === version.author_id
                              )?.user.username ||
                                t('projectDetails.changelog.unknown')}
                            </span>
                            <span className="ml-2">
                              {t('projectDetails.changelog.on')}{' '}
                              {dayjs(version.date_published)
                                .locale(language)
                                .format('MMMM D, YYYY')}
                            </span>
                          </span>
                        </h3>
                        <Button
                          as="a"
                          disabled={version.files.length === 0}
                          href={version.files[0]?.url || '#'}
                          icon="tabler:download"
                          rel="noopener noreferrer"
                          target="_blank"
                          variant="plain"
                        />
                      </div>
                      <div className="prose modrinth-prose mt-4 max-w-full!">
                        <Markdown rehypePlugins={[rehypeRaw]}>
                          {version.changelog ||
                            t('projectDetails.changelog.noChangelog')}
                        </Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </WithQueryData>
            <Pagination
              className="mb-8"
              page={page}
              totalPages={Math.ceil(data.length / 20)}
              onPageChange={setPage}
            />
          </>
        )}
      </WithQueryData>
    </>
  )
}

export default ChangelogSection
