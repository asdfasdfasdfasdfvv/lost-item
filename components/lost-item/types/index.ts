export interface APIResponseType<T> {
  code: string
  message: string
  data: T
}
