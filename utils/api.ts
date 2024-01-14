export function buildUrlWithParams(
  base: string,
  params: Record<
    string,
    string | undefined | number | Record<string, string | number>[]
  >
) {
  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== undefined
  )
  if (filteredParams.length === 0) return base

  const paramString = filteredParams
    .map(([key, value]) => {
      // 객체 배열 타입의 값을 처리합니다.
      if (Array.isArray(value)) {
        //sort=key:subject,direction:ASC
        return value
          .map(
            (obj) =>
              `${key}=${Object.values(obj)
                .map((value) => `${value}`)
                .join(',')}`
          )
          .join('&')
      } else if (typeof value === 'object' && value !== null) {
        // 단일 객체 타입의 값을 처리합니다.
        return `${key}=${Object.entries(value)
          .map(([subKey, subValue]) => `${subKey}:${subValue}`)
          .join(',')}`
      } else {
        // 기본적인 문자열/숫자 값 처리
        return `${key}=${value}`
      }
    })
    .join('&')

  return `${base}?${paramString}`
}

export function buildUrlWithPathParams(
  base: string,
  params: Record<
    string,
    string | number | undefined | Record<string, string | number>
  >
) {
  if (!params || Object.keys(params).length === 0) {
    return { url: base, error: new Error('No Params') }
  }

  let url = base

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      if (typeof value === 'object' && value !== null) {
        // 객체 타입의 값을 처리합니다.
        const compositeValue = Object.entries(value)
          .map(([subKey, subValue]) => `${subKey}:${subValue}`)
          .join(',')
        url = url.replace(`:${key}`, compositeValue)
      } else {
        // 기본적인 문자열/숫자 값 처리
        url = url.replace(`:${key}`, String(value))
      }
    }
  }

  return { url, error: null }
}
