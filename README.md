The ITL Conference — Admin Dashboard (Next.js + Tailwind + MongoDB)

Modern, minimal protected admin dashboard with a unique design system.

## Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Add environment variables in `.env.local` at project root:
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=a-very-strong-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset
```

### 3. Seed the first admin account:
```bash
# With default credentials (admin@example.com / AdminPassword123!)
node scripts/seed-admin.js

# Or with custom credentials
node scripts/seed-admin.js your-email@example.com your-password "Your Name"
```

### 4. Start the dev server:
```bash
npm run dev
```

Visit **http://localhost:3000/admin-login** to sign in.

## Design System

**Colors:**
- **Primary (Violet)** - `primary-50` to `primary-950` — Main UI elements
- **Secondary (Emerald)** - `secondary-50` to `secondary-950` — Accents
- **Accent (Cyan)** - `accent-50` to `accent-950` — Highlights & CTAs
- **Success** (Green), **Warning** (Amber), **Danger** (Red) — Status indicators
- **Neutral** (Slate) — Text, backgrounds, borders

**Typography:**
- Headings: `h1`, `h2`, `h3`, `h4`
- Body: `body-lg`, `body`, `body-sm`
- Utilities: `caption`, `button`, `label`

## Architecture

- **`app/admin-login/`** — Public login page (split layout with conference photo)
- **`app/admin/`** — Protected admin dashboard with sidebar & header
- **`app/api/auth/`** — Auth endpoints (login, logout, me, register)
- **`lib/`** — MongoDB helpers, JWT auth, user management
- **`scripts/seed-admin.js`** — Create first admin account

## Notes

- Auth uses HttpOnly JWT cookies (secure by default).
- Client-side protection wrapper checks `/api/auth/me` before rendering protected pages.
- Minimal deps: `mongodb`, `bcryptjs`, `jsonwebtoken`.

## Production Checklist

- [ ] Use a strong `JWT_SECRET` (min 32 chars)
- [ ] Enable HTTPS (cookies marked Secure)
- [ ] Use environment-specific `MONGODB_URI`
- [ ] Restrict Cloudinary upload preset to allowed file types
- [ ] Consider server-side middleware for stricter protection

