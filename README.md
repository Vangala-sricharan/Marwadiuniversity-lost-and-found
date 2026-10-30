# CampusFind — Marwadi University Lost & Found Portal

An official, student-facing Lost & Found web portal engineered specifically for **Marwadi University (Rajkot, Gujarat)**. CampusFind provides a frictionless, zero-barrier platform for students, faculty, and campus staff to report misplaced belongings, log found items, receive an automatic 12-digit registration token, and track report status in real time.

---

## 1. Project Overview

On a bustling 32+ acre university campus with multiple academic towers, engineering labs, central libraries, and sports facilities, thousands of students misplace everyday personal belongings—ranging from student ID badges and scientific calculators to laptop chargers, hostel keys, and eyeglasses.

Traditional physical notice boards or informal WhatsApp groups lead to communication gaps, repetitive inquiries at security gates, and delayed recoveries. **CampusFind** replaces this friction with an immediate, client-side web application that requires **no login**, **no registration**, and **no administrative overhead**.

---

## 2. Problem Statement

* **Fragmented Reporting**: Misplaced items are scattered across cafeteria counters, lab workstations, library reading desks, and security booths without a unified register.
* **Authentication Friction**: Requiring students to create accounts or remember passwords causes high abandonment when they simply want to report a lost or found item quickly between lectures.
* **Lack of Unique Tracking**: Physical registries lack verifiable reference IDs that students can quote when visiting security desks to claim high-value items.
* **Coordination Delays**: Misplaced student identity cards and course essentials often take weeks to find their rightful owners.

---

## 3. Objectives

* **Zero-Friction Access**: Allow any student, faculty member, or staff member to file a report directly in under 60 seconds.
* **Verifiable Token Generation**: Automatically assign a deterministic 12-digit registration token formatted as `DDMMYYYYHHmm` based on the exact local submission timestamp.
* **Campus Zone Tagging**: Map every item to standard Marwadi University landmarks (MB Building, Academic Block, Classroom, Library, Hostel, Cafeteria, Sports Ground, Parking Area, or custom location).
* **Safe Handover Protocol**: Direct students to the centralized on-campus collection point (**MB315, Marwadi University**) and security checkpoints for verified physical recovery.
* **Transparent Tracking**: Provide a real-time status lookup using the 12-digit token without exposing unnecessary student personal information.

---

## 4. Key Features

* **Homepage & Campus Showcase**:
  * Hero banner utilizing authentic Marwadi University architectural photography.
  * Interactive campus showcase featuring the Main Academic Complex, PG Research Wing, Central Library, Open-Air Amphitheatre, Auditorium, and Student Food Court.
  * Live campus bulletin displaying recently reported items with search and category filters.
  * 3-step workflow guide (*Submit in 60s*, *Campus Directory Sync*, *Safe Verification*).

* **Report Lost Item (`/report-lost`)**:
  * Comprehensive form: Student name, item name, category, detailed description, location selector with suggestions, date lost, approximate time lost, contact phone/email, and optional photo upload with live preview and removal.
  * Inline validation with field error indicators.
  * Automatic 12-digit token generation and collision prevention.

* **Report Found Item (`/report-found`)**:
  * Responsible citizen logging form capturing item traits, condition, exact discovery location, date/time, and current custody status (e.g., *In Finder Care*, *Deposited at MB315*, *At Security Gate*).

* **Submission Confirmation (`/submission-success`)**:
  * Celebratory and clean confirmation displaying *"Thank You!"* and *"Your report has been successfully registered with CampusFind."*
  * Prominent 12-digit token badge with one-click **Copy Token** functionality.
  * Summary card with item title, type, location, and submission timestamp.
  * Critical campus instruction: *"For further details, please visit MB315, Marwadi University."*
  * Quick links to **Track Report** and **Back to Home**.

* **Report Tracking (`/track`)**:
  * Token lookup engine validating the exact 12-digit format.
  * Displays item title, category, report type, location, contact, and current status (`"Submitted"`).
  * Exact fallback message for non-existent tokens: *"No report found with this registration token. Please check your token and try again."*

