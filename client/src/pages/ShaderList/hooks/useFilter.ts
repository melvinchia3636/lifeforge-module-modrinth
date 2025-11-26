import useProjectFilter from '@/hooks/useProjectFilter'
import { parseAsString } from 'shared'

export default function useFilter() {
  return useProjectFilter({
    version: parseAsString.withDefault(''),
    loaders: parseAsString.withDefault(''),
    categories: parseAsString.withDefault(''),
    features: parseAsString.withDefault(''),
    performanceImpact: parseAsString.withDefault('')
  })
}
