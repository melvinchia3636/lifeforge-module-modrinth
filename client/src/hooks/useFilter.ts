import { useDebounce } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates
} from 'shared'

export default function useFilter() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const [filter, setFilter] = useQueryStates({
    version: parseAsString.withDefault(''),
    loaders: parseAsString.withDefault(''),
    categories: parseAsString.withDefault('')
  })

  const updateFilter = (
    newValues:
      | Partial<Record<keyof typeof filter, any>>
      | ((
          prev: Record<keyof typeof filter, any>
        ) => Partial<Record<keyof typeof filter, any>>)
  ) => {
    setFilter(prev => ({
      ...prev,
      ...(typeof newValues === 'function' ? newValues(prev) : newValues)
    }))
  }

  useEffect(() => {
    setPage(1)
  }, [filter, debouncedSearchQuery, setPage])

  return {
    page,
    setPage,
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    ...filter,
    updateFilter
  }
}

export function findInFilterList(
  filterValue: string,
  itemValue: string,
  config: {
    isNegation: boolean | undefined
    transformString: (str: string) => string
  }
): string | null {
  itemValue = config.transformString(itemValue)

  const filterArray = filterValue.split(',').filter(Boolean)

  if (filterArray.length === 0) {
    return null
  }

  return (
    filterArray.find(f =>
      config.isNegation === undefined
        ? f === itemValue || f === `!${itemValue}`
        : config.isNegation
          ? f === `!${itemValue}`
          : f === itemValue
    ) ?? null
  )
}

export function toggleInFilterList(
  filterValue: string,
  itemValue: string,
  config: {
    isNegation: boolean
    transformString: (str: string) => string
  }
): string {
  itemValue = config.transformString(itemValue)

  const targetValue = config.isNegation ? `!${itemValue}` : itemValue

  const filterArray = filterValue.split(',').filter(Boolean)

  const foundItem = findInFilterList(filterValue, itemValue, config)

  if (foundItem === null || foundItem !== targetValue) {
    return [
      ...filterArray.filter(e => ![`!${itemValue}`, itemValue].includes(e)),
      targetValue
    ].join(',')
  }

  return filterArray.filter(f => f !== foundItem).join(',')
}
