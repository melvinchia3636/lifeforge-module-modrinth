import useProjectFilter from '@/hooks/useProjectFilter'
import { parseAsString } from 'shared'

export default function useFilter() {
  return useProjectFilter({
    version: parseAsString.withDefault(''),
    categories: parseAsString.withDefault(''),
    features: parseAsString.withDefault(''),
    resolutions: parseAsString.withDefault('')
  })
}