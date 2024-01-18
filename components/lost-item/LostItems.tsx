'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Fragment, Suspense, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import type { LostItemRequestType, LostItemResponse } from 'types/api/lost'
import { buildUrlWithParams } from 'utils/api'

import LostItem from './LostItem'
import LostItemDetail from './LostItemDetail'
import LostItemsSkeleton from './LostItemsSkeleton'

const getLostItemList = async ({ pageParam = 0 }) => {
  const url = buildUrlWithParams('/v1/founds', {
    page: pageParam
  })
  const result = await fetch(url)
  if (result.status === 200) {
    const { data } = await result.json()
    return data || {}
  }
}

export default function LostItems() {
  const setModal = useSetRecoilState(modalContentState)
  const loader = useRef<HTMLDivElement | null>(null)

  const [searchParams] = useState<LostItemRequestType>({
    size: 10
  })

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['lostItemList', searchParams],
      initialPageParam: 0,
      queryFn: getLostItemList,
      getNextPageParam: (lastPage: LostItemResponse) => {
        return !lastPage.last ? lastPage.number + 1 : lastPage.number
      }
    })

  useInfiniteScroll({
    target: loader,
    rootMargin: '500px',
    callback: () => {
      if (!isFetchingNextPage) {
        fetchNextPage()
      }
    }
  })

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
    <>
      <ul className="w-full max-w-80">
        <Suspense fallback={isLoading}>
          {data.pages.map((group: LostItemResponse, i) => (
            <Fragment key={i}>
              {group.content.map(
                ({
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
                    handleClickLostItem={() => handleClickLostItem(articleId)}
                  />
                )
              )}
            </Fragment>
          ))}
        </Suspense>
      </ul>
      {isFetchingNextPage ? <LostItemsSkeleton /> : <div ref={loader} />}
    </>
  )
}
