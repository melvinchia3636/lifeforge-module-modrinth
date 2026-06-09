import { parseAsString } from 'nuqs'

import useProjectFilter from '@/hooks/useProjectFilter'

export default function useFilter() {
  return useProjectFilter({
    version: parseAsString.withDefault(''),
    categories: parseAsString.withDefault('')
  })
}
