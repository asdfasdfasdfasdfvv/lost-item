'use client'
import { useQuery } from '@tanstack/react-query'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Suspense, useRef, useState } from 'react'

import LostItem from './LostItem'

const pageSize = 10
export default function LostItems() {
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
    },
  })

  const isIntersecting = useInfiniteScroll({
    target: loader,
    callback: fetchMoreItems,
  })

  const currentPageData = data?.slice(0, (page + 1) * pageSize)

  if (!data || currentPageData.length < 1) {
    return <div>No Result</div>
  }

  return (
    <ul className="w-full max-w-80">
      <Suspense fallback={isLoading}>
        {currentPageData.map(
          ({ id, lostDate, lostPlace, name, subject }: any, _: number) => (
            <LostItem
              key={id}
              lostDate={lostDate}
              lostPlace={lostPlace}
              title={name}
              subject={subject}
            />
          ),
        )}
        <div ref={loader}>{isIntersecting && <p>Loading more items...</p>}</div>
      </Suspense>
    </ul>
  )
}
