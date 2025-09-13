<template>
  <section
    id="skills"
    class="skills py-32 bg-gray-50 dark:bg-gray-900"
    ref="skillsSection"
  >
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="section-header mb-16">
        <h2 class="section-title text-5xl font-bold mb-4">
          Skills & Expertise
        </h2>
        <p class="section-subtitle text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Technologies I work with to create amazing digital experiences
        </p>
      </div>

      <!-- Skills Categories -->
      <div class="skills-categories flex justify-center gap-4 mb-12 flex-wrap">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          :class="[
            'category-btn px-6 py-3 rounded-full font-medium transition-all duration-300',
            activeCategory === category.id
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500'
          ]"
        >
          <i :class="category.icon" class="mr-2"></i>
          {{ category.name }}
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="skill in filteredSkills"
          :key="skill.id"
          class="skill-item bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          :ref="`skill-${skill.id}`"
        >
          <!-- Skill Icon -->
          <div class="skill-icon w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 text-white text-2xl">
            <i :class="skill.icon"></i>
          </div>

          <!-- Skill Info -->
          <div class="skill-info">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ skill.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {{ skill.description }}
            </p>

            <!-- Skill Level -->
            <div class="skill-level mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Proficiency
                </span>
                <span class="text-sm font-bold text-primary-500">
                  {{ skill.level }}%
                </span>
              </div>
              <div class="skill-bar w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  class="skill-progress h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: skill.level + '%' }"
                  :ref="`progress-${skill.id}`"
                ></div>
              </div>
            </div>

            <!-- Experience -->
            <div class="experience flex items-center text-sm text-gray-500 dark:text-gray-400">
              <i class="fas fa-clock mr-2"></i>
              <span>{{ skill.yearsOfExperience }}+ years experience</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Summary -->
      <div class="skills-summary mt-16 text-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="stat in skillStats"
            :key="stat.label"
            class="stat-item bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div class="stat-icon w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-number text-3xl font-bold text-primary-500 mb-2">
              {{ stat.value }}
            </div>
            <div class="stat-label text-gray-600 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Props
interface Skill {
  id: string
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'design'
  icon: string
  description: string
  yearsOfExperience: number
}

interface Category {
  id: string
  name: string
  icon: string
}

// Reactive data
const skillsSection = ref<HTMLElement>()
const activeCategory = ref<string>('all')

const categories: Category[] = [
  { id: 'all', name: 'All', icon: 'fas fa-layer-group' },
  { id: 'frontend', name: 'Frontend', icon: 'fab fa-html5' },
  { id: 'backend', name: 'Backend', icon: 'fas fa-server' },
  { id: 'tools', name: 'Tools', icon: 'fas fa-tools' },
  { id: 'design', name: 'Design', icon: 'fas fa-palette' }
]

