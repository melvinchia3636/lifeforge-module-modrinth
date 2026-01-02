/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SetStateAction, useMemo } from 'react'
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates
} from 'shared'

export type SortTypes =
  | 'relevance'
  | 'downloads'
  | 'follows'
  | 'newest'
  | 'updated'

export type FilterReturnType = {
  page: number
  setPage: (page: number) => void
  viewMode: 'grid' | 'list' | 'gallery'
  setViewMode: (mode: 'grid' | 'list' | 'gallery') => void
  sortBy: SortTypes
  setSortBy: (sort: SortTypes) => void
  isFavouritesShowing: boolean
  setShowFavourites: (show: boolean) => void
  searchQuery: string
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
  const [coreFilters, setCoreFilters] = useQueryStates({
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    view: parseAsStringEnum(['grid', 'list', 'gallery']).withDefault('list'),
    sort: parseAsStringEnum([
      'relevance',
      'downloads',
      'follows',
      'newest',
      'updated'
    ]).withDefault('relevance'),
    favourites: parseAsBoolean.withDefault(false)
  })

  const [filter, setFilter] = useQueryStates(filterConfig)

  const updateFilter = (
    newValues: SetStateAction<Partial<Record<keyof typeof filter, any>>>
  ) => {
    setFilter(prev => ({
      ...prev,
      ...(typeof newValues === 'function' ? newValues(prev) : newValues)
    }))
    setCoreFilters({ page: 1 })
  }

  const memoizedValues = useMemo(() => {
    return {
      page: coreFilters.page,
      setPage: (page: SetStateAction<number>) => {
        setCoreFilters({
          page: typeof page === 'function' ? page(coreFilters.page) : page
        })
      },
      viewMode: coreFilters.view,
      setViewMode: (mode: SetStateAction<'grid' | 'list' | 'gallery'>) => {
        setCoreFilters({
          view: typeof mode === 'function' ? mode(coreFilters.view) : mode
        })
      },
      sortBy: coreFilters.sort,
      setSortBy: (sort: SetStateAction<SortTypes>) => {
        setCoreFilters({
          sort: typeof sort === 'function' ? sort(coreFilters.sort) : sort,
          page: 1
        })
      },
      isFavouritesShowing: coreFilters.favourites,
      setShowFavourites: (show: SetStateAction<boolean>) => {
        setCoreFilters({
          favourites:
            typeof show === 'function' ? show(coreFilters.favourites) : show,
          page: 1
        })
      },
      searchQuery: coreFilters.q,
      setSearchQuery: (query: SetStateAction<string>) => {
        setCoreFilters({
          q: typeof query === 'function' ? query(coreFilters.q) : query,
          page: 1
        })
      },
      ...filter,
      updateFilter
    } as FilterReturnType & {
      [key in keyof T]: T[key] extends { defaultValue: infer V } ? V : never
    }
  }, [
    coreFilters.page,
    coreFilters.view,
    coreFilters.sort,
    coreFilters.favourites,
    coreFilters.q,
    filter,
    setCoreFilters,
    setFilter
  ])

  return memoizedValues
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
    query: filter.searchQuery || '',
    version: filter.version || '',
    sort: filter.sortBy,
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
        'version',
        'environments',
        'projectType',
        'viewMode',
        'sortBy'
      ].includes(key)
    ) {
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
