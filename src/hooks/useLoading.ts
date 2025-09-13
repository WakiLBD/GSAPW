import { useState, useCallback } from 'react'

export interface UseLoadingReturn {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>
}

export const useLoading = (initialState: boolean = false): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading
  }
}
