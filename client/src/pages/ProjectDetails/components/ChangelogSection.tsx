import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'
import { useModuleTranslation } from '@lifeforge/localization'
import Markdown from 'react-markdown'
import { useParams } from 'react-router'
import rehypeRaw from 'rehype-raw'

import {
  Box,
  Button,
  Flex,
  Pagination,
  Prose,
  Stack,
  Text,
  WithQueryData,
  usePersonalization
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import { timelineItem } from './ChangelogSection.css'

dayjs.extend(relativeTime)

function ChangelogSection() {
  const { t } = useModuleTranslation()
  const { projectId } = useParams<{ projectId: string }>()
  const { language } = usePersonalization()
  const [page, setPage] = useState(1)

  return (
    <>
      <WithQueryData
        controller={forgeAPI.projects.getVersions.input({
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
              controller={forgeAPI.projects.listMembers.input({
                projectId: projectId!
              })}
            >
              {members => (
                <Stack gap="lg" my="lg">
                  {data.slice((page - 1) * 20, page * 20).map(version => {
                    const dotColor =
                      version.version_type === 'release'
                        ? '#22c55e'
                        : version.version_type === 'beta'
                          ? '#eab308'
                          : '#ef4444'

                    return (
                      <Box
                        key={version.version_number}
                        className={timelineItem}
                        style={
                          {
                            '--tl-color': dotColor
                          } as React.CSSProperties
                        }
                      >
                        <Flex
                          align="center"
                          gap="2xl"
                          justify="between"
                          mb="md"
                          minWidth="0"
                          width="100%"
                        >
                          <Flex
                            asChild
                            align={{ sm: 'end' }}
                            direction={{ base: 'column', sm: 'row' }}
                            gap="sm"
                            minWidth="0"
                          >
                            <Text as="h3" size="2xl" weight="bold">
                              <Text truncate>{version.version_number}</Text>
                              <Text
                                truncate
                                color="muted"
                                size="base"
                                weight="normal"
                              >
                                <Text>{t('projectDetails.changelog.by')}</Text>
                                <Text
                                  as="span"
                                  color="custom-500"
                                  ml="xs"
                                  weight="medium"
                                >
                                  {members.find(
                                    member =>
                                      member.user.id === version.author_id
                                  )?.user.username ||
                                    t('projectDetails.changelog.unknown')}
                                </Text>
                                <Text ml="xs">
                                  {t('projectDetails.changelog.on')}{' '}
                                  {dayjs(version.date_published)
                                    .locale(language)
                                    .format('MMMM D, YYYY')}
                                </Text>
                              </Text>
                            </Text>
                          </Flex>
                          <Button
                            as="a"
                            disabled={version.files.length === 0}
                            href={version.files[0]?.url || '#'}
                            icon="tabler:download"
                            rel="noopener noreferrer"
                            target="_blank"
                            variant="plain"
                          />
                        </Flex>
                        <Prose className="modrinth-prose">
                          <Markdown rehypePlugins={[rehypeRaw]}>
                            {version.changelog ||
                              t('projectDetails.changelog.noChangelog')}
                          </Markdown>
                        </Prose>
                      </Box>
                    )
                  })}
                </Stack>
              )}
            </WithQueryData>
            <Box asChild mt="md">
              <Pagination
                page={page}
                totalPages={Math.ceil(data.length / 20)}
                onPageChange={setPage}
              />
            </Box>
          </>
        )}
      </WithQueryData>
    </>
  )
}

export default ChangelogSection
