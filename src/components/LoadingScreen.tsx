import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface LoadingScreenProps {
  className?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ className = '' }) => {
  const loadingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate loading elements
    const tl = gsap.timeline()

    // Logo animation
    tl.fromTo('.loading-logo', 
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0
      },
      { 
        scale: 1, 
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)" 
      }
    )

    // Text animation
    tl.fromTo('.loading-text', 
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.5"
    )

    // Progress bar animation
    tl.fromTo('.loading-progress', 
      { 
        width: 0 
      },
      { 
        width: "100%", 
        duration: 2, 
        ease: "power2.out" 
      }, "-=0.3"
    )

    // Floating animation for logo
    gsap.to('.loading-logo', {
      y: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, { scope: loadingRef })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      ref={loadingRef}
      className={`loading-screen fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          className="loading-logo mb-8"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-2xl mx-auto"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white font-bold text-3xl">W</span>
            </motion.div>
            
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 w-32 h-32 border-2 border-primary-500/30 rounded-full -m-4 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="loading-text mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Wakil Ibne Amin
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading amazing content...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="loading-progress-container w-64 mx-auto"
          variants={itemVariants}
        >
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="loading-progress h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          className="loading-dots flex justify-center space-x-2 mt-6"
          variants={itemVariants}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
