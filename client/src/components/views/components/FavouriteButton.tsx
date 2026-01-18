import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Button } from 'lifeforge-ui'
import { toast } from 'react-toastify'
import { usePromiseLoading } from 'shared'

import forgeAPI from '@/utils/forgeAPI'

function FavouriteButton({
  isFavourite,
  projectId,
  className
}: {
  isFavourite: boolean
  projectId: string
  className: string
}) {
  const queryClient = useQueryClient()

  async function toggleFavourite() {
    const action = isFavourite ? 'remove' : 'add'

    try {
      await forgeAPI.favourites[`${action}Item`].mutate({
        projectId
      })

      queryClient.invalidateQueries({ queryKey: ['modrinth', 'favourites'] })
    } catch {
      toast.error('Failed to update favourites. Please try again.')
    }
  }

  const [loading, handleToggleFavourite] = usePromiseLoading(toggleFavourite)

  return (
    <Button
      className={clsx('absolute', className)}
      icon={isFavourite ? 'tabler:heart-filled' : 'tabler:heart'}
      iconClassName={
        isFavourite
          ? 'text-red-500 group-hover:text-red-600! transition-all'
          : undefined
      }
      loading={loading}
      variant="plain"
      onClick={e => {
        e.stopPropagation()
        handleToggleFavourite()
      }}
    />
  )
}

export default FavouriteButton
