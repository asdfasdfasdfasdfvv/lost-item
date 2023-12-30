'use client'
import { useQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'

import LostItem from './LostItem'

const pageSize = 10
export default function LostItems() {
  const [page] = useState(0)
  const { isLoading, data } = useQuery<any>({
    queryKey: ['lostItemList'],
    queryFn: async () => {
      const result = await fetch('/v1/lost/items/', { method: 'GET' })
      const { body } = await result.json()
      return body
    },
  })

  if (!data || data.length < 1) {
    return <div>No Result</div>
  }
  const currentPageData = data?.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <ul className="w-full max-w-80">
      <Suspense fallback={isLoading}>
        {currentPageData?.length < 1 ? (
          <div>No Result</div>
        ) : (
          currentPageData?.map(
            ({ id, lostDate, lostPlace, name, subject }: any, _: number) => (
              <LostItem
                key={id}
                lostDate={lostDate}
                lostPlace={lostPlace}
                title={name}
                subject={subject}
              />
            ),
          )
        )}
      </Suspense>
    </ul>
  )
}
