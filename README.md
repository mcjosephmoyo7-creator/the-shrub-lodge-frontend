# The Shrub Lodge — Website and Owner Dashboard

The public website is built with Next.js App Router, React, TypeScript, and the
existing Tailwind theme. It uses the Express backend and Supabase/PostgreSQL for
owner-managed content. The private owner dashboard is served at
`/lodge-owner-console`; it is not linked from public pages and requires a
server-validated admin session.

## Project structure

```text
shrub-lodge-next/
  Backend/
    database/cms-schema.sql       # Supabase CMS, admin, and message tables
    src/admin-auth.js             # Login, hashed sessions, CSRF, lockout
    src/admin-api.js              # Protected owner CRUD API
    src/public-api.js             # Published content and contact storage API
    src/create-admin.js           # One-time owner account creation
  Frontend/
    src/app/lodge-owner-console/  # Private login and dashboard
    src/app/api/admin/            # Same-origin, server-only admin proxy
    src/app/api/contact/          # Validated, rate-limited contact proxy
    src/app/works/                # Public portfolio and detail pages
    src/app/updates/              # Public news and detail pages
    src/components/cookie-consent.tsx
    src/lib/api/public-content.ts # CMS content loader and static fallbacks
```

The schema creates `admin_users`, `admin_sessions`, `site_content`, `works`,
`posts`, `media_assets`, `contact_messages`, and `activity_logs`, plus the
`site-media` Supabase Storage bucket. It also creates the login lockout function.
The backend uses the Supabase service key; the browser never receives it.

## Local setup

You need Node.js 20 or newer and a Supabase project.

### 1. Install and configure the backend

From the `shrub-lodge-next` directory in PowerShell:

```powershell
Set-Location .\Backend
npm install
Copy-Item .env.example .env
```

Edit `Backend\.env` and set:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-server-only-supabase-secret
ADMIN_API_PROXY_SECRET=your-random-admin-proxy-secret
CONTACT_API_PROXY_SECRET=your-different-random-contact-proxy-secret
```

Generate each proxy secret locally; use separate random values:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Never put either proxy secret or the Supabase secret in a `NEXT_PUBLIC_`
variable, source file, or browser code.

### 2. Create the CMS database

In the Supabase dashboard, open **SQL Editor**, paste the contents of
`Backend\database\cms-schema.sql`, and run it. This is a manual setup step; the
application does not run schema changes against your project automatically.

### 3. Create the first owner account

The first-admin form asks for your email and password. Passwords of any
non-zero length are supported and hashed before they are saved in Supabase;
use a long, randomly generated password for security. First-admin creation is
disabled once an admin account exists. Since signup has no setup key, create
your account before exposing the site publicly; another visitor could
otherwise claim the first account.

You can alternatively create the first account using the existing
`npm run create-admin` command in the backend.

### 4. Configure and run the website

In a second PowerShell terminal, from `shrub-lodge-next`:

```powershell
Set-Location .\Frontend
npm install
Copy-Item .env.example .env.local
```

Set these values in `Frontend\.env.local`:

```env
ADMIN_API_PROXY_SECRET=the-same-admin-secret-as-the-backend
CONTACT_API_PROXY_SECRET=the-same-contact-secret-as-the-backend
```

`ADMIN_API_PROXY_SECRET` must match the value in `Backend\.env`.

In development, the frontend defaults to the local backend at
`http://localhost:5000` when neither API URL variable is set. For deployments,
set `ADMIN_API_URL` to the backend URL (and optionally
`NEXT_PUBLIC_API_URL` for the public room API).

If you open the development site from another device on your LAN, update
`allowedDevOrigins` in `next.config.mjs` to that development machine's current
LAN IP address, then restart Next.js.

