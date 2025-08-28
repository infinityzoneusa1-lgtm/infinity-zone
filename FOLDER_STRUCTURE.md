# Infinity Zone - Folder Structure

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   │   └── page.tsx             # About page component
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── layout/                  # Layout components (Header, Footer)
│   │   ├── header.tsx           # Navigation header
│   │   └── footer.tsx           # Site footer
│   │
│   ├── home/                    # Home page specific components
│   │   ├── hero-section.tsx     # Hero banner
│   │   ├── product-showcase.tsx # Product display
│   │   ├── brands-section.tsx   # Brand showcase
│   │   ├── dibba-wealth-section.tsx # Dibba wealth info
│   │   ├── services-section.tsx # Services offered
│   │   ├── categories-section.tsx # Product categories
│   │   └── professionals-section.tsx # Team members
│   │
│   ├── shared/                  # Shared/reusable components
│   │   └── theme-provider.tsx   # Theme context provider
│   │
│   └── ui/                      # UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (other UI components)
│
├── lib/                         # Utility functions
│   └── utils.ts                 # Utility helpers
│
└── public/                      # Static assets
    ├── web-logo.png            # Site logo
    ├── header-bg.png           # Hero background
    ├── footer-bg.png           # Footer background
    └── ... (other images)
```

## 🎯 Component Organization

### Layout Components (`/components/layout/`)
- **Header**: Navigation, search, contact info
- **Footer**: Links, social media, contact details

### Home Page Components (`/components/home/`)
- **Hero Section**: Main banner with CTA
- **Product Showcase**: Featured products
- **Brands Section**: Partner brands
- **Dibba Wealth Section**: Business info
- **Services Section**: Services offered
- **Categories Section**: Product categories
- **Professionals Section**: Team members

### Shared Components (`/components/shared/`)
- **Theme Provider**: App-wide theming
- Reusable components across pages

### UI Components (`/components/ui/`)
- shadcn/ui components
- Basic UI primitives

## 📱 Responsive Design
All components are built with mobile-first responsive design:
- Mobile: `sm:` (640px+)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Large: `xl:` (1280px+)

## 🚀 Future Pages Structure
```
app/
├── about/           ✅ Created
├── services/        🔄 To be created
├── contact/         🔄 To be created
├── shop/           🔄 To be created
├── blog/           🔄 To be created
└── dashboard/      🔄 To be created
```

## 📝 Development Notes
- All components use TypeScript
- Styling with Tailwind CSS
- Icons from Lucide React
- UI components from shadcn/ui
- Images optimized with Next.js Image component
