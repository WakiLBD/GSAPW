import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Navbar from '@components/Navbar'
import Hero from '@components/Hero'
import About from '@components/About'
import Skills from '@components/Skills'
import Projects from '@components/Projects'
import Contact from '@components/Contact'
import Footer from '@components/Footer'
import LoadingScreen from '@components/LoadingScreen'
import ParticleBackground from '@components/ParticleBackground'
import Cursor from '@components/Cursor'

// Hooks
import { useTheme } from '@hooks/useTheme'
import { useLoading } from '@hooks/useLoading'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const App: React.FC = () => {
  const { theme } = useTheme()
  const { isLoading, setLoading } = useLoading()

  useGSAP(() => {
    // Global GSAP configurations
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    })

    // Set default ease
    gsap.defaults({
      ease: "power2.out",
      duration: 0.8
    })

    // Initialize scroll trigger
    ScrollTrigger.config({
      ignoreMobileResize: true,
      syncRefresh: true,
    })

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setLoading])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Cursor />
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          
          <main className="relative">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              } />
            </Routes>
          </main>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
