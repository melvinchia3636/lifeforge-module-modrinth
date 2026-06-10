import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { sizeFormatter } from 'human-readable'
import { useState } from 'react'
import { useModuleTranslation } from '@lifeforge/localization'
import { useParams } from 'react-router'

import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Pagination,
  Stack,
  TagChip,
  Text,
  WithQueryData,
  usePersonalization
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { getModIcon } from '@/pages/ModList/constants/icons'

dayjs.extend(relativeTime)

function VersionsSection() {
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
            <Stack my="lg">
              {data.slice((page - 1) * 20, page * 20).map(version => (
                <Card key={version.version_number}>
                  <Flex align="center" justify="between" mb="md">
                    <Box>
                      <Text as="h3" size="xl" weight="medium">
                        {version.version_number}
                      </Text>
                      <Text color="muted">{version.name}</Text>
                    </Box>
                    <Button
                      as="a"
                      href={version.files[0]?.url || '#'}
                      icon="tabler:download"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="plain"
                    />
                  </Flex>
                  <Flex gapX="2xl" gapY="md" wrap="wrap">
                    <Box mb="md">
                      <Text
                        as="p"
                        color="muted"
                        mb="xs"
                        size="sm"
                        weight="medium"
                      >
                        {t('projectDetails.versions.gameVersions')}
                      </Text>
                      <Flex gap="xs" wrap="wrap">
                        {version.game_versions.map(v => (
                          <TagChip key={v} label={v} />
                        ))}
                      </Flex>
                    </Box>
                    <Box mb="lg">
                      <Text
                        as="p"
                        color="muted"
                        mb="xs"
                        size="sm"
                        weight="medium"
                      >
                        {t('projectDetails.versions.platforms')}
                      </Text>
                      <Flex gap="xs" wrap="wrap">
                        {version.loaders.map(loader => (
                          <TagChip
                            key={loader}
                            icon={`customHTML:${getModIcon(loader)}`}
                            label={loader}
                          />
                        ))}
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex align="center" gap="md">
                    <Flex align="center" gap="xs">
                      <Icon
                        color={{ base: 'bg-600', dark: 'bg-400' }}
                        icon="tabler:calendar"
                        size="1rem"
                      />
                      <Text
                        color={{ base: 'bg-600', dark: 'bg-400' }}
                        size="sm"
                      >
                        {dayjs(version.date_published)
                          .locale(language)
                          .fromNow()}
                      </Text>
                    </Flex>
                    <Flex align="center" gap="xs">
                      <Icon
                        color={{ base: 'bg-600', dark: 'bg-400' }}
                        icon="tabler:download"
                        size="1rem"
                      />
                      <Text
                        color={{ base: 'bg-600', dark: 'bg-400' }}
                        size="sm"
                      >
                        {sizeFormatter({
                          render: (literal, suffix) => `${literal}${suffix}`
                        })(version.downloads)}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Stack>
            <Pagination
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
