# MARWADI UNIVERSITY
### FACULTY OF COMPUTER APPLICATIONS & ENGINEERING
#### RAJKOT, GUJARAT, INDIA

---

# END SEMESTER EXAMINATION (ESE) PROJECT REPORT

## PROJECT TITLE:
# CampusFind — Lost & Found Portal for Marwadi University

**Academic Year:** 2026–2027  
**Department:** Computer Applications / Information Technology  
**Program:** Bachelor of Technology / Computer Applications  

---

### SUBMITTED BY:
* **Student Name:** [Student Name Placeholder]
* **Enrollment / Roll Number:** [Enrollment Number Placeholder]
* **Semester / Section:** [Semester / Section Placeholder]

### UNDER THE GUIDANCE OF:
* **Project Guide:** [Faculty Guide Name Placeholder]
* **Designation:** Department of Computer Science & Engineering, Marwadi University

---

## TABLE OF CONTENTS
1. Cover Page
2. Project Title & Overview
3. Problem Statement
4. Objectives
5. Scope
6. Existing Problem and Proposed Solution
7. Target Users
8. Functional Requirements
9. Non-Functional Requirements
10. Technology Stack
11. System Architecture
12. Website Module Descriptions
13. User Interface & Screen Specifications
14. Testing & Results
15. Limitations
16. Future Enhancements
17. Conclusion

---

## 1. COVER PAGE & TITLE
**CampusFind: Digital Lost & Found Portal for Marwadi University** is a dedicated student-facing web platform designed to streamline the reporting, cataloging, tracking, and recovery of misplaced belongings across the campus of Marwadi University, Rajkot.

---

## 2. PROJECT TITLE
**CampusFind — Marwadi University Lost & Found Portal**

---

## 3. PROBLEM STATEMENT
On modern higher-education campuses spanning over 32 acres with multiple high-density multi-storey buildings (such as the Main Academic Complex, PG Research Building, Central Library, and Cafeteria), hundreds of students lose personal belongings daily.

Traditional methods of resolving lost items suffer from:
1. **Scattered Information**: Reports are posted haphazardly on personal social media groups, bulletin boards, or communicated verbally to guards.
2. **Account Barrier & Login Fatigue**: Requiring mandatory user registrations or passwords for simple reports creates immediate user drop-off.
3. **No Unique Verification ID**: Inability to reference a specific report when visiting campus security desks or the central office at MB315.
4. **Delayed Recovery**: Time-sensitive items like university student identity cards, driving licenses, or hostel keys take weeks to be returned or remain unclaimed.

---

## 4. OBJECTIVES
The primary objectives of CampusFind are:
* To deliver a single, centralized web portal representing Marwadi University's official lost and found protocol.
* To eliminate all authentication and registration barriers so students can file a report in less than 60 seconds.
* To automatically generate a deterministic 12-digit registration token (`DDMMYYYYHHmm`) based on the local submission timestamp.
* To provide real-time token tracking so students can monitor the status of their reports.
* To connect students directly with the official campus custody desk (**MB315**) and security checkpoints for safe, verifiable handovers.

---

## 5. SCOPE

### Included in Scope (Phase 1 to Phase 3):
* Student-facing landing page showcasing authentic Marwadi University infrastructure.
* Two dedicated, validated reporting forms:
  * Form A: Report Lost Item (`/report-lost`)
  * Form B: Report Found Item (`/report-found`)
* Automatic 12-digit token generator (`DDMMYYYYHHmm`) with minute-collision prevention.
* Submission confirmation page (`/submission-success`) with token copy and tracking shortcuts.
* Tracking module (`/track`) enabling token-based lookup and status inspection.
* Public searchable and filterable directory (`/browse`) with keyword and category sorting.
* Comprehensive campus guide (`/campus-guide`) detailing collection hubs (MB315, Central Library, Security Desk).
* Browser LocalStorage persistence resilient against page reloads and corrupted data.
* Responsive UI tested across desktop (1440px), laptop (1366px), tablet (768px), and mobile (390px/360px).

### Excluded from Scope (Strictly Enforced):
* No user accounts, registration, login screens, or passwords.
* No administrative dashboard, role hierarchies, or staff permission systems.
* No paid third-party cloud database or backend API subscriptions.

---

## 6. EXISTING PROBLEM AND PROPOSED SOLUTION

| Feature | Existing Conventional Method | Proposed CampusFind Solution |
|---|---|---|
| **Reporting Medium** | Informal WhatsApp groups, Instagram stories, physical notice pins | Centralized, accessible university web portal |
| **Authentication** | Either none or cumbersome student ERP logins | Frictionless zero-login public submission |
| **Identification** | Arbitrary chat messages | Deterministic 12-digit token (`DDMMYYYYHHmm`) |
| **Location Tagging** | Vague references ("somewhere in college") | 15+ official Marwadi University zones (MB Building, Library, Labs, etc.) |
| **Custody & Claim** | Meeting random strangers without verification | Directed to MB315 and campus security gates with student ID verification |

