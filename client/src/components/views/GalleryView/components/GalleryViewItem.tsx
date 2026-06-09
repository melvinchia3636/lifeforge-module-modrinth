import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import {
  Box,
  Card,
  Flex,
  Ring,
  Stack,
  Text,
  colorWithOpacity
} from '@lifeforge/ui'

import type { ProjectViewItemProps } from '@/components/types'

import ProjectIcon from '../../../ProjectIcon'
import ProjectMetadata from '../../../ProjectMetadata'
import ProjectTags from '../../../ProjectTags'
import FavouriteButton from '../../components/FavouriteButton'

function GalleryViewItem({
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
      gap="md"
      p="none"
      onClick={() => {
        navigate(`/melvinchia3636--modrinth/project/${entry.slug}`)
      }}
    >
      {(() => {
        const targetImg =
          'project_id' in entry
            ? entry.featured_gallery || entry.gallery?.[0]
            : entry.gallery.filter(e => e.featured)[0]?.url ||
              entry.gallery[0]?.url

        return (
          <Box
            aspectRatio="16/9"
            bg={{
              base: 'bg-200',
              dark: colorWithOpacity('bg-800', '70%')
            }}
            style={
              !targetImg
                ? {
                    backgroundColor:
                      '#' + entry.color?.toString(16).padStart(6, '0')
                  }
                : undefined
            }
            width="100%"
          >
            {targetImg ? (
              <Box
                asChild
                height="100%"
                style={{
                  objectFit: 'cover'
                }}
                width="100%"
              >
                <img alt={`${entry.title} featured`} src={targetImg} />
              </Box>
            ) : null}
          </Box>
        )
      })()}
      <Flex align="center" gap="md" px="md">
        <Ring
          asChild
          ringColor={{
            base: 'bg-100',
            dark: 'bg-800'
          }}
          ringWidth="4px"
          style={{
            transform: 'translateY(-40%)'
          }}
        >
          <ProjectIcon height="7em" iconUrl={entry.icon_url} width="7em" />
        </Ring>
        <Box
          minWidth="0"
          position="relative"
          pr="3xl"
          style={{
            marginTop: '-4em'
          }}
          width="100%"
        >
          <Text truncate as="h3" size="xl" weight="semibold">
            {entry.title}
          </Text>
          {'author' in entry && (
            <Text truncate as="p" color="primary" mt="xs" size="sm">
              {t('projectDetails.changelog.by')} {entry.author}
            </Text>
          )}
          <FavouriteButton
            isFavourite={isFavourite}
            projectId={'project_id' in entry ? entry.project_id : entry.id}
            right="0"
            top="0"
          />
        </Box>
      </Flex>
      <Stack
        direction="column"
        flex="1"
        p="md"
        style={{
          marginTop: '-3em'
        }}
      >
        <Text
          as="p"
          color="muted"
          mt="sm"
          style={{
            marginBottom: 'auto'
          }}
        >
          {entry.description}
        </Text>
        <ProjectMetadata entry={entry} mt="lg" />
        <ProjectTags
          categories={entry.categories}
          getIcon={getIcon}
          getKey={getKey}
        />
      </Stack>
    </Card>
  )
}

export default GalleryViewItem
