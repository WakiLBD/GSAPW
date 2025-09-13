// Global Types
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: 'web' | 'bot' | 'automation' | 'mobile'
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'design'
  icon: string
  description: string
  yearsOfExperience: number
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  technologies: string[]
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  gpa?: number
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

export interface Theme {
  name: 'light' | 'dark'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
}

export interface AnimationConfig {
  duration: number
  ease: string
  delay?: number
  stagger?: number
}

export interface GSAPAnimation {
  element: string | Element
  animation: gsap.TweenVars
  scrollTrigger?: ScrollTrigger.Vars
}

// Component Props Types
export interface NavbarProps {
  isScrolled?: boolean
  isMenuOpen?: boolean
  onMenuToggle?: () => void
}

export interface HeroProps {
  onScrollToSection?: (section: string) => void
}

export interface AboutProps {
  experiences?: Experience[]
  education?: Education[]
}

export interface SkillsProps {
  skills?: Skill[]
  onSkillFilter?: (category: string) => void
}

export interface ProjectsProps {
  projects?: Project[]
  onProjectSelect?: (project: Project) => void
}

export interface ContactProps {
  onSubmit?: (form: ContactForm) => Promise<void>
  socialLinks?: SocialLink[]
}

// Hook Types
export interface UseThemeReturn {
  theme: string
  toggleTheme: () => void
  setTheme: (theme: string) => void
}

export interface UseLoadingReturn {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export interface UseScrollReturn {
  scrollY: number
  scrollDirection: 'up' | 'down'
  isScrolled: boolean
}

export interface UseIntersectionReturn {
  ref: React.RefObject<HTMLElement>
  inView: boolean
  entry?: IntersectionObserverEntry
}

// Animation Types
export interface MotionVariants {
  hidden: any
  visible: any
  exit?: any
}

export interface ScrollAnimationConfig {
  trigger: string | Element
  start: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  snap?: boolean | number[]
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

// API Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Event Types
export interface CustomEvent<T = any> extends Event {
  detail: T
}

// SVG Types
export interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
  viewBox?: string
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: any) => string | null
  }
}

export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
}

// Accessibility Types
export interface A11yConfig {
  skipLinks: boolean
  focusManagement: boolean
  screenReaderSupport: boolean
  keyboardNavigation: boolean
  colorContrast: boolean
  reducedMotion: boolean
}
