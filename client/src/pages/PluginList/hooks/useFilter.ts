import { parseAsString } from '@lifeforge/shared'

import useProjectFilter from '@/hooks/useProjectFilter'

export default function useFilter() {
  return useProjectFilter({
    categories: parseAsString.withDefault(''),
    version: parseAsString.withDefault(''),
    loaders: parseAsString.withDefault(''),
    platforms: parseAsString.withDefault('')
  })
}
