# Icon Embedded Controls - Industrial Equipment Website

A modern, responsive website showcasing industrial equipment and machinery manufactured by Icon Embedded Controls. Built with Next.js 14, React 19, and Tailwind CSS 4.

## 🌟 Features

### Core Features
- **📱 Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **🎨 Modern UI/UX** - Clean, professional design with smooth animations
- **🌓 Dark/Light Mode** - Theme toggle with persistent preferences
- **🔍 Product Search** - Advanced search functionality across products and models
- **📧 Contact Forms** - Integrated email system for enquiries
- **🗺️ SEO Optimized** - Complete meta tags, sitemap, and robots.txt
- **♿ Accessibility** - WCAG compliant with semantic HTML

### Product Features
- **Dynamic Product Pages** - Auto-generated from JSON data
- **Product Categories** - Organized product catalog with filtering
- **Model Variations** - Multiple models per product category
- **Detailed Specifications** - Expandable accordion sections for specs, features, and applications
- **Image Galleries** - High-resolution product images with optimization
- **PDF Brochures** - Downloadable product brochures
- **Enquiry System** - Product-specific enquiry forms

### Technical Features
- **Server Components** - Leveraging Next.js 14 App Router
- **Static Generation** - Pre-rendered pages for optimal performance
- **Image Optimization** - Next.js Image component with WebP support
- **Email Integration** - Nodemailer for form submissions
- **Content Management** - JSON-based content system
- **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16.0.7](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.23.24](https://www.framer.com/motion/)** - Animation library
- **[Swiper 12.0.3](https://swiperjs.com/)** - Modern slider component

### Backend & Tools
- **[Nodemailer 7.0.11](https://nodemailer.com/)** - Email sending
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

### Deployment
- **[Netlify](https://www.netlify.com/)** - Hosting and continuous deployment
- **[@netlify/plugin-nextjs](https://www.netlify.com/with/nextjs/)** - Next.js integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**
- **Git** ([Download](https://git-scm.com/))

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/embedded-icon.git
cd embedded-icon
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
# Email Configuration (Required for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
SMTP_FROM=your-email@gmail.com
COMPANY_EMAIL=your-email@gmail.com
COMPANY_NAME=Icon Embedded Controls
```

#### Setting up Gmail SMTP:
1. Enable 2-Step Verification on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an "App Password" for "Mail"
4. Use the 16-character password as `SMTP_PASSWORD`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
embedded-icon/
├── public/
│   ├── content/           # JSON content files
│   │   ├── home.json      # Homepage content
│   │   └── products.json  # Product catalog
│   ├── images/            # Product & brand images
│   │   ├── highres/       # High-resolution images
│   │   └── lowres/        # Optimized/thumbnail images
│   ├── brochures/         # PDF brochures
│   └── site_icon.svg      # Favicon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── about/         # About page
│   │   ├── api/           # API routes
│   │   │   └── send-email/ # Email sending endpoint
│   │   ├── contact/       # Contact page & form
│   │   ├── products/      # Products section
│   │   │   ├── [id]/      # Dynamic product pages
│   │   │   ├── enquiry/   # Product enquiry form
│   │   │   └── page.tsx   # Products listing
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   ├── globals.css    # Global styles
│   │   ├── robots.ts      # Robots.txt
│   │   └── sitemap.ts     # Sitemap.xml
│   ├── components/        # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── DynamicGrid.tsx
│   │   ├── ProductBenefits.tsx
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.tsx # Dark/Light mode
│   └── utils/             # Utility functions
│       └── productImages.ts
├── .env.example           # Environment template
├── .env.local             # Local environment (git-ignored)
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🎯 Development Workflow

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Adding New Products

Products are managed via JSON files in `public/content/products.json`:

```json
{
  "products": [
    {
      "id": "product-id",
      "title": "Product Name",
      "description": "Brief description",
      "subtitle": "Subtitle",
      "fullDescription": "Detailed description",
      "features": ["Feature 1", "Feature 2"],
      "specifications": {
        "spec1": "value1",
        "spec2": "value2"
      },
      "applications": ["Application 1", "Application 2"],
      "models": [
        {
          "model": "Model Name",
          "type": "Model Type",
          "description": "Model description",
          "features": [],
          "specifications": {},
          "applications": [],
          "images": ["/images/path/to/image.jpg"]
        }
      ],
      "images": ["/images/path/to/image.jpg"],
      "mainImage": "/images/path/to/main-image.jpg"
    }
  ]
}
```

### Adding Product Images

1. Place high-resolution images in `public/images/highres/[Category Name]/`
2. Place optimized images in `public/images/lowres/[Category Name]/`
3. Update image paths in `products.json`
4. Images are automatically optimized by Next.js Image component

### Theme Customization

Edit `src/app/globals.css` to modify colors and design tokens:

```css
:root {
  --background: #fff;
  --foreground: #000;
  --primary: #2563eb;
  --accent: #f59e0b;
  /* ... more variables */
}
```

## 🌐 Deployment

### Netlify Deployment

This project is configured for Netlify deployment with the `@netlify/plugin-nextjs` plugin.

#### Automatic Deployment (Recommended)

1. **Connect Repository**
   - Log in to [Netlify](https://app.netlify.com/)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Netlify will automatically deploy on every push to main branch

#### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Custom Domain Setup

1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Configure DNS settings as instructed
4. Enable HTTPS (automatic with Netlify)

## 📧 Email Configuration

The contact and enquiry forms use Nodemailer to send emails.

### Supported Email Providers

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Testing Email Setup

Run the provided PowerShell script:

```powershell
.\test-email-setup.ps1
```

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

**Problem:** `Module not found` errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem:** TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### Email Not Sending

**Problem:** Authentication failed
- Verify SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Check if 2FA is enabled on your email account

**Problem:** Connection timeout
- Verify SMTP_HOST and SMTP_PORT are correct
- Check firewall settings
- Try different ports (587 for TLS, 465 for SSL)

#### Images Not Loading

**Problem:** 404 errors for images
- Verify image paths in `products.json`
- Ensure images exist in `public/images/` directory
- Check file extensions match (jpg, png, svg)

#### JSON Parse Errors

**Problem:** "Unexpected token" in JSON
- Validate JSON syntax at [JSONLint](https://jsonlint.com/)
- Check for trailing commas
- Ensure proper escaping of special characters

### Performance Optimization

```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer .next/build-manifest.json

# Optimize images
# Use online tools or install sharp
npm install sharp
```

## 🎨 Customization Guide

### Changing Brand Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: #your-primary-color;
  --accent: #your-accent-color;
}
```

### Updating Company Information

Edit `src/app/layout.tsx` for meta tags and SEO:

```typescript
export const metadata: Metadata = {
  title: "Your Company Name",
  description: "Your company description",
  // ...
}
```

### Modifying Navigation

Edit `src/components/Navbar.tsx` to add/remove menu items.

### Custom Fonts

Update `src/app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- Environment variables are not committed to repository
- SMTP credentials are stored securely
- Form validation on client and server
- Rate limiting on API endpoints
- HTTPS enforced in production

## 📝 Content Updates

### Editing Homepage Content

Edit `public/content/home.json`:

```json
{
  "hero": {
    "title": "Your hero title",
    "subtitle": "Your subtitle"
  },
  "clients": [...],
  "benefits": [...]
}
```

### Adding Brochures

1. Place PDF files in `public/brochures/[Category]/`
2. Update brochure links in `src/app/products/[id]/page.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Icon Embedded Controls.

## 👥 Contact

**Icon Embedded Controls**
- Website: [iconembededcontrols.com](https://iconembededcontrols.com)
- Email: iconembedded@gmail.com
- Phone: +91 79045 86668
- Address: Coimbatore, Tamil Nadu, India

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and optimization tools
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Built with ❤️ using Next.js**
