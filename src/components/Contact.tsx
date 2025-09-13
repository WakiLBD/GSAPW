import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersection } from '@hooks/useIntersection'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  className?: string
}

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactSection = useRef<HTMLElement>(null)
  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: true
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactForm>()

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/M_B_F_W_a_K_i_L',
      icon: 'fab fa-telegram',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/MBF.WaKiL',
      icon: 'fab fa-facebook',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/WakiLBD',
      icon: 'fab fa-github',
      color: 'from-gray-700 to-gray-800'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/8801721144918',
      icon: 'fab fa-whatsapp',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~013d8d14aad22044c1?mp_source=share',
      icon: 'fab fa-upwork',
      color: 'from-green-600 to-green-700'
    },
    {
      name: 'LinkedIn',
      url: 'https://bd.linkedin.com/in/mbf-wakil-2053b7375',
      icon: 'fab fa-linkedin',
      color: 'from-blue-700 to-blue-800'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/mbf_WaKiL',
      icon: 'fab fa-x-twitter',
      color: 'from-gray-800 to-gray-900'
    }
  ]

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'wakil@example.com',
      link: 'mailto:wakil@example.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+880 1721 144918',
      link: 'tel:+8801721144918'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Bangladesh',
      link: '#'
    }
  ]

  useGSAP(() => {
    if (!inView) return

    // Animate contact items
    gsap.fromTo('.contact-item', 
      { 
        x: -50, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactSection.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate contact form
    gsap.fromTo('.contact-form', 
      { 
        x: 50, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.contact-form',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate social links
    gsap.fromTo('.social-link', 
      { 
        y: 30, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.social-links',
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

  }, { scope: contactSection, dependencies: [inView] })

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
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
    <motion.section
      ref={ref}
      id="contact"
      className={`contact py-32 bg-gray-50 dark:bg-gray-900 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header mb-16">
          <h2 className="section-title text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="section-subtitle text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's create something amazing together. I'm always interested in new opportunities and exciting projects.
          </p>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="contact-info space-y-8"
            variants={containerVariants}
          >
            {/* Contact Items */}
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                className="contact-item flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <a
                    href={item.link}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              className="social-links"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white`}>
                      <i className={social.icon}></i>
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send me a message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register('subject', { 
                    required: 'Subject is required',
                    minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                    errors.subject 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none ${
                    errors.message 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
