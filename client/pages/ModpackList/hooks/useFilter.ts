import { parseAsString } from 'shared'

import useProjectFilter from '../../../hooks/useProjectFilter'

export default function useFilter() {
  return useProjectFilter({
    version: parseAsString.withDefault(''),
    loaders: parseAsString.withDefault(''),
    categories: parseAsString.withDefault(''),
    environments: parseAsString.withDefault('')
  })
}
