import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from 'react-use'

export interface UseThemeReturn {
  theme: string
  toggleTheme: () => void
  setTheme: (theme: string) => void
  isDark: boolean
  isLight: boolean
}

export const useTheme = (): UseThemeReturn => {
  const [storedTheme, setStoredTheme] = useLocalStorage<string>('theme', 'light')
  const [theme, setThemeState] = useState<string>(storedTheme || 'light')

  const setTheme = useCallback((newTheme: string) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [setStoredTheme])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [theme, setTheme])

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', theme)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!storedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, storedTheme, setTheme])

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
