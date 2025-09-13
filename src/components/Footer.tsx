import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersection } from '@hooks/useIntersection'

gsap.registerPlugin(ScrollTrigger)

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const footerRef = useRef<HTMLElement>(null)
  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: true
  })

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/M_B_F_W_a_K_i_L',
      icon: 'fab fa-telegram',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/WakiLBD',
      icon: 'fab fa-github',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://bd.linkedin.com/in/mbf-wakil-2053b7375',
      icon: 'fab fa-linkedin',
      color: 'hover:text-blue-600'
    }
  ]

  useGSAP(() => {
    if (!inView) return

    // Animate footer content
    gsap.fromTo('.footer-content', 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate footer items
    gsap.fromTo('.footer-item', 
      { 
        y: 30, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

  }, { scope: footerRef, dependencies: [inView] })

  const handleScrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut"
    })
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: offsetTop, autoKill: false },
        ease: "power2.inOut"
      })
    }
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

  return (
    <motion.footer
      ref={ref}
      className={`footer bg-gray-900 text-white py-16 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={footerRef}
          className="footer-content"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo & Description */}
            <motion.div
              className="footer-item"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold">Wakil Ibne Amin</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Frontend Developer & Automation Expert creating stunning digital experiences with modern technologies.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-colors duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="footer-item"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-item"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-primary-500"></i>
                  <span className="text-gray-400">wakil@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-primary-500"></i>
                  <span className="text-gray-400">+880 1721 144918</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-primary-500"></i>
                  <span className="text-gray-400">Bangladesh</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="footer-bottom border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
            variants={itemVariants}
          >
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 Wakil Ibne Amin. All rights reserved.
            </div>
            
            <motion.button
              onClick={handleScrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">Back to top</span>
              <motion.div
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                whileHover={{ y: -2 }}
              >
                <i className="fas fa-chevron-up text-xs"></i>
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
