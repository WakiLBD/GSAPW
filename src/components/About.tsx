import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersection } from '@hooks/useIntersection'

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  className?: string
}

const About: React.FC<AboutProps> = ({ className = '' }) => {
  const aboutSection = useRef<HTMLElement>(null)
  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: true
  })

  const stats = [
    { number: 50, label: 'Projects Completed', icon: 'fas fa-project-diagram' },
    { number: 3, label: 'Years Experience', icon: 'fas fa-calendar-alt' },
    { number: 100, label: 'Happy Clients', icon: 'fas fa-users' }
  ]

  const experiences = [
    {
      year: '2024',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      description: 'Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.'
    },
    {
      year: '2023',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences.'
    },
    {
      year: '2022',
      title: 'Junior Developer',
      company: 'Startup Company',
      description: 'Started my journey in web development, learning modern frameworks and best practices.'
    }
  ]

  useGSAP(() => {
    if (!inView) return

    // Animate text blocks
    gsap.fromTo('.text-block', 
      { 
        x: -50, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutSection.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate stats
    gsap.fromTo('.stat-item', 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.stats-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate timeline items
    gsap.fromTo('.timeline-item', 
      { 
        x: 50, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.timeline',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate image
    gsap.fromTo('.about-image', 
      { 
        x: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-image',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

  }, { scope: aboutSection, dependencies: [inView] })

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
    <motion.section
      ref={ref}
      id="about"
      className={`about py-32 bg-white dark:bg-gray-900 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header mb-16">
          <h2 className="section-title text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="section-subtitle text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer crafting digital solutions
          </p>
        </div>

        <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* About Text */}
          <motion.div
            className="about-text space-y-8"
            variants={containerVariants}
          >
            <motion.div
              className="text-block"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary-500 mb-4">
                My Story
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a passionate Frontend Web Developer and Automation Expert with a deep love for creating innovative digital solutions. With expertise in modern web technologies, I specialize in building responsive, performant, and user-friendly applications that make a real impact.
              </p>
            </motion.div>

            <motion.div
              className="text-block"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary-500 mb-4">
                My Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To transform ideas into reality through clean code, creative design, and cutting-edge technology. I believe in the power of automation to streamline processes and enhance user experiences, making technology work for people, not against them.
              </p>
            </motion.div>

            <motion.div
              className="text-block"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary-500 mb-4">
                What I Do
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I create beautiful, functional websites and applications using the latest technologies. From concept to deployment, I ensure every project meets the highest standards of quality, performance, and user experience.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="stats-grid grid grid-cols-3 gap-6 mt-12"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {stat.number}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* About Image & Timeline */}
          <motion.div
            className="about-image space-y-8"
            variants={containerVariants}
          >
            {/* Profile Image */}
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <div className="w-full h-96 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/80 to-secondary-500/80"></div>
                <div className="relative z-10 text-center text-white">
                  <i className="fas fa-user text-8xl mb-4"></i>
                  <h4 className="text-2xl font-bold">Wakil Ibne Amin</h4>
                  <p className="text-lg opacity-90">Frontend Developer</p>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-500"></div>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              className="timeline"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Experience Timeline
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    className="timeline-item relative pl-8 border-l-2 border-primary-500"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-primary-500 bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full">
                          {exp.year}
                        </span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
