// useInfiniteScroll.ts
import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'utils/timing'

interface UseInfiniteScrollProps {
  target: RefObject<HTMLDivElement | null> // or HTMLElement, depending on your use case
  parent?: Element | null // Parent element for the Intersection Observer
  threshold?: number // Threshold for the Intersection Observer
  rootMargin?: string // Root margin for the Intersection Observer
  callback: () => void // Callback function to be called when the target is intersecting
}

const useInfiniteScroll = ({
  target,
  parent = null,
  threshold = 0.1,
  rootMargin = '0px',
  callback
}: UseInfiniteScrollProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const throttledCallback = useRef(throttle(callback, 100)).current
  useEffect(() => {
    if (target && !target.current) {
      return
    }
    const opts: IntersectionObserverInit = {
      root: parent,
      rootMargin,
      threshold
    }
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        throttledCallback()
      } else {
        setIsIntersecting(false)
      }
    }, opts)

    if (target.current) {
      observer.current.observe(target.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [target, parent, threshold, rootMargin, callback])

  return isIntersecting
}

export default useInfiniteScroll