Optional:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` send contact
  notifications through Resend.
- Admin password resets use Resend from the backend. Configure its
  `RESEND_API_KEY` and verified `ADMIN_RESET_FROM_EMAIL` in the backend
  environment.
- `WEB3FORMS_ACCESS_KEY` sends contact notifications through Web3Forms.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` and `NEXT_PUBLIC_META_PIXEL_ID` configure
  optional scripts. They are not loaded unless the visitor consents to the
  matching analytics or marketing category.
- `GEMINI_API_KEY` enables the optional site assistant.

Start the backend and frontend in separate terminals:

```powershell
# Backend terminal, from Backend\
npm run dev

# Frontend terminal, from Frontend\
npm run dev
```

Open `http://localhost:3000`. To sign in as the owner, navigate directly to
`http://localhost:3000/lodge-owner-console/login`. If no admin exists, the page
offers first-account setup; otherwise sign in with the existing admin email and
password. Invalid or unauthenticated dashboard requests return
404; dashboard APIs require server-side authorization and CSRF validation.
Use **Reset it by email** on the sign-in page if you forget the password. Reset
emails require the backend Resend settings and a verified sender address.

## Updating content

After signing in, use the dashboard sidebar:

- **Overview** shows project, update, and unread-message counts.
- **Works** lets you add/edit, publish, reorder, and delete portfolio entries.
  Published items appear at `/works`; selecting one opens its detail page.
- **Site content** edits the homepage hero, about copy, feature cards, contact
  details, social links, testimonials, and footer text.
- **Posts** creates drafts, publishes immediately, or schedules news. Scheduled
  posts appear on `/updates` after their scheduled time.
- **Media** uploads validated image files to the public site-media bucket.
- **Messages** shows enquiries submitted through the public contact form.
- **Settings** changes the site title, logo URL, SEO title/description, and
  owner password.
- **Activity** records dashboard changes.

Content is rendered as React text rather than executable HTML. Use an HTTP or
HTTPS URL for logos, social links, project links, and images. Changes are read
from the CMS on each public request; bundled copy is used as a logged fallback
if the CMS API is temporarily unavailable.

## Public pages and cookies

- `/works` lists published work and filters it by category; `/works/[slug]` is
  the detail view.
- `/updates` lists published and due scheduled posts; `/updates/[slug]` shows a
  post.
- The cookie banner offers **Accept all**, **Reject non-essential**, and
  **Customize** (necessary, analytics, marketing). The footer's **Cookie
  settings** control reopens preferences. Necessary preferences are stored for
  180 days; Google Analytics and Meta Pixel are loaded only after their
  corresponding consent and only when configured.
- The Cookie Policy is at `/cookie-policy`; the Privacy Policy is at
  `/privacy-policy`.

## Deployment

1. Apply `Backend\database\cms-schema.sql` to the production Supabase project.
2. Deploy `Backend` as a Node service (the repository includes `render.yaml`).
   Set `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `ADMIN_API_PROXY_SECRET`,
   `CONTACT_API_PROXY_SECRET`, and `FRONTEND_URL` in the service environment.
3. Deploy `Frontend` to Vercel or another Next.js host. Set
   `NEXT_PUBLIC_API_URL` to the backend URL and set server-only
   `ADMIN_API_URL`, `ADMIN_API_PROXY_SECRET`, and `CONTACT_API_PROXY_SECRET`.
   Configure optional email and consent-gated analytics variables if wanted.
4. Configure the production frontend origin in the backend `FRONTEND_URL`, and
   use HTTPS for both deployed services.
5. Create the first production admin with `npm run create-admin` in the backend
   environment after the schema is applied. Keep the owner password private.

Admin sessions use an opaque backend token stored in an `httpOnly`, `Secure`,
`SameSite=Strict` cookie on the frontend domain. The Next.js server proxy keeps
the bearer token and proxy secret server-side. The secret URL and `noindex`
metadata are not the security boundary; server-side authorization is.

## Development checks

```powershell
npm run typecheck
npm run build
```

The frontend also contains bundled room data as a fallback for
`GET /api/rooms`; CMS-managed website content requires the backend and database
schema to be configured.
