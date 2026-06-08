import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { usePromiseLoading } from '@lifeforge/shared'
import { Button, type FlexProps } from '@lifeforge/ui'

import forgeAPI from '@/utils/forgeAPI'

function FavouriteButton({
  isFavourite,
  projectId,
  ...rest
}: {
  isFavourite: boolean
  projectId: string
} & Omit<FlexProps, 'onClick'>) {
  const queryClient = useQueryClient()

  async function toggleFavourite() {
    const action = isFavourite ? 'remove' : 'add'

    try {
      await forgeAPI.favourites[`${action}Item`].mutate({
        projectId
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
    <Button
      dangerous={isFavourite}
      icon={isFavourite ? 'tabler:heart-filled' : 'tabler:heart'}
      loading={loading}
      position="absolute"
      variant="plain"
      onClick={e => {
        e.stopPropagation()
        handleToggleFavourite()
      }}
      {...rest}
    />
  )
}

export default FavouriteButton
