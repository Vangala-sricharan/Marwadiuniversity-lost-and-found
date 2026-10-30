# MARWADI UNIVERSITY
### FACULTY OF COMPUTER APPLICATIONS & ENGINEERING
#### RAJKOT, GUJARAT, INDIA

---

# END SEMESTER EXAMINATION (ESE) DOCUMENTATION

## DOCUMENT B: PROMPT BOOK
# Engineering CampusFind: Prompts, Iterations & System History

**Academic Year:** 2026–2027  
**Department:** Computer Applications / Information Technology  
**Subject:** Frontend Web Application Development / Software Engineering  

---

### SUBMITTED BY:
* **Student Name:** [Student Name Placeholder]
* **Enrollment / Roll Number:** [Enrollment Number Placeholder]
* **Semester / Section:** [Semester / Section Placeholder]

---

## TABLE OF CONTENTS
1. Introduction to Prompt Engineering
2. Initial Project Planning Prompt (Phase 1 Brief)
3. UI/UX Generation Prompt (Visual Identity & Layouts)
4. Image Asset Management Prompt (Authentic Campus Assets)
5. Functional Development Prompt (Phase 2 Form Logic)
6. Token Generation Prompt (12-Digit Format & Collision Rule)
7. Debugging Prompts Actually Used
8. Testing Prompts Actually Used
9. Examples of Prompt Improvements
10. Final Observations & Lessons Learned

---

## 1. INTRODUCTION TO PROMPT ENGINEERING
Prompt engineering is the discipline of formulating precise, unambiguous, and contextually rich instructions to guide AI systems in synthesizing software solutions. In modern full-stack development, effective prompt engineering demands:
* **Role Framing**: Establishing the engineer persona (Senior Frontend Developer & UI/UX Designer).
* **Constraint Anchoring**: Setting strict non-functional and boundary conditions (e.g. "NO login", "NO admin panel", "NO paid API").
* **Deterministic Formatting**: Specifying exact token rules, mathematical structures, and data schemas (`DDMMYYYYHHmm`).
* **Iterative Progression**: Structuring development across progressive milestones (Phase 1: Foundation, Phase 2: Functionality, Phase 3: QA & Optimization).

---

## 2. INITIAL PROJECT PLANNING PROMPT (PHASE 1 BRIEF)
The foundational prompt used to initiate the CampusFind project:

```text
Act as a senior frontend developer and premium UI/UX designer.

Build a professional, fully responsive university Lost & Found website named CampusFind for Marwadi University.

IMPORTANT: This is a simple student-facing prototype. Do not turn it into a complicated management system.

1. TECHNOLOGY
- React.js
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- LocalStorage (for future functionality)
- Vercel-compatible structure

2. STRICT SCOPE
There must be:
- NO login page.
- NO student authentication.
- NO admin panel.
- NO admin dashboard.
- NO unnecessary user roles.
- NO complicated backend.
- NO paid API integrations.

Any student should be able to open the website and submit a report directly.
```

---

## 3. UI/UX GENERATION PROMPT (VISUAL IDENTITY & LAYOUTS)
The prompt defining the university aesthetic, design system, and component architecture:

```text
3. BRANDING
Product: CampusFind
University: Marwadi University
Tagline: Lost & Found Portal
Use the supplied CampusFind logo and official university logo.

5. HOMEPAGE DESIGN
The homepage must be visually impressive and use the newly supplied main Marwadi University building photograph as its primary full-screen hero background.
Include:
- Premium navigation bar.
- CampusFind logo.
- Clean navigation links.
- Large campus photograph with a subtle dark overlay.
- Headline: "Lost Something? Find It Again."
- Supporting text: "A smarter way to reconnect lost belongings with their owners at Marwadi University."
- Report Lost Item button.
- Report Found Item button.
- Campus showcase section.
- How It Works section.
- Feature cards.
- Actual campus photo gallery.
- Professional footer with university branding.

7. DESIGN QUALITY
Design system:
- Navy blue (#0f2347)
- Teal (#0d9488)
- Cyan accents (#06b6d4)
- White backgrounds
- Light blue-gray surfaces
- Modern typography
- Elegant cards
- Refined shadows
- Consistent spacing
- Smooth transitions
- Subtle hover interactions
Avoid generic AI-generated website layouts. Do not overcrowd the homepage with cards.
```

