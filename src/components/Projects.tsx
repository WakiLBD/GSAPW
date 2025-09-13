import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersection } from '@hooks/useIntersection'
import { Project } from '@types'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsProps {
  className?: string
}

const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const projectsSection = useRef<HTMLElement>(null)
  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: true
  })

  const filters = [
    { id: 'all', name: 'All', icon: 'fas fa-layer-group' },
    { id: 'web', name: 'Web Apps', icon: 'fas fa-globe' },
    { id: 'bot', name: 'Bots', icon: 'fas fa-robot' },
    { id: 'automation', name: 'Automation', icon: 'fas fa-cogs' },
    { id: 'mobile', name: 'Mobile', icon: 'fas fa-mobile-alt' }
  ]

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with React and Node.js',
      longDescription: 'A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard. The platform is fully responsive and optimized for performance.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
      category: 'web',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Telegram Bot',
      description: 'Advanced Telegram bot with automation features',
      longDescription: 'A sophisticated Telegram bot built with Python that provides various automation features including file processing, scheduled messages, user management, and integration with external APIs. The bot handles thousands of users and processes various types of media.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Telegram API', 'Automation', 'Webhooks', 'PostgreSQL'],
      category: 'bot',
      liveUrl: 'https://t.me/example_bot',
      githubUrl: 'https://github.com/example',
      featured: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    {
      id: '3',
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with Vue.js',
      longDescription: 'A comprehensive analytics dashboard built with Vue.js featuring interactive charts, data visualization, and real-time reporting tools. The dashboard provides insights into user behavior, performance metrics, and business intelligence.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Chart.js', 'REST API', 'WebSockets', 'D3.js'],
      category: 'web',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '4',
      title: 'Workflow Automation',
      description: 'Business process automation system',
      longDescription: 'A comprehensive workflow automation system that streamlines business processes, reduces manual tasks, and improves efficiency across multiple departments. The system includes task scheduling, notification management, and integration with various business tools.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Automation', 'API Integration', 'Database', 'Docker'],
      category: 'automation',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'Modern portfolio website with GSAP animations',
      longDescription: 'A cutting-edge portfolio website built with React, TypeScript, and GSAP animations. Features include smooth scroll animations, interactive elements, responsive design, and modern UI/UX patterns. The website showcases professional work and skills.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
      category: 'web',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '6',
      title: 'Mobile App',
      description: 'Cross-platform mobile application',
      longDescription: 'A cross-platform mobile application built with React Native that provides a seamless user experience across iOS and Android devices. The app includes offline functionality, push notifications, and integration with various APIs.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Expo'],
      category: 'mobile',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    }
  ]

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  )

  useGSAP(() => {
    if (!inView) return

    // Animate project items
    gsap.fromTo('.project-item', 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsSection.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate filter buttons
    gsap.fromTo('.filter-btn', 
      { 
        y: 20, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.projects-filter',
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

  }, { scope: projectsSection, dependencies: [inView] })

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    
    // Animate filter change
    gsap.to('.project-item', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.project-item', {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power3.out"
        })
      }
    })
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

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

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "back.out(1.7)" }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.section
      ref={ref}
      id="projects"
      className={`projects py-32 bg-white dark:bg-gray-900 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header mb-16">
          <h2 className="section-title text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="section-subtitle text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Some of my recent work and side projects
          </p>
        </div>

        {/* Projects Filter */}
        <div className="projects-filter flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`filter-btn px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={filter.icon}></i>
              {filter.name}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-item bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Project Image */}
              <div className="project-image relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <i className="fas fa-image text-white text-4xl"></i>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex gap-4">
                    <motion.button
                      onClick={() => handleProjectClick(project)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-eye"></i>
                    </motion.button>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="project-info p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="technologies flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Links */}
                <div className="project-links flex gap-3">
                  <motion.button
                    onClick={() => handleProjectClick(project)}
                    className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-github"></i>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProject.description}
                    </p>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-times"></i>
                  </motion.button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Project Image */}
                <div className="mb-6">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-image text-white text-6xl"></i>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    About This Project
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Live Demo
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fab fa-github mr-2"></i>
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Projects
