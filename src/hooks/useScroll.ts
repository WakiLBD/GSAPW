import { useState, useEffect, useCallback } from 'react'
import { useThrottle } from 'react-use'

export interface UseScrollReturn {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | 'left' | 'right'
  isScrolled: boolean
  scrollProgress: number
  isAtTop: boolean
  isAtBottom: boolean
}

export const useScroll = (): UseScrollReturn => {
  const [scrollY, setScrollY] = useState<number>(0)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right'>('down')
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [lastScrollX, setLastScrollX] = useState<number>(0)

  const throttledScrollY = useThrottle(scrollY, 16) // ~60fps
  const throttledScrollX = useThrottle(scrollX, 16)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const currentScrollX = window.scrollX

    setScrollY(currentScrollY)
    setScrollX(currentScrollX)

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      setScrollDirection('down')
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection('up')
    }

    if (currentScrollX > lastScrollX) {
      setScrollDirection('right')
    } else if (currentScrollX < lastScrollX) {
      setScrollDirection('left')
    }

    setLastScrollY(currentScrollY)
    setLastScrollX(currentScrollX)
  }, [lastScrollY, lastScrollX])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isScrolled = throttledScrollY > 100
  const scrollProgress = Math.min(throttledScrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)
  const isAtTop = throttledScrollY === 0
  const isAtBottom = throttledScrollY >= document.documentElement.scrollHeight - window.innerHeight - 10

  return {
    scrollY: throttledScrollY,
    scrollX: throttledScrollX,
    scrollDirection,
    isScrolled,
    scrollProgress,
    isAtTop,
    isAtBottom
  }
}
