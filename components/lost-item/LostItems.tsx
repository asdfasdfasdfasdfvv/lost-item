'use client'
import { useQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Suspense, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import LostItem from './LostItem'
import LostItemDetail from './LostItemDetail'

const pageSize = 10
export default function LostItems() {
  const setModal = useSetRecoilState(modalContentState)
  const loader = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(0)
  const fetchMoreItems = () => {
    setPage((prev) => prev + 1)
  }

  const { isLoading, data } = useQuery<any>({
    queryKey: ['lostItemList'],
    queryFn: async () => {
      const result = await fetch('/v1/lost/items/', { method: 'GET' })
      const { body } = await result.json()
      return body
    }
  })

  const isIntersecting = useInfiniteScroll({
    target: loader,
    callback: fetchMoreItems
  })

  const currentPageData = data?.slice(0, (page + 1) * pageSize)

  if (!data || currentPageData.length < 1) {
    return <div>No Result</div>
  }

  const handleClickLostItem = (lostItemId: any) => {
    setModal(<LostItemDetail lostItemId={lostItemId} />)
  }

  return (
    <ul className="w-full max-w-80">
      <Suspense fallback={isLoading}>
        {currentPageData.map(
          (
            { articleId, lostDate, lostPlace, name, subject }: any,
            _: number
          ) => (
            <LostItem
              key={articleId}
              lostDate={lostDate}
              lostPlace={lostPlace}
              title={name}
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