* **Public Directory & Campus Guide (`/browse`, `/campus-guide`)**:
  * Searchable campus archive with keyword search and category filters.
  * Detailed directory of campus collection desks with operating hours, phone extensions, and student verification checklist.

---

## 5. Technology Stack

* **Frontend Framework**: React 19 (Functional components, custom hooks, modular state)
* **Build Tool & Dev Server**: Vite 8 with ESNext compilation
* **Routing**: React Router DOM 7 (Client-side SPA with scroll-to-top on route change)
* **Styling & Design System**: Tailwind CSS 4 with custom university palette:
  * Deep Navy Blue (`#0F2347`, `#0A1A2F`)
  * University Teal (`#0D9488`, `#0E7490`)
  * Cyan Accents (`#06B6D4`, `#22D3EE`)
  * Light Blue-Gray Surfaces (`#F8FAFC`, `#F1F5F9`)
* **Iconography**: Lucide React
* **Persistence**: Centralized browser LocalStorage (`campusfind_reports_v2`)
* **Typography**: Plus Jakarta Sans & Inter via Google Fonts

---

## 6. Project Folder Structure

```
campusfind/
├── public/
│   ├── images/
│   │   ├── college/
│   │   │   ├── marwadi-main-building.jpg     # Hero & central campus landmark
│   │   │   ├── marwadi-pg-building.jpg       # PG & Research complex
│   │   │   ├── marwadi-library.jpg           # Central university library
│   │   │   ├── marwadi-auditorium.jpg        # Grand auditorium
│   │   │   ├── marwadi-amphitheatre.jpg      # Open-air amphitheatre
│   │   │   ├── marwadi-cafeteria.jpg         # Food court & amenities block
│   │   │   └── marwadi-advance-lab.jpg       # High-tech engineering lab
│   │   ├── logo/
│   │   │   ├── campusfind-logo.svg           # Official CampusFind brandmark
│   │   │   ├── marwadi-university-logo.svg   # Official university vector logo
│   │   │   └── marwadi-university-logo.png   # Fallback raster logo
│   │   ├── categories/                       # Category vector icons
│   │   │   ├── electronics.svg
│   │   │   ├── id-cards.svg
│   │   │   ├── books-stationery.svg
│   │   │   ├── bags-wallets.svg
│   │   │   ├── keys-access.svg
│   │   │   └── personal-items.svg
│   │   └── placeholders/                     # Visual placeholders & animations
│   │       ├── item-placeholder.svg
│   │       ├── upload-placeholder.svg
│   │       └── radar-pulse.gif
│   ├── favicon.ico
├── src/
│   ├── config/
│   │   └── imageAssets.js                    # Centralized image paths & location suggestions
│   ├── layouts/
│   │   ├── Navbar.jsx                        # Responsive navbar with mobile drawer
│   │   └── Footer.jsx                        # University footer with desk info & links
│   ├── components/
│   │   ├── HeroSection.jsx                   # Full-screen hero with supplied photo
│   │   ├── CategoriesSection.jsx             # Category quick-filter cards
│   │   ├── RecentItems.jsx                   # Live reported items bulletin
│   │   ├── CampusShowcase.jsx                # Landmark cards with lightbox view
│   │   ├── HowItWorks.jsx                    # 3-step workflow cards
│   │   ├── Features.jsx                      # Four core feature highlights
│   │   ├── CampusGallery.jsx                 # Filterable authentic campus gallery
│   │   ├── ItemCard.jsx                      # Standardized lost/found item card
│   │   └── ItemDetailModal.jsx               # Detail modal with MB315 instructions
│   ├── pages/
│   │   ├── HomePage.jsx                      # Landing page
│   │   ├── ReportLostPage.jsx                # Form A: Report Lost Item
│   │   ├── ReportFoundPage.jsx               # Form B: Report Found Item
│   │   ├── TrackReportPage.jsx               # 12-digit token tracking portal
│   │   ├── SubmissionSuccessPage.jsx         # Post-submission confirmation page
│   │   ├── BrowseItemsPage.jsx               # Public searchable directory
│   │   ├── CampusGuidePage.jsx               # Collection hubs & claiming checklist
│   │   ├── TermsPage.jsx                     # Terms & conditions & prototype disclaimer
│   │   └── FAQPage.jsx                       # Searchable accordion FAQ page
│   ├── services/
│   │   └── storage.js                        # Centralized LocalStorage service & seed data
│   ├── utils/
│   │   └── tokenGenerator.js                 # 12-digit DDMMYYYYHHmm token utility
│   ├── App.tsx                               # Router configuration
│   ├── index.css                             # Tailwind CSS & custom scrollbar
│   └── main.tsx                              # React root entry
├── index.html                                # SEO meta tags, OpenGraph, JSON-LD
├── metadata.json                             # AI Studio applet configuration
├── vercel.json                               # Vercel SPA rewrite rules
├── package.json                              # Project dependencies & scripts
├── tsconfig.json                             # TypeScript compiler configuration
└── vite.config.ts                            # Vite build & alias settings
```

