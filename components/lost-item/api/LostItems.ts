import type { LostItemRequestType } from 'types/api/lost'
import { buildUrlWithParams } from 'utils/api'

import type { APIResponseType } from '../types'
import type { LostLocationResponseType } from '../types/options'

export const getLostItemList = async ({
  pageParam = 0,
  queryKey
}: {
  pageParam: number
  queryKey: (string | LostItemRequestType)[]
}) => {
  const searchParams = queryKey[1]

  const url = buildUrlWithParams('/v1/founds', {
    ...(searchParams as LostItemRequestType),
    page: pageParam
  })

  const result = await fetch(url)

  if (result.status === 200) {
    const { data } = await result.json()
    return data || null
  }
  return null
}

export const getLostLocationList = async () => {
  const res = await fetch(`v1/founds/searchKeywords`, {
    method: 'GET'
  })
  const { data }: APIResponseType<LostLocationResponseType> = await res.json()
  return data.locationList
}
