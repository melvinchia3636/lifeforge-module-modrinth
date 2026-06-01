import { parseAsString } from '@lifeforge/shared'

import useProjectFilter from '@/hooks/useProjectFilter'

export default function useFilter() {
  return useProjectFilter({
    version: parseAsString.withDefault(''),
    categories: parseAsString.withDefault(''),
    features: parseAsString.withDefault(''),
    resolutions: parseAsString.withDefault('')
  })
}
