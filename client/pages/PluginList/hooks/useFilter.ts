import useProjectFilter from '@/hooks/useProjectFilter'
import { parseAsString } from 'shared'

export default function useFilter() {
  return useProjectFilter({
    categories: parseAsString.withDefault(''),
    version: parseAsString.withDefault(''),
    loaders: parseAsString.withDefault(''),
    platforms: parseAsString.withDefault('')
  })
}
