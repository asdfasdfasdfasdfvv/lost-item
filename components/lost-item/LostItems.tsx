'use client'
import { useQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Suspense, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import type { LostItemResponse } from 'types/api/lost'

import LostItem from './LostItem'
import LostItemDetail from './LostItemDetail'

export default function LostItems() {
  const setModal = useSetRecoilState(modalContentState)
  const loader = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(0)
  const fetchMoreItems = () => {
    setPage((prev) => prev + 1)
  }

  const { isLoading, data, isPending } = useQuery<LostItemResponse>({
    queryKey: ['lostItemList'],
    queryFn: async () => {
      const result = await fetch('/v1/founds', { method: 'GET' })
      if (result.status === 200) {
        const { data } = await result.json()
        return data || {}
      }
      return {}
    }
  })

  const isIntersecting = useInfiniteScroll({
    target: loader,
    callback: fetchMoreItems
  })

  if (!data && isPending) {
    return <div>No Result</div>
  }
  const currentPageData = data

  const handleClickLostItem = (lostItemId: any) => {
    setModal(<LostItemDetail lostItemId={lostItemId} />)
  }

  return (
    <ul className="w-full max-w-80">
      <Suspense fallback={isLoading}>
        {currentPageData?.content.map(
          (
            { articleId, foundAt, locationName, productName, subject },
            _: number
          ) => (
            <LostItem
              key={articleId}
              lostDate={foundAt}
              lostPlace={locationName}
              title={productName}
              subject={subject}
              hanldeClickLostItem={() => handleClickLostItem(articleId)}
            />
          )
        )}
        <div ref={loader}>{isIntersecting && <p>Loading more items...</p>}</div>
      </Suspense>
    </ul>
  )
}
