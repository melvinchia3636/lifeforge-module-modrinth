import { ClientError } from '@functions/routes/utils/response'

import { API_ENDPOINT_V2, API_ENDPOINT_V3 } from '../constants/constants'

export default async function callModrinthAPI<T>(
  path: string,
  version: 'v2' | 'v3' = 'v2'
): Promise<T> {
  const response = await fetch(
    `${version === 'v2' ? API_ENDPOINT_V2 : API_ENDPOINT_V3}/${path}`
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new ClientError('Item not found', 404)
    }

    throw new Error('Failed to fetch Modrinth API data')
  }

  const data = await response.json()

  return data as T
}