---

## 4. IMAGE ASSET MANAGEMENT PROMPT (AUTHENTIC CAMPUS ASSETS)
The prompt enforcing authentic campus photography over stock imagery:

```text
4. IMAGE ASSETS
I am supplying actual image assets.
Extract and organize them into:
public/images/college/
public/images/logo/
public/images/categories/
public/images/placeholders/

Use the actual supplied files.
Create a centralized configuration file:
src/config/imageAssets.js

Never replace the supplied university photographs with random stock photographs or fabricated campus images.
```

**Implementation Output**:
* `public/images/college/marwadi-main-building.jpg`
* `public/images/college/marwadi-pg-building.jpg`
* `public/images/college/marwadi-library.jpg`
* `public/images/college/marwadi-auditorium.jpg`
* `public/images/college/marwadi-amphitheatre.jpg`
* `public/images/college/marwadi-cafeteria.jpg`
* `public/images/college/marwadi-advance-lab.jpg`
* `public/images/logo/campusfind-logo.svg`
* `public/images/logo/marwadi-university-logo.svg`

---

## 5. FUNCTIONAL DEVELOPMENT PROMPT (PHASE 2 FORM LOGIC)
The prompt directing the expansion into full reporting functionality:

```text
# CAMPUSFIND — PHASE 2: FUNCTIONALITY & TOKEN GENERATION

Act as a senior React.js developer specializing in frontend application logic, form validation, browser storage and user experience.

Continue developing the EXISTING CampusFind project from Phase 1.
Preserve the existing UI and improve it only where functionality requires it.

2. REPORT LOST ITEM FORM
Fields:
- Student name (required)
- Item name (required)
- Item category (required)
- Item description (required)
- Lost location (required)
- Date lost (required)
- Approximate time lost (required)
- Contact number or email (required)
- Item photograph (optional)

Location suggestions:
- MB Building
- Academic Block
- Classroom
- Library
- Hostel
- Cafeteria
- Sports Ground
- Parking Area
- Other (If Other is selected, allow the student to enter a custom location)

3. REPORT FOUND ITEM FORM
Validate all required fields.
```

---

## 6. TOKEN GENERATION PROMPT (12-DIGIT FORMAT & COLLISION RULE)
The prompt specifying the mathematical token requirement and collision behavior:

```text
4. TOKEN GENERATION SYSTEM
Generate the registration token automatically when a report is successfully submitted.

Token format: DDMMYYYYHHmm
Example:
Date: 30 October 2026
Time: 20:17
Generated token: 301020262017

Requirements:
- Use the actual local date and time at the moment of successful submission.
- Use 24-hour time.
- Always generate exactly 12 digits.
- Do not allow students to manually enter tokens.
- Do not use random tokens.
- Do not use hardcoded dates or example tokens in production logic.
- Store the original submission timestamp alongside the token.

Collision handling:
Since the token contains minute-level precision, two submissions could occur during the same minute.
Preserve the requested 12-digit format. If the generated token already exists, prevent duplicate registration and clearly ask the student to try again after the next minute.

5. SUBMISSION SUCCESS PAGE
Display:
"Thank You!"
"Your report has been successfully registered with CampusFind."
- Registration token
- Report type (Lost or Found)
- Item name
- Submission date and time
- Report location
Important instruction:
"For further details, please visit MB315, Marwadi University."
- Copy Token button
- Track Report button
- Back to Home button

7. TRACK REPORT PAGE
Student enters their 12-digit registration token.
Display: Item name, Report type, Registration token, Submission date, Reported location, Contact details, Current report status (Initial: "Submitted").
If token does not exist:
"No report found with this registration token. Please check your token and try again."
```

---

## 7. DEBUGGING PROMPTS ACTUALLY USED

