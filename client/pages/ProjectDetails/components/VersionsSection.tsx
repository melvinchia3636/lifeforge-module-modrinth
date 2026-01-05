import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import { Button, Card, Pagination, TagChip, WithQueryData } from 'lifeforge-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, usePersonalization } from 'shared'

import { getModIcon } from '@/pages/ModList/constants/icons'
import forgeAPI from '@/utils/forgeAPI'

function VersionsSection() {
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { projectId } = useParams<{ projectId: string }>()

  const { language } = usePersonalization()

  const [page, setPage] = useState(1)

  return (
    <>
      <WithQueryData
        controller={forgeAPI.melvinchia3636$modrinth.projects.getVersions.input(
          {
            projectId: projectId!
          }
        )}
      >
        {data => (
          <>
            <Pagination
              page={page}
              totalPages={Math.ceil(data.length / 20)}
              onPageChange={setPage}
            />
            <table className="my-6 hidden w-full table-auto border-collapse md:table">
              <thead>
                <tr className="border-bg-200 text-bg-800 dark:text-bg-100 dark:border-bg-800 border-b-2">
                  <th className="px-4 py-2 text-left">
                    {t('projectDetails.versions.name')}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t('projectDetails.versions.gameVersions')}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t('projectDetails.versions.platforms')}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t('projectDetails.versions.published')}
                  </th>
                  <th className="px-4 py-2 text-left">
                    {t('projectDetails.versions.downloads')}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.slice((page - 1) * 20, page * 20).map(version => (
                  <tr
                    key={version.version_number}
                    className="border-bg-200 dark:border-bg-800 border-b"
                  >
                    <td className="px-4 py-3">
                      <p className="text-lg font-medium whitespace-nowrap">
                        {version.version_number}
                      </p>
                      <p className="text-bg-500 text-sm whitespace-nowrap">
                        {version.name}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {version.game_versions.map(v => (
                          <TagChip key={v} label={v} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {version.loaders.map(loader => (
                          <TagChip
                            key={loader}
                            icon={`customHTML:${getModIcon(loader)}`}
                            label={loader}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="text-bg-600 dark:text-bg-400 px-4 py-3">
                      {dayjs(version.date_published).locale(language).fromNow()}
                    </td>
                    <td className="text-bg-600 dark:text-bg-400 px-4 py-3">
                      {sizeFormatter({
                        render: (literal, suffix) => `${literal}${suffix}`
                      })(version.downloads)}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        as="a"
                        href={version.files[0]?.url || '#'}
                        icon="tabler:download"
                        rel="noopener noreferrer"
                        target="_blank"
                        variant="plain"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-6 space-y-3 md:hidden">
              {data.slice((page - 1) * 20, page * 20).map(version => (
                <Card key={version.version_number}>
                  <div className="flex-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium">
                        {version.version_number}
                      </h3>
                      <p className="text-bg-500">{version.name}</p>
                    </div>
                    <Button
                      as="a"
                      href={version.files[0]?.url || '#'}
                      icon="tabler:download"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="plain"
                    />
                  </div>
                  <div className="mb-4">
                    <h4 className="text-bg-500 mb-2 text-sm font-medium">
                      {t('projectDetails.versions.gameVersions')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {version.game_versions.map(v => (
                        <TagChip key={v} label={v} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-bg-500 mb-2 text-sm font-medium">
                      {t('projectDetails.versions.platforms')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {version.loaders.map(loader => (
                        <TagChip
                          key={loader}
                          icon={`customHTML:${getModIcon(loader)}`}
                          label={loader}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-bg-600 dark:text-bg-400 flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Icon className="size-4" icon="tabler:calendar" />
                      <span>
                        {dayjs(version.date_published)
                          .locale(language)
                          .fromNow()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon className="size-4" icon="tabler:download" />
                      <span>
                        {sizeFormatter({
                          render: (literal, suffix) => `${literal}${suffix}`
                        })(version.downloads)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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

export default VersionsSection
