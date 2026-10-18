# Lord Cleaning — House Cleaning Service Platform

## 1. Project Description
Lord Cleaning is a premium house cleaning marketplace that connects busy homeowners with vetted, professional cleaners. The platform serves three distinct user types:
- **Customers** — book recurring or one-time cleanings, manage appointments, leave reviews, pay online.
- **Cleaners** — manage availability, clock in/out for jobs, get paid for tracked hours.
- **Managers** — oversee bookings, payments, reviews, and the cleaner roster from an admin dashboard.

Brand positioning: clean, fresh, trustworthy, slightly upscale (not budget bargain feel).

## 2. Page Structure
- `/` — Marketing landing page
- `/services` — Detailed service catalog
- `/booking` — Multi-step booking flow (service → date/time → cleaner → address → confirm)
- `/login` & `/signup` — Auth pages (customer / cleaner / manager roles)
- `/account` — Customer dashboard (upcoming bookings, history, payments, reviews)
- `/cleaner` — Cleaner portal (schedule, clock in/out, earnings, profile)
- `/admin` — Manager dashboard (bookings, users, payments, reviews moderation)
- `/about`, `/contact`, `/faq` — Supporting pages

## 3. Core Features
- [ ] Landing page with services, pricing, social proof, CTA
- [ ] Booking flow with calendar + time-slot selection
- [ ] Cleaner discovery (browse, ratings, hourly rates)
- [ ] User auth (customer / cleaner / manager roles)
- [ ] Customer dashboard
- [ ] Cleaner clock in/out system
- [ ] Review & rating system (post-service)
- [ ] Payment processing (one-time + recurring)
- [ ] Admin dashboard with full oversight

## 4. Data Model (to be implemented when Supabase is connected)
- `profiles` — user accounts with role (customer / cleaner / manager)
- `services` — service types (deep clean, standard, move-out, etc.)
- `cleaners` — cleaner profile + hourly rate + availability
- `bookings` — service requests linking customer + cleaner + service
- `time_logs` — clock in/out entries
- `payments` — billing records
- `reviews` — ratings + comments

## 5. Backend / Third-party Integrations
- **Supabase** — accounts, database, RLS (connect in auth phase)
- **Stripe** — payment processing for bookings (connect in payment phase)
- **Shopify** — not needed
- Forms (newsletter, contact) — Readdy form service

## 6. Development Phase Plan

### Phase 1: Marketing Landing Page ← current
- Goal: a polished, conversion-focused landing page that introduces Lord Cleaning
- Deliverable: hero, services, how-it-works, pricing, cleaners team, testimonials, FAQ, CTA, footer
- No backend yet — uses mock data

### Phase 2: Booking Flow (frontend only)
- Goal: multi-step booking UI with calendar + cleaner selection
- Deliverable: `/booking` page + service catalog page

### Phase 3: Auth + Customer Dashboard
- Goal: Supabase-backed accounts, customer account area
- Deliverable: login/signup, `/account` dashboard

### Phase 4: Cleaner Portal
- Goal: cleaner schedule + clock in/out
- Deliverable: `/cleaner` portal

### Phase 5: Admin Panel
- Goal: management oversight
- Deliverable: `/admin` dashboard

### Phase 6: Payments
- Goal: Stripe checkout for bookings
- Deliverable: payment integration + billing history