### Debugging Prompt A: Node.js ES Module Extension Resolution
* **Context**: When executing automated tests in Node.js, `import ... from '../config/imageAssets'` threw `ERR_MODULE_NOT_FOUND` because Node ES Module resolution requires explicit `.js` extensions.
* **Command Executed**:
  ```bash
  node --input-type=module -e 'import("./src/services/storage.js").then(...)'
  ```
* **Resolution Prompt / Action**:
  Modified `src/services/storage.js` to explicitly declare `import { imageAssets } from '../config/imageAssets.js';` and `import { generateSubmissionToken, formatDisplayDateTime } from '../utils/tokenGenerator.js';`. This guaranteed compatibility with both Node.js command-line testing and Vite bundling.

### Debugging Prompt B: SPA Routing on Vercel Refreshes
* **Context**: Refreshing nested routes (e.g. `/track` or `/report-lost`) on client-side SPAs causes HTTP 404 errors on static hosts.
* **Resolution Action**:
  Created `/vercel.json` with universal rewrite rules routing all requests back to `/index.html`:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

---

## 8. TESTING PROMPTS ACTUALLY USED

### Automated Unit Test Prompt:
```javascript
// Test: Token Generator verification
const { generateSubmissionToken, isValidTokenFormat, formatDisplayDateTime } = require("./src/utils/tokenGenerator.js");
const now = new Date(2026, 9, 30, 20, 17); // 30 Oct 2026, 20:17
const token = generateSubmissionToken(now);

console.assert(token === "301020262017", "Token must match 301020262017");
console.assert(isValidTokenFormat(token) === true, "Token must be valid 12 digits");
console.assert(token.length === 12, "Length must be exactly 12");
```

### Storage Collision & Lookup Test Prompt:
```javascript
// Test: Minute Collision & Retrieval verification
const testReport = {
  studentName: "Kavya Patel",
  itemName: "HP Laptop Charger",
  category: "electronics",
  description: "Black 65W barrel pin adapter",
  location: "MB Building",
  date: "2026-10-30",
  approximateTime: "04:15 PM",
  contact: "+91 98989 89898",
  reportType: "lost"
};

const saved = saveNewReport(testReport);
// Attempting identical submission in same minute
let collisionCaught = false;
try {
  saveNewReport(testReport);
} catch (err) {
  collisionCaught = true;
}
console.assert(collisionCaught === true, "Must catch minute collision");
```

---

## 9. EXAMPLES OF PROMPT IMPROVEMENTS

### Example 1: Vague vs. Specific Token Requirements
* **Before (Vague)**: *"Generate a unique ID for every report."*
* **After (Specific & Robust)**: *"Generate an exact 12-digit registration token formatted as DDMMYYYYHHmm based on the actual local date and 24-hour time at the moment of submission. Do not use random numbers. If a report with the same minute token exists, prevent duplicate registration and prompt the user to wait until the next minute."*
* **Impact**: Eliminates guesswork, guarantees deterministic mathematical tokens, and handles edge-case collisions cleanly.

### Example 2: Ambiguous Location Options vs. Standardized Suggestions
* **Before (Vague)**: *"Ask where they lost it."*
* **After (Specific & Robust)**: *"Provide location suggestions: MB Building, Academic Block, Classroom, Library, Hostel, Cafeteria, Sports Ground, Parking Area, Other. If Other is selected, reveal a custom text input with validation."*
* **Impact**: Creates clean, consistent data categories while allowing students flexibility when reporting in unconventional campus areas.

---

## 10. FINAL OBSERVATIONS & LESSONS LEARNED
1. **Frictionless UX Drives High Adoption**: Removing logins while providing verifiable 12-digit tokens strikes the ideal balance between zero-effort reporting and trustworthy tracking.
2. **Authentic Assets Anchor Credibility**: Utilizing genuine Marwadi University photography grounded the application in real physical space, giving students immediate confidence in the portal's legitimacy.
3. **Structured Prompts Enable Production Code**: Clearly detailing error messages, edge cases (such as minute collisions), and directory layouts ensured the codebase was produced cleanly without technical debt.