const skills: Skill[] = [
  // Frontend Skills
  {
    id: 'html',
    name: 'HTML5',
    level: 95,
    category: 'frontend',
    icon: 'fab fa-html5',
    description: 'Semantic markup and modern HTML5 features',
    yearsOfExperience: 3
  },
  {
    id: 'css',
    name: 'CSS3',
    level: 90,
    category: 'frontend',
    icon: 'fab fa-css3-alt',
    description: 'Advanced styling, animations, and responsive design',
    yearsOfExperience: 3
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    level: 88,
    category: 'frontend',
    icon: 'fab fa-js',
    description: 'ES6+, modern JavaScript features and best practices',
    yearsOfExperience: 3
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 85,
    category: 'frontend',
    icon: 'fab fa-js',
    description: 'Type-safe JavaScript development',
    yearsOfExperience: 2
  },
  {
    id: 'react',
    name: 'React',
    level: 90,
    category: 'frontend',
    icon: 'fab fa-react',
    description: 'Component-based UI development with hooks',
    yearsOfExperience: 2
  },
  {
    id: 'vue',
    name: 'Vue.js',
    level: 85,
    category: 'frontend',
    icon: 'fab fa-vue',
    description: 'Progressive framework for building UIs',
    yearsOfExperience: 2
  },
  {
    id: 'angular',
    name: 'Angular',
    level: 80,
    category: 'frontend',
    icon: 'fab fa-angular',
    description: 'Full-featured framework for enterprise apps',
    yearsOfExperience: 1
  },
  {
    id: 'sass',
    name: 'SASS/SCSS',
    level: 85,
    category: 'frontend',
    icon: 'fab fa-sass',
    description: 'CSS preprocessing and advanced styling',
    yearsOfExperience: 2
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    level: 90,
    category: 'frontend',
    icon: 'fas fa-paint-brush',
    description: 'Utility-first CSS framework',
    yearsOfExperience: 2
  },
  
  // Backend Skills
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 75,
    category: 'backend',
    icon: 'fab fa-node-js',
    description: 'Server-side JavaScript runtime',
    yearsOfExperience: 2
  },
  {
    id: 'python',
    name: 'Python',
    level: 70,
    category: 'backend',
    icon: 'fab fa-python',
    description: 'Backend development and automation',
    yearsOfExperience: 2
  },
  {
    id: 'express',
    name: 'Express.js',
    level: 75,
    category: 'backend',
    icon: 'fas fa-server',
    description: 'Web application framework for Node.js',
    yearsOfExperience: 2
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 70,
    category: 'backend',
    icon: 'fas fa-database',
    description: 'NoSQL database management',
    yearsOfExperience: 1
  },
  
  // Tools
  {
    id: 'git',
    name: 'Git',
    level: 85,
    category: 'tools',
    icon: 'fab fa-git-alt',
    description: 'Version control and collaboration',
    yearsOfExperience: 3
  },
  {
    id: 'github',
    name: 'GitHub',
    level: 85,
    category: 'tools',
    icon: 'fab fa-github',
    description: 'Code hosting and collaboration platform',
    yearsOfExperience: 3
  },
  {
    id: 'figma',
    name: 'Figma',
    level: 80,
    category: 'tools',
    icon: 'fab fa-figma',
    description: 'UI/UX design and prototyping',
    yearsOfExperience: 2
  },
  {
    id: 'vscode',
    name: 'VS Code',
    level: 90,
    category: 'tools',
    icon: 'fas fa-code',
    description: 'Code editor and development environment',
    yearsOfExperience: 3
  },
  {
    id: 'webpack',
    name: 'Webpack',
    level: 70,
    category: 'tools',
    icon: 'fas fa-cube',
    description: 'Module bundler and build tool',
    yearsOfExperience: 2
  },
  {
    id: 'vite',
    name: 'Vite',
    level: 80,
    category: 'tools',
    icon: 'fas fa-bolt',
    description: 'Fast build tool and dev server',
    yearsOfExperience: 1
  }
]

const skillStats = [
  {
    label: 'Technologies',
    value: '20+',
    icon: 'fas fa-code'
  },
  {
    label: 'Projects Completed',
    value: '50+',
    icon: 'fas fa-project-diagram'
  },
  {
    label: 'Years Experience',
    value: '3+',
    icon: 'fas fa-calendar-alt'
  }
]

// Computed properties
const filteredSkills = computed(() => {
  if (activeCategory.value === 'all') {
    return skills
  }
  return skills.filter(skill => skill.category === activeCategory.value)
})

// Methods
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

// Animations
const animateSkills = () => {
  if (!skillsSection.value) return

  // Animate skill items
  gsap.fromTo('.skill-item', 
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
        trigger: skillsSection.value,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  )

  // Animate skill progress bars
  gsap.utils.toArray('.skill-progress').forEach((progress: any) => {
    const width = progress.style.width
    progress.style.width = '0%'
    
    gsap.to(progress, {
      width: width,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: progress,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    })
  })

  // Animate stats
  gsap.fromTo('.stat-item', 
    { 
      y: 30, 
      opacity: 0 
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.skills-summary',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  )
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    animateSkills()
  })
})
</script>

<style scoped>
.skills {
  position: relative;
}

.skill-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.skill-progress {
  position: relative;
  overflow: hidden;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.category-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Dark mode adjustments */
.dark .skill-item {
  background: rgba(31, 41, 55, 0.8);
  border-color: rgba(75, 85, 99, 0.3);
}

.dark .category-btn {
  background: rgba(31, 41, 55, 0.8);
  border-color: rgba(75, 85, 99, 0.3);
}

.dark .stat-item {
  background: rgba(31, 41, 55, 0.8);
  border-color: rgba(75, 85, 99, 0.3);
}
</style>
