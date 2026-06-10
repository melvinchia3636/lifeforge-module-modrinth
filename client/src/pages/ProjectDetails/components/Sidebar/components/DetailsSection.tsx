import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Flex,
  Icon,
  SidebarTitle,
  Stack,
  Text,
  usePersonalization
} from '@lifeforge/ui'

dayjs.extend(relativeTime)

function DetailsSection({
  published,
  updated,
  license
}: {
  published: string
  updated: string
  license: { name: string }
}) {
  const { t } = useModuleTranslation()
  const { language } = usePersonalization()

  return (
    <>
      <SidebarTitle label={t('projectDetails.sidebar.details')} />
      <Stack pb="md" px="xl">
        {license.name && (
          <Flex align="center" gap="sm">
            <Icon color="muted" icon="tabler:license" />
            <Text truncate color="muted">
              {t('projectDetails.sidebar.license')}{' '}
              <Text as="span" color="custom-500" weight="medium">
                {license.name}
              </Text>
            </Text>
          </Flex>
        )}
        <Flex align="center" gap="sm">
          <Icon color="muted" icon="tabler:calendar" />
          <Text truncate color="muted">
            {t('projectDetails.sidebar.published')}{' '}
            {dayjs(published).locale(language).fromNow()}
          </Text>
        </Flex>
        <Flex align="center" gap="sm">
          <Icon color="muted" icon="tabler:history" />
          <Text truncate color="muted">
            {t('projectDetails.sidebar.updated')}{' '}
            {dayjs(updated).locale(language).fromNow()}
          </Text>
        </Flex>
      </Stack>
    </>
  )
}

export default DetailsSection
