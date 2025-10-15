# 🖤 Mubarak Charity - Modern Charity Website

A professional, fully responsive charity website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, donation management, and project tracking with Supabase backend integration.

![Mubarak Charity](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## ✨ Features

### 🎨 Design & UI
- **Modern, Professional Design** - Inspired by contemporary web design trends
- **Smooth Animations** - Using Motion (Framer Motion) for fluid transitions
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Fully Responsive** - Optimized for mobile, tablet, desktop, and ultrawide screens
- **Custom Components** - Reusable, modular component architecture

### 📄 Pages
- **Home Page** - Hero section with typewriter animation, featured projects, stats
- **Projects Page** - Grid layout showcasing all charity projects with search/filter
- **Donate Page** - Interactive donation form with impact levels and benefits
- **About Page** - Mission, vision, values, timeline, and team profiles
- **Contact Page** - Contact form, FAQ, social links, and office information

### 🎭 Animations & Effects
- Typewriter text animation (letter-by-letter typing/deleting)
- Floating decorative elements (circles, dots, geometric shapes)
- Smooth page transitions
- Hover effects and micro-interactions
- Progress bar animations with shimmer effects
- Scroll-triggered animations

### 🔧 Technical Features
- **Supabase Integration** - Backend for donations and contact forms
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Custom Hooks** - Reusable logic for state management
- **Optimized Performance** - Fast loading and smooth scrolling
- **SEO Ready** - Semantic HTML and optimized structure

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mubarak-charity-website.git
   cd mubarak-charity-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   - Create a free account at [Supabase](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key to the `.env` file
   - The database schema will be automatically set up by the application

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📦 Build for Production

### Build the project

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview the production build

```bash
npm run preview
```

---

## 🗂️ Project Structure

```
mubarak-charity-website/
├── App.tsx                          # Main application component
├── package.json                     # Project dependencies
├── README.md                        # This file
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
│
├── components/                      # Reusable React components
│   ├── Navbar.tsx                  # Navigation bar
│   ├── Footer.tsx                  # Footer component
│   ├── WhatsAppButton.tsx          # Floating WhatsApp button
│   ├── ProjectCard.tsx             # Project display card
│   ├── TeamCard.tsx                # Team member card
│   ├── DonationForm.tsx            # Donation form component
│   ├── ContactForm.tsx             # Contact form component
│   ├── TypewriterText.tsx          # Typewriter animation
│   ├── DecorativeElements.tsx      # Floating decorative elements
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Image component with fallback
│   └── ui/                         # ShadCN UI components
│
├── pages/                           # Page components
│   ├── HomePage.tsx                # Landing page
│   ├── ProjectsPage.tsx            # Projects listing
│   ├── DonatePage.tsx              # Donation page
│   ├── AboutPage.tsx               # About us page
│   └── ContactPage.tsx             # Contact page
│
├── styles/                          # Global styles
│   └── globals.css                 # Tailwind and custom CSS
│
├── supabase/                        # Supabase backend
│   └── functions/
│       └── server/
│           ├── index.tsx           # API routes
│           └── kv_store.tsx        # Key-value store utilities
│
└── utils/                           # Utility functions
    └── supabase/
        └── info.tsx                # Supabase configuration
```

---

## 🎨 Customization

### Colors

The website uses a navy blue and orange color scheme. To customize:

1. Edit `styles/globals.css` for global color variables
2. Update Tailwind classes in components:
   - Primary Orange: `#ff6f0f`
   - Secondary Orange: `#ff8f3f`
   - Navy Dark: `#0a1628`
   - Navy Medium: `#0f1c3f`
   - Navy Light: `#1a2f5f`

### Content

1. **Projects** - Update in `pages/HomePage.tsx` and `pages/ProjectsPage.tsx`
2. **Team Members** - Update in `pages/AboutPage.tsx`
3. **Contact Information** - Update in `components/Footer.tsx` and `pages/ContactPage.tsx`
4. **WhatsApp Number** - Update in `components/WhatsAppButton.tsx`

### Images

- All images use Unsplash by default
- Replace with your own images by updating the `src` prop in components
- Images are handled through `ImageWithFallback` component for better error handling

---

## 🔌 Backend Setup (Supabase)

### Database

The application uses Supabase's key-value store for:
- **Donation records** - Stored with prefix `donation:`
- **Contact messages** - Stored with prefix `contact:`

### API Endpoints

The backend server provides these endpoints:

- `POST /make-server-7613194e/donate` - Submit donation
- `POST /make-server-7613194e/contact` - Submit contact form
- `GET /make-server-7613194e/donations` - Retrieve all donations (admin)
- `GET /make-server-7613194e/contacts` - Retrieve all contact messages (admin)
- `GET /make-server-7613194e/health` - Health check

### Environment Variables

Required for production:
```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_database_url
```

---

## 📱 Features by Page

### Home Page
- Animated hero section with typewriter effect
- Featured projects with progress tracking
- Category cards (Health, Education, Community, Water)
- Impact statistics
- Call-to-action sections

### Projects Page
- All projects in grid layout
- Search and filter functionality (UI ready)
- Progress bars with fundraising goals
- "Learn More" buttons for each project

### Donate Page
- Preset donation amounts ($10, $25, $50, $100, $250, $500)
- Custom amount input
- One-time or monthly donation toggle
- Impact level descriptions
- Success animation with confetti effect

### About Page
- Organization story
- Mission and vision statements
- Core values with icons
- Timeline of milestones
- Team member profiles with hover effects

### Contact Page
- Contact form with validation
- Office hours and location
- Social media links
- FAQ section
- Map placeholder

---

## 🛠️ Development

### Code Style

- **TypeScript** for type safety
- **Functional components** with hooks
- **Tailwind CSS** for styling (no custom CSS classes)
- **Motion** for animations
- **ESLint** for code quality

### Best Practices

1. Use TypeScript interfaces for props
2. Keep components small and focused
3. Extract reusable logic into custom hooks
4. Use semantic HTML elements
5. Optimize images and assets
6. Follow accessibility guidelines

### Testing

```bash
# Run linter
npm run lint

# Type check
npm run build
```

---

## 🚨 Important Notes

### Payment Integration

⚠️ **This is a demo application.** The donation form does not process real payments. For production:

1. Integrate a payment processor like:
   - [Stripe](https://stripe.com)
   - [PayPal](https://paypal.com)
   - [Square](https://square.com)

2. Never store sensitive payment information in Supabase
3. Use proper PCI compliance standards
4. Implement proper security measures

### Security

- Never commit `.env` files to version control
- Keep Supabase service role key private
- Validate all user inputs on the backend
- Use rate limiting for API endpoints
- Implement CORS properly

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Unsplash** - For providing free stock images
- **Lucide** - For beautiful icons
- **Motion (Framer Motion)** - For smooth animations
- **Supabase** - For backend infrastructure
- **Tailwind CSS** - For utility-first styling
- **ShadCN UI** - For accessible component primitives

---

## 📞 Support

For questions or issues:
- **Email**: info@mubarakcharity.org
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/mubarak-charity-website/issues)
- **Documentation**: This README

---

## 🌟 Features Coming Soon

- [ ] Multi-language support (i18n)
- [ ] Admin dashboard for managing projects
- [ ] Email notifications for donations
- [ ] Volunteer registration system
- [ ] Blog/News section
- [ ] Newsletter subscription
- [ ] Social media feed integration
- [ ] Analytics dashboard

---

Made with 🖤 by the Mubarak Charity team

**Note**: Remember to update WhatsApp number, social media links, and contact information before deploying to production.
