import { useDebounce } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates
} from 'shared'

export type FilterReturnType = {
  page: number
  setPage: (page: number) => void
  viewMode: 'grid' | 'list' | 'gallery'
  setViewMode: (mode: 'grid' | 'list' | 'gallery') => void
  isFavouritesShowing: boolean
  setShowFavourites: (show: boolean) => void
  searchQuery: string
  debouncedSearchQuery: string
  setSearchQuery: (query: string) => void
  updateFilter: (
    newValues:
      | Partial<Record<string, any>>
      | ((prev: Record<string, any>) => Partial<Record<string, any>>)
  ) => void
} & Record<string, any>

export default function useProjectFilter<T extends Record<string, any>>(
  filterConfig: T
): FilterReturnType & {
  [key in keyof T]: T[key] extends { defaultValue: infer V } ? V : never
} {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const [viewMode, setViewMode] = useQueryState(
    'view',
    parseAsStringEnum(['grid', 'list', 'gallery']).withDefault('list')
  )

  const [isFavouritesShowing, setShowFavourites] = useQueryState(
    'favourites',
    parseAsBoolean.withDefault(false)
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const [filter, setFilter] = useQueryStates(filterConfig)

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
    viewMode,
    setViewMode,
    isFavouritesShowing,
    setShowFavourites,
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    ...filter,
    updateFilter
  } as FilterReturnType & {
    [key in keyof T]: T[key] extends { defaultValue: infer V } ? V : never
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

export function constructSearchParamsFromFilter(
  filter: FilterReturnType,
  projectType:
    | 'mod'
    | 'modpack'
    | 'shader'
    | 'resourcepack'
    | 'datapack'
    | 'plugin'
): Record<string, string> {
  const params: Record<string, string> = {
    page: String(filter.page),
    query: filter.debouncedSearchQuery || '',
    version: filter.version || '',
    projectType,
    environments: filter.environments || ''
  }

  Object.entries(filter).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      typeof value === 'string' &&
      ![
        'page',
        'searchQuery',
        'debouncedSearchQuery',
        'version',
        'environments',
        'projectType',
        'viewMode'
      ].includes(key)
    ) {
      console.log(key, value)
      params['categories'] = [
        ...(params['categories'] || '').split(',').filter(Boolean),
        value.split(',').filter(Boolean)
      ]
        .flat()
        .join(',')
    }
  })

  return params
}
