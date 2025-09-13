# Wakil Ibne Amin - Portfolio Website

A cutting-edge, visually stunning portfolio website built with React, TypeScript, Vue.js, Angular, GSAP, and modern web technologies.

## 🚀 Features

### 🎨 **Modern Design & Animations**
- **GSAP Animations**: Smooth, high-performance animations with ScrollTrigger
- **Framer Motion**: React-based motion library for micro-interactions
- **Custom SVG Animations**: Hand-crafted SVG illustrations and animations
- **Particle System**: Interactive particle background with canvas animations
- **Custom Cursor**: Animated cursor with hover effects

### 🛠 **Technology Stack**
- **React 18** with TypeScript for type safety
- **Vue.js 3** components for interactive elements
- **Angular** services for data management
- **GSAP** for advanced animations and scroll effects
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for React animations
- **React Hook Form** for form handling
- **React Query** for data fetching
- **Zustand** for state management

### 📱 **Responsive & Accessible**
- Fully responsive design for all devices
- Accessibility features (ARIA labels, keyboard navigation)
- Dark/Light mode toggle
- PWA support with service worker
- SEO optimized with meta tags

### 🎯 **Sections**
1. **Hero Section**: Animated logo reveal, typewriter effects, floating particles
2. **About Section**: Timeline, statistics, scroll-triggered animations
3. **Skills Section**: Interactive skill bars, category filtering, progress animations
4. **Projects Section**: Project grid with modals, filtering, hover effects
5. **Contact Section**: Animated form with validation, social media links
6. **Footer**: Clean design with smooth scroll effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WakiLBD/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation with mobile menu
│   ├── Hero.tsx        # Hero section with animations
│   ├── About.tsx       # About section with timeline
│   ├── Skills.vue      # Skills section (Vue.js)
│   ├── Projects.tsx    # Projects grid with modals
│   ├── Contact.tsx     # Contact form with validation
│   ├── Footer.tsx      # Footer with social links
│   ├── LoadingScreen.tsx
│   ├── ParticleBackground.tsx
│   └── Cursor.tsx
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme management
│   ├── useLoading.ts   # Loading state
│   ├── useScroll.ts    # Scroll detection
│   └── useIntersection.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── styles/             # Global styles
│   └── index.css
├── utils/              # Utility functions
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#6366f1', // Your primary color
  },
  secondary: {
    500: '#06b6d4', // Your secondary color
  }
}
```

### Content
- Update personal information in components
- Replace placeholder images with your own
- Modify social media links in Contact component
- Update project data in Projects component

### Animations
- Adjust GSAP animations in component files
- Modify Framer Motion variants
- Customize particle system in ParticleBackground

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 📱 PWA Features

- Service worker for offline functionality
- App manifest for installability
- Responsive design for mobile devices
- Fast loading with optimized assets

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Wakil Ibne Amin**
- Email: wakil@example.com
- Phone: +880 1721 144918
- Telegram: [@M_B_F_W_a_K_i_L](https://t.me/M_B_F_W_a_K_i_L)
- GitHub: [@WakiLBD](https://github.com/WakiLBD)
- LinkedIn: [mbf-wakil-2053b7375](https://bd.linkedin.com/in/mbf-wakil-2053b7375)

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for amazing animations
- [Framer Motion](https://www.framer.com/motion/) for React animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [React](https://reactjs.org/) for the amazing framework
- [Vue.js](https://vuejs.org/) for progressive framework
- [Angular](https://angular.io/) for full-featured framework

---

⭐ Star this repository if you found it helpful!