---

## 7. Token Generation Engine

Registration tokens serve as the primary lookup and custody reference.

### Format Specification
```
DDMMYYYYHHmm (Exactly 12 Numeric Digits)
```

| Component | Format | Range | Example |
|---|---|---|---|
| Day | `DD` | `01`–`31` | `30` |
| Month | `MM` | `01`–`12` | `10` |
| Year | `YYYY` | 4 Digits | `2026` |
| Hours | `HH` | `00`–`23` (24-hour time) | `20` |
| Minutes | `mm` | `00`–`59` | `17` |

**Resulting Token**: `301020262017`

### Deterministic Generation Rules:
1. Computed at the exact moment of successful form validation using the client's local system time.
2. Formatted with strict zero-padding to guarantee exactly 12 digits.
3. No manual editing or random strings allowed.
4. **Collision Detection**: If two submissions occur within the exact same minute, the storage utility detects the collision and prompts the user:
   > *"A report with registration token [token] was already registered during this minute. To ensure unique record identification, please wait until the next minute starts and click submit again."*

---

## 8. LocalStorage Architecture

CampusFind uses browser LocalStorage under the key `campusfind_reports_v2`.

* **Client-Side Persistence**: Reports submitted on a device remain available after browser refreshes and restarts.
* **Seed Data**: Pre-loaded with 6 realistic Marwadi University campus items (each mapped to a valid 12-digit token matching its timestamp) so the directory is functional on first load.
* **Resilience**: If stored data becomes corrupted or is cleared, the service gracefully falls back to the default dataset without crashing.
* **Privacy Boundary**: No passwords, sensitive credentials, or payment details are collected or stored.

---

## 9. Installation & Local Development

### Prerequisites
* Node.js 18.x or 20.x or higher
* npm or pnpm or yarn

### Steps to Run Locally

1. **Clone or Download the Project**:
   ```bash
   git clone <your-repository-url>
   cd campusfind
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Run TypeScript Lint & Verification**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled production output will be generated inside the `/dist` directory.

---

## 10. Deployment Information (Vercel)

The application includes `vercel.json` configured for single-page applications:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Steps to Deploy to Vercel via GitHub:
1. Push the codebase to your GitHub repository.
2. In the [Vercel Dashboard](https://vercel.com), select **"Add New Project"** and import the repository.
3. Vercel automatically detects Vite:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
   * **Install Command**: `npm install`
4. Click **Deploy**. The `vercel.json` rewrite guarantees direct URL refreshes on nested routes (`/track`, `/report-lost`, etc.) work seamlessly.

---

## 11. Known Limitations

* **Client-Side Local Storage**: In this Phase 2/3 prototype, reports are stored in the user's browser LocalStorage. Data is not shared across separate physical computers without a remote database integration.
* **Minute-Level Token Granularity**: Designed for standard university workflow. If simultaneous submissions exceed 1 report per minute on the same machine, the collision prevention prompts a 60-second wait.
* **Status Workflow**: Current report status initializes to `"Submitted"`. Status updates are administered through MB315 verification.

---

## 12. University Submission & License

Developed for the End Semester Examination (ESE) project demonstration at **Marwadi University, Rajkot, Gujarat**.
Licensed under the Apache-2.0 License.
