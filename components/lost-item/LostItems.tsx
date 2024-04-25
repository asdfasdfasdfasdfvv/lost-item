'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSetRecoilState } from 'recoil'
import type { LostItemRequestType, LostItemResponse } from 'types/api/lost'
import { buildUrlWithParams } from 'utils/api'

import ScrollLayout from '../layout/ScrollLayout'
import LostItem from './LostItem'
import LostItemDetail from './LostItemDetail'
import LostItemsSkeleton from './LostItemsSkeleton'

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

interface Props {
  searchParams: LostItemRequestType
}
export default function LostItems({ searchParams }: Props) {
  const setModal = useSetRecoilState(modalContentState)
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['lostItemList', searchParams],
      initialPageParam: 0,
      queryFn: getLostItemList,
      getNextPageParam: (lastPage: LostItemResponse) => {
        if (lastPage?.last || lastPage.content.length === 0) {
          return null
        }

        return lastPage.number + 1
      },
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    })
  const { ref, inView } = useInView({
    threshold: 0
  })
  useEffect(() => {
    console.log(inView)
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isLoading) {
    return <LostItemsSkeleton />
  }

  if (!data) {
    return <div>No Result</div>
  }

  const handleClickLostItem = (lostItemId: any) => {
    setModal(<LostItemDetail lostItemId={lostItemId} />)
  }

  return (
    <ScrollLayout>
      <ul className="relative box-border w-full">
        {data.pages.map((group: LostItemResponse, i) => (
          <Fragment key={i}>
            {group.content.map(
              ({
                id,
                articleId,
                foundAt,
                locationName,
                productName,
                subject,
                depositPlace
              }) => (
                <LostItem
                  key={articleId}
                  lostDate={foundAt}
                  lostPlace={locationName}
                  title={productName}
                  subject={subject}
                  depositPlace={depositPlace}
                  handleClickLostItem={() => handleClickLostItem(id)}
                />
              )
            )}
          </Fragment>
        ))}
      </ul>
      {isFetchingNextPage && !data ? <LostItemsSkeleton /> : <div ref={ref} />}
    </ScrollLayout>
  )
}
