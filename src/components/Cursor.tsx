import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorProps {
  className?: string
}

const Cursor: React.FC<CursorProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('cursor-pointer')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('cursor-pointer')) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-6 h-6 bg-primary-500 rounded-full pointer-events-none z-50 mix-blend-difference ${className}`}
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-primary-500 rounded-full pointer-events-none z-40"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.2 : 1,
          opacity: 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />

      {/* Click effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 border-2 border-primary-500 rounded-full pointer-events-none z-30"
          style={{
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  )
}

export default Cursor
