import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { usePromiseLoading } from '@lifeforge/shared'
import {
  Bordered,
  Box,
  Button,
  Flex,
  Text,
  colorWithOpacity,
  useModalStore
} from '@lifeforge/ui'

import ProjectIcon from '@/components/ProjectIcon'
import ProjectMetadata from '@/components/ProjectMetadata'
import ProjectTags from '@/components/ProjectTags'
import { forgeAPI } from '@/manifest'

import type { ProjectDetails } from '..'
import DownloadModal from './DownloadModal'

function Header({
  data,
  getIcon,
  getKey
}: {
  data: ProjectDetails
  getIcon: (key: string) => string
  getKey: (key: string) => string | undefined
}) {
  const queryClient = useQueryClient()

  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { open } = useModalStore()

  const isFavouriteQuery = useQuery(
    forgeAPI.favourites.checkItem
      .input({
        projectId: data.id
      })
      .queryOptions()
  )

  async function toggleFavourite() {
    const action = isFavouriteQuery.data ? 'remove' : 'add'

    try {
      await forgeAPI.favourites[`${action}Item`].mutate({
        projectId: data.id
      })

      queryClient.invalidateQueries({
        queryKey: ['melvinchia3636--modrinth', 'favourites']
      })
    } catch {
      toast.error('Failed to update favourites. Please try again.')
    }
  }

  const [loading, handleToggleFavourite] = usePromiseLoading(toggleFavourite)

  return (
    <Bordered
      asChild
      borderColor={{ base: 'bg-200', dark: colorWithOpacity('bg-700', '50%') }}
      borderSide="bottom"
      borderWidth="1px"
    >
      <Flex
        align={{ base: 'start', lg: 'center' }}
        as="header"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 'lg', lg: '2xl' }}
        mb="lg"
        mt="sm"
        pb="lg"
        width="100%"
      >
        <Flex direction={{ base: 'column', sm: 'row' }} gap="md" width="100%">
          <Flex gap="md">
            <ProjectIcon
              height={{ base: '6rem', sm: '8rem' }}
              iconUrl={data.icon_url}
              width={{ base: '6rem', sm: '8rem' }}
            />
            <Box display={{ base: 'block', sm: 'none' }}>
              <Text size="3xl" weight="semibold">
                {data.title}
              </Text>
              <Text color="muted" mt="sm">
                {data.description}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Box display={{ base: 'none', sm: 'block' }}>
              <Text as="h3" size="3xl" weight="semibold">
                {data.title}
              </Text>
              <Text as="p" color="muted" mt="sm">
                {data.description}
              </Text>
            </Box>
            <ProjectMetadata entry={data} />
            <ProjectTags
              categories={data.categories}
              getIcon={getIcon}
              getKey={getKey}
            />
          </Box>
        </Flex>
        <Flex align="center" gap="sm" width={{ base: '100%', lg: 'auto' }}>
          <Button
            icon="tabler:download"
            onClick={() => {
              open(DownloadModal, {
                slug: data.slug,
                name: data.title,
                getIcon,
                getKey
              })
            }}
          >
            {t('projectDetails.header.download')}
          </Button>
          <Button
            dangerous={isFavouriteQuery.data}
            icon={
              isFavouriteQuery.data ? 'tabler:heart-filled' : 'tabler:heart'
            }
            loading={isFavouriteQuery.isLoading || loading}
            namespace="apps.melvinchia3636$modrinth"
            variant={isFavouriteQuery.data ? 'plain' : 'secondary'}
            onClick={handleToggleFavourite}
          >
            {isFavouriteQuery.data && t('buttons.favourited')}
          </Button>
        </Flex>
      </Flex>
    </Bordered>
  )
}

export default Header
