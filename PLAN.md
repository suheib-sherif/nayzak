# Nayzak - Arabic-First Car Sales Website for Libya

## Overview
Create an Arabic-first (RTL) car sales listing website for the Libyan market with:
- Public pages for browsing and viewing cars
- Admin dashboard for managing listings
- Supabase PostgreSQL database
- Supabase Storage for images
- Simple credentials authentication for admin

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with RTL support
- **Database:** Supabase PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 with credentials provider
- **Images:** Supabase Storage
- **UI:** Lucide icons, react-hook-form, zod validation

## Database Schema

### User (Admin)
- id, email, passwordHash, name, role, createdAt, updatedAt

### CarListing
- id, title, make, model, year, price, priceNegotiable
- mileage, fuelType, transmission, bodyType, condition, color
- city, description, contactPhone, contactWhatsApp
- featured, status (DRAFT/PUBLISHED/SOLD), views
- createdAt, updatedAt, publishedAt, userId

### CarImage
- id, url, alt, order, isPrimary, carListingId, createdAt

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # RTL root layout with Arabic font
│   ├── page.tsx                # Homepage with featured cars
│   ├── (public)/
│   │   ├── cars/
│   │   │   ├── page.tsx        # Car listings with filters
│   │   │   └── [id]/page.tsx   # Car detail page
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Dashboard overview
│   │   └── cars/
│   │       ├── page.tsx        # Manage listings
│   │       ├── new/page.tsx    # Create listing
│   │       └── [id]/edit/page.tsx
│   ├── auth/login/page.tsx     # Admin login
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── cars/route.ts       # GET, POST
│       ├── cars/[id]/route.ts  # GET, PUT, DELETE
│       └── upload/route.ts     # Image upload
├── components/
│   ├── ui/                     # Button, Input, Card, etc.
│   ├── layout/                 # Header, Footer, AdminSidebar
│   ├── cars/                   # CarCard, CarGrid, CarFilters, CarGallery
│   └── forms/                  # CarForm, ImageUpload, LoginForm
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # NextAuth config
│   ├── supabase.ts            # Supabase client
│   ├── utils.ts               # cn(), formatPrice()
│   └── validators.ts          # Zod schemas
└── constants/
    ├── cities.ts              # Libyan cities
    └── car-options.ts         # Makes, fuel types, etc.
prisma/
├── schema.prisma
└── seed.ts                    # Seed cities & car makes
```

## Implementation Phases

### Phase 1: Foundation
1. Install dependencies (prisma, next-auth, supabase, react-hook-form, zod, lucide-react)
2. Set up Prisma schema and connect to Supabase
3. Configure RTL in root layout with Cairo Arabic font
4. Create base UI components (Button, Input, Card, Select)
5. Add utility functions (cn, formatPrice)
6. Seed Libyan cities and popular car makes

### Phase 2: Authentication & Admin Layout
1. Configure NextAuth with credentials provider
2. Create login page and form
3. Set up middleware to protect /admin routes
4. Build admin layout with Arabic sidebar navigation
5. Create admin dashboard overview

### Phase 3: Image Upload System
1. Configure Supabase Storage bucket
2. Create upload API endpoint
3. Build ImageUpload component with drag-and-drop
4. Configure Next.js image domains

### Phase 4: Admin CRUD Operations
1. Build car listing form with all fields
2. Create admin cars list page with actions
3. Implement create/edit/delete functionality
4. Add form validation with Zod
5. Add toast notifications

### Phase 5: Public Pages
1. Create public layout with header/footer
2. Build homepage with featured cars section
3. Create car listings page with filters (city, price, make, year)
4. Build car detail page with image gallery
5. Add WhatsApp contact integration
6. Implement pagination

### Phase 6: Polish
1. Mobile responsive optimization
2. Loading states and skeletons
3. SEO metadata for all pages
4. Error handling and empty states

## Key Arabic/Libyan Features
- RTL layout using `dir="rtl"` and Tailwind logical properties (ps-, pe-, ms-, me-)
- Cairo font for Arabic typography
- Price display in Libyan Dinar (د.ل)
- Libyan cities dropdown (Tripoli, Benghazi, Misrata, etc.)
- Popular car makes in Arabic (تويوتا، هيونداي، كيا، etc.)
- WhatsApp contact integration

## Environment Variables Needed
```
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Verification
1. Run `npm run dev` and verify RTL layout displays correctly
2. Create admin account and test login flow
3. Add a car listing with images via admin dashboard
4. Verify listing appears on public pages with correct Arabic formatting
5. Test filters and search functionality
6. Test WhatsApp contact button
7. Verify mobile responsiveness
8. Deploy to Vercel and test production build