---

## 7. TARGET USERS
1. **Marwadi University Students**: Undergraduate, postgraduate, and diploma students from Engineering, Computer Applications, Management, Pharmacy, Law, and Science.
2. **Faculty & Teaching Staff**: Professors and lecturers finding misplaced belongings in classrooms or lecture halls.
3. **Campus Facility & Security Staff**: Security guards at the main academic entrance, library assistants, and cafeteria management holding found items.

---

## 8. FUNCTIONAL REQUIREMENTS

* **FR-01: Lost Item Submission**: Student provides name, contact, item name, category, description, campus location, date, time, and optional photo.
* **FR-02: Found Item Submission**: Finder provides name, contact, item details, location found, date/time, and custody status.
* **FR-03: Token Generation**: Automatic 12-digit token (`DDMMYYYYHHmm`) created upon successful submission.
* **FR-04: Collision Prevention**: Prevent duplicate token if two reports are submitted in the same minute; prompt user to retry in the next minute.
* **FR-05: Confirmation Screen**: Display token, item summary, copy-to-clipboard button, and MB315 visit instruction.
* **FR-06: Status Tracking**: Accept 12-digit token and display item name, category, report type, location, contact, and current status (`"Submitted"`).
* **FR-07: Public Search & Filter**: Browse all reports with category pills (Electronics, IDs, Books, Bags, Keys, Personal) and keyword search.
* **FR-08: Client Storage Persistence**: Save reports locally in `localStorage` under `campusfind_reports_v2`.

---

## 9. NON-FUNCTIONAL REQUIREMENTS

* **Performance**: First Contentful Paint < 1.0s; fast local lookup with zero network latency.
* **Usability & UX**: Clean university palette (Navy `#0F2347`, Teal `#0D9488`, Cyan `#06B6D4`), intuitive forms, zero clutter.
* **Responsiveness**: 100% fluid responsive design across mobile (360px), tablet (768px), and desktop (1440px).
* **Accessibility**: Keyboard navigable, semantic HTML5, clear label associations, contrast compliance.
* **Reliability**: Graceful fallback to default seed data if browser storage is cleared or malformed.
* **Privacy**: No passwords collected; LocalStorage privacy notice displayed.

---

## 10. TECHNOLOGY STACK

* **Frontend Library**: React.js 19
* **Language**: JavaScript (ES2022 / ESNext) & TypeScript
* **Routing**: React Router DOM 7
* **CSS Framework**: Tailwind CSS 4 with `@tailwindcss/vite`
* **Icons**: Lucide React
* **Build Tool**: Vite 8
* **Persistence**: Web Storage API (`localStorage`)
* **Deployment Target**: Vercel (with `vercel.json` SPA rewrite rules)

---

## 11. SYSTEM ARCHITECTURE

```
+-------------------------------------------------------------+
|                      Client Browser                         |
|                                                             |
|   +------------------+             +--------------------+   |
|   |   React Router   | <---------> |   Pages & Layouts  |   |
|   +------------------+             +--------------------+   |
|            |                                 |              |
|            v                                 v              |
|   +------------------+             +--------------------+   |
|   | Token Generator  |             | Reusable UI Cards  |   |
|   |  (12-Digit Engine)|            | & Detail Modals    |   |
|   +------------------+             +--------------------+   |
|            |                                 |              |
|            +----------------+----------------+              |
|                             |                               |
|                             v                               |
|             +-------------------------------+               |
|             |   Centralized Storage Utility |               |
|             |     (src/services/storage.js) |               |
|             +-------------------------------+               |
|                             |                               |
|                             v                               |
|             +-------------------------------+               |
|             |      Browser LocalStorage     |               |
|             |   (campusfind_reports_v2)     |               |
|             +-------------------------------+               |
+-------------------------------------------------------------+
```

---

## 12. WEBSITE MODULE DESCRIPTIONS

1. **Homepage Module (`/`)**:
   * Hero section with authentic Marwadi University building photograph.
   * Direct CTA buttons for *Report Lost*, *Report Found*, *Track by Token*, and *Browse Archive*.
   * Showcase of 6 authentic campus landmarks.
   * Process overview (*How It Works*).
   * Live campus bulletin with search and filter tabs.

