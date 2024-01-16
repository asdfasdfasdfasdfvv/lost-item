export type SortInfo = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type Pageable = {
  pageNumber: number
  pageSize: number
  sort: SortInfo
  offset: number
  paged: boolean
  unpaged: boolean
}

export type Content = {
  id: number
  articleId: string
  state: 'Police' | 'Portal'
  color: string
  depositPlace: string
  locationCode: string
  locationName: string
  filePathImage: string
  productName: string
  subject: string
  serialNumber: string
  foundAt: string
  productClassification: string
}

export type LostItemResponse = {
  content: Content[]
  pageable: Pageable
  number: number
  sort: SortInfo
  size: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}
export type LostItemRequestType = {
  location?: string
  subject?: string
  classification?: string
  startDate?: string
  endDate?: string
  page?: number
  size?: number
  sort?: {
    key: string
    direction: 'ASC' | 'DESC'
  }[]
  offset?: number
}
