import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersection } from '@hooks/useIntersection'

gsap.registerPlugin(TextPlugin, ScrollTrigger)

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: true
  })

  useGSAP(() => {
    if (!inView) return

    const tl = gsap.timeline({ delay: 0.5 })

    // Logo animation
    tl.fromTo(logoRef.current, 
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0
      },
      { 
        scale: 1, 
        rotation: 0,
        opacity: 1,
        duration: 1.2, 
        ease: "back.out(1.7)" 
      }
    )

    // Title animation with typewriter effect
    tl.fromTo(titleRef.current, 
      { 
        y: 100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6"
    )

    // Typewriter effect for title
    tl.to(titleRef.current, {
      text: "Wakil Ibne Amin",
      duration: 2,
      ease: "none"
    })

    // Subtitle animation
    tl.fromTo(subtitleRef.current, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.4"
    )

    // Tags animation
    tl.fromTo(tagsRef.current?.children, 
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power3.out" 
      }, "-=0.2"
    )

    // CTA buttons animation
    tl.fromTo(ctaRef.current?.children, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out" 
      }, "-=0.2"
    )

    // Scroll indicator animation
    tl.fromTo(scrollIndicatorRef.current, 
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power3.out" 
      }, "-=0.4"
    )

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, { scope: heroRef, dependencies: [inView] })

  const handleScrollToSection = (section: string) => {
    const element = document.querySelector(section)
    if (element) {
      const offsetTop = element.offsetTop - 80
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: offsetTop, autoKill: false },
        ease: "power2.inOut"
      })
    }
  }

  const heroVariants = {
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
    <motion.section
      ref={ref}
      id="home"
      className={`hero min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 ${className}`}
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.div
          ref={heroRef}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            ref={logoRef}
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-white font-bold text-5xl">W</span>
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-xl opacity-30 -z-10"></div>
              
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 w-40 h-40 border-2 border-primary-500/30 rounded-full -m-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Wakil Ibne Amin
            </span>
            <span className="block text-4xl md:text-6xl mt-4 text-gray-700 dark:text-gray-300">
              Frontend Developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Creating stunning digital experiences with modern technologies.
            <br />
            <span className="text-primary-500 font-semibold">
              Bot Development & Automation Expert
            </span>
          </motion.p>

          {/* Tags */}
          <motion.div
            ref={tagsRef}
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            {['React', 'Vue.js', 'Angular', 'TypeScript', 'Node.js', 'Python'].map((tag, index) => (
              <motion.span
                key={tag}
                className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderColor: "rgb(99, 102, 241)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => handleScrollToSection('#projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => handleScrollToSection('#contact')}
              className="group px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.button
          onClick={() => handleScrollToSection('#about')}
          className="w-12 h-12 border-2 border-primary-500 rounded-full flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default Hero
