import { useRef, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer'

export interface UseIntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  skip?: boolean
}

export interface UseIntersectionReturn {
  ref: React.RefObject<HTMLElement>
  inView: boolean
  entry?: IntersectionObserverEntry
  isIntersecting: boolean
  intersectionRatio: number
}

export const useIntersection = (options: UseIntersectionOptions = {}): UseIntersectionReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
    skip = false
  } = options

  const { ref, inView, entry } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
    skip
  })

  return {
    ref,
    inView,
    entry,
    isIntersecting: inView,
    intersectionRatio: entry?.intersectionRatio || 0
  }
}
