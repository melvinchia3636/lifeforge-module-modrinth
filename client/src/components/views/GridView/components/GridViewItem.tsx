import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Box, Card, Flex, Text } from '@lifeforge/ui'

import type { ProjectViewItemProps } from '@/components/types'

import ProjectIcon from '../../../ProjectIcon'
import ProjectMetadata from '../../../ProjectMetadata'
import ProjectTags from '../../../ProjectTags'
import FavouriteButton from '../../components/FavouriteButton'

function GridViewItem({
  entry,
  isFavourite,
  getIcon,
  getKey
}: ProjectViewItemProps) {
  const { t } = useTranslation('apps.melvinchia3636--modrinth')

  const navigate = useNavigate()

  return (
    <Card
      isInteractive
      onClick={() =>
        navigate(`/melvinchia3636--modrinth/project/${entry.slug}`)
      }
    >
      <Flex align="start" gap="md">
        <ProjectIcon height="6em" iconUrl={entry.icon_url} width="6em" />
        <Box flex="1" minWidth="0">
          <Text truncate as="h3" mr="2xl" size="lg" weight="semibold">
            {entry.title}
          </Text>
          {'author' in entry && (
            <Text as="p" color="primary" mr="3xl" size="sm">
              {t('projectDetails.changelog.by')} {entry.author}
            </Text>
          )}
          <ProjectMetadata entry={entry} mr="3xl" />
        </Box>
      </Flex>
      <Box asChild flex="1">
        <Text as="p" color="muted" lineClamp={2} mt="md">
          {entry.description}
        </Text>
      </Box>
      <ProjectTags
        categories={entry.categories}
        getIcon={getIcon}
        getKey={getKey}
      />
      <FavouriteButton
        isFavourite={isFavourite}
        projectId={'project_id' in entry ? entry.project_id : entry.id}
        right="0.5em"
        top="0.5em"
      />
    </Card>
  )
}

export default GridViewItem
