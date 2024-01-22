'use client'

import { useState } from 'react'
import type { LostItemRequestType } from 'types/api/lost'

import LostItems from '../lost-item/LostItems'
import SearchForm from './SearchForm'

export default function SearchClientSideWrapper() {
  const [searchParams, setSearchParams] = useState<LostItemRequestType>({
    page: 1
  })
  const updateSearchParams = (params: LostItemRequestType) => {
    setSearchParams(params)
  }
  return (
    <>
      <SearchForm updateSearchParams={updateSearchParams} />
      <LostItems searchParams={searchParams} />
    </>
  )
}