2. **Report Lost Module (`/report-lost`)**:
   * Captures student details, item characteristics, and lost location suggestions (`MB Building`, `Academic Block`, `Classroom`, `Library`, `Hostel`, `Cafeteria`, `Sports Ground`, `Parking Area`, `Other`).
   * Validates contact details and allows optional photo upload.
   * Dispatches report to storage and redirects to confirmation.

3. **Report Found Module (`/report-found`)**:
   * Enables students and staff finding property to log details.
   * Includes custody selection (e.g. *In Finder Care*, *Deposited at MB315*).

4. **Submission Success Module (`/submission-success`)**:
   * Renders the 12-digit registration token, one-click copy button, summary, and MB315 visit instruction.

5. **Track Report Module (`/track`)**:
   * Validates 12-digit token inputs and displays real-time status.
   * Handles non-existent tokens with the exact specified error message.

6. **Campus Guide Module (`/campus-guide`)**:
   * Summarizes the primary collection hubs on campus, headed by **MB315 Central Lost & Found Office**, and gives a 3-step verification checklist.

---

## 13. USER INTERFACE & SCREEN SPECIFICATIONS

* **Desktop View (1440px)**: 3-column grid for bulletin items and campus gallery, top horizontal navigation with quick CTA buttons.
* **Laptop View (1366px)**: Fluid max-w-7xl containers, elegant card hover states and subtle drop shadows.
* **Tablet View (768px)**: 2-column responsive layout, touch-optimized input heights (44px+).
* **Mobile View (360px–390px)**: Single-column stacked cards, full-width buttons, collapsible hamburger navigation drawer.

---

## 14. TESTING & RESULTS

| # | Test Scenario | Input Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| 1 | Lost item submission | Valid student name, item, location, date, time, phone | 12-digit token generated, report saved in LocalStorage, redirected to `/submission-success` | Token generated, report persisted, redirected | **PASS** |
| 2 | Found item submission | Valid finder info, ID card, Cafeteria, photo | Token generated, report saved, status initialized to `"Submitted"` | Status `"Submitted"`, persisted | **PASS** |
| 3 | Empty field validation | Leaving student name blank | Inline error: *"Student name is required."* Form submission blocked | Blocked with inline warning | **PASS** |
| 4 | Invalid contact info | Entering `"abc"` | Inline error: *"Please provide a valid phone number (min 7 digits) or valid email address."* | Blocked with inline warning | **PASS** |
| 5 | Custom location ("Other") | Selecting "Other", entering `"Near ATM Kiosk"` | Report saved as `"Other: Near ATM Kiosk"` | Correctly saved and displayed | **PASS** |
| 6 | Token format compliance | Automatic date/time calculation | Exactly 12 digits matching `DDMMYYYYHHmm` | Verified `301020261525` (12 digits) | **PASS** |
| 7 | Duplicate minute collision | Submitting twice in the same minute | Error message requesting user wait for next minute | Collision caught and displayed | **PASS** |
| 8 | Valid token tracking | Entering `281020261435` | Displays HP/Dell charger, Aarav Patel, status `"Submitted"`, MB315 notice | Displays full report | **PASS** |
| 9 | Invalid token tracking | Entering `999999999999` | Displays: *"No report found with this registration token. Please check your token and try again."* | Exact message displayed | **PASS** |
| 10 | Browser refresh persistence | Hard refresh (`F5` / `Cmd+R`) | Newly submitted reports remain in LocalStorage and list view | All data persists | **PASS** |
| 11 | Corrupted storage safety | Setting `localStorage` to `{ invalid }` | Fallback to default seed data without crashing | Graceful fallback | **PASS** |

---

## 15. LIMITATIONS
* **Client-Side Storage**: In this Phase 2/3 prototype, data resides in the user's browser. Cross-device synchronization requires an external backend database in future phases.
* **Minute-Level Token Resolution**: Accommodates typical university traffic. Simultaneous submissions within the same 60-second window prompt a 1-minute retry to prevent collisions.
* **Status Updates**: Status initiates as `"Submitted"`. In-person custody verification at MB315 is required for handover.

---

## 16. FUTURE ENHANCEMENTS
* **University ERP Single-Sign-On**: Optional integration with Marwadi University student portal credentials.
* **Automated Email / SMS Notifications**: Instant alert when a found item matches an active lost report.
* **Interactive 3D Campus Map**: Interactive Leaflet / Mapbox model of Marwadi University campus blocks and room numbers.
* **Role-Based Security Desk Portal**: Centralized administration terminal for MB315 staff.

---

## 17. CONCLUSION
**CampusFind** fulfills all requirements set forth for the Marwadi University Lost & Found Portal. By prioritizing a zero-barrier, student-first workflow with automatic 12-digit token generation and authentic university photography, CampusFind bridges the gap between misplaced belongings and their rightful owners, establishing a modern, professional, and accessible web solution for our university.
