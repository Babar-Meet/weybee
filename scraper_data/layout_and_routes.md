# WeyBee-AI: Website Structure, Layout & Route Blueprint

This document serves as the blueprint for creating the "WeyBee-AI" clone. It outlines the overall website architecture, component layout, and user flow based on the scraped data from the original WeyBee website.

## 1. Global Components
These components will be visible across almost all pages.

### Header (Navigation Bar)
- **Logo**: WeyBee (Left aligned)
- **Main Navigation Links** (Center aligned):
  - Home
  - About Us
  - Services (Dropdown menu containing categorized services):
    - **IT Staff Augmentation**: Hire Developers, Hire QA Engineers, Hire Managed Team
    - **IT Services for Startups**: MVP Development, End to End Tech Support
    - **Software Development Services**: Web Development, eCommerce Development, Customized software development, Software Project Management, Platform Engineering, Mobile App Development
    - **Data Engineering**: Data scraping, AI-ML Engineering
  - Success Stories
  - Careers
  - Contact Us
- **Call To Action Button** (Right aligned): "Let's Talk"

### Footer
- **Company Info**: WeyBee mission statement.
- **Contact Info**: Phone (+61 2 8024 5936 / +44 2347 667), Email (info@weybee.com, support@codiqa.com).
- **Quick Links**: Home, About Us, Careers, Contact.
- **Services Links**: IT Staff Augmentation, IT Services for Startups, Software Development, Data Engineering.
- **Newsletter/Subscription Block**: "Stay updated" with email input.
- **Social Links**: Facebook, Twitter, LinkedIn, Instagram, YouTube.
- **Copyright text**.

---

## 2. Page Layouts & Working Flow

### A. Home Page (`/`)
**Objective**: Introduce the company, highlight core services, and establish trust.
- **Hero Section**:
  - Main Headline: "Your Trusted IT Services & Technology Partner- WeyBee"
  - Sub-headline: "From custom software development to IT consulting and digital transformation..."
  - CTAs: "Get in Touch Now" (Primary), "View Services" (Secondary).
  - Background/Visual: Premium tech/corporate hero image or dynamic background.
- **Core Services Showcase**:
  - Grid or flex layout highlighting major service pillars:
    - IT Staff Augmentation
    - Software Development Services
    - IT Services for Startups
    - Data Engineering
  - Each with a short description and a "View Services" link.
- **About Us Summary (Stats)**:
  - Brief text: "At WeyBee, we believe in the power of technology..."
  - Counter animations for: Projects Completed, Satisfied Clients, Employees, Employee's Retention.
- **Value Proposition ("Why Choose Us")**:
  - Highlights engagement models: Dedicated Team Model, Pay as you Go Model, Fixed Price Model.
  - "Product Engineering From the Concept to Innovation" feature list.

### B. About Us Page (`/about-us/`)
**Objective**: Share the company's vision, culture, and achievements.
- **Hero Area**: Title "About WeyBee" with Contact and Services CTA.
- **Mission Statement**: Dedicated to helping businesses of all sizes harness technology.
- **Statistics Block**: 145+ Projects, 113+ Clients, 50+ Employees, 90% Retention.
- **Core Values (WEYBEE Acronym)**:
  - **W**: Work - Culture of Excellence
  - **E**: Educate to Empower
  - **Y**: You-Focused Solutions
  - **B**: Betterment is Our Commitment
  - **E**: Efforts Drive Success
  - **E**: Ethics Above All
- **Why Choose Us Grid**: Dedicated Vetted Developers, Transparent Operations, Diverse Expertise, Long-Term Partnership, Client Satisfaction, Proven Growth, Innovative Approach.
- **Team Info**: Mentions the 50+ dedicated professionals.

### C. Services Pages (`/services/*`)

**1. IT Staff Augmentation (`/it-staff-augmentation/`)**
- **Hero Area**: "WeyBee offers flexible IT Staff Augmentation services to help businesses bridge skill gaps..."
- **Why Choose Us Section**: Bullet points (Access to highly skilled professionals, Cost-effective, Seamless integration).
- **Sub-Services Links**: 
  - Ensure quality (Hire QA)
  - Streamline project delivery (Managed Teams)
  - Top-tier developers (Hire Developers)

**2. Software Development Services (`/software-development-services/`)**
- **Hero Area**: "At WeyBee, we transform ideas into reality with our expert Software Development Services..."
- **Expertise List**: Custom Software Development, Web and Mobile App Development, Enterprise Solutions, API Integration, Maintenance and Support.
- **Specific Offerings Banner**: eCommerce services, Customized software, Platform Engineering, Mobile App ideas to reality.

### D. Contact Us Page (`/contact-us/`)
**Objective**: Lead generation and direct communication.
- **Hero Area**: "Reach out today, and let’s discuss how we can accelerate your business growth."
- **Offices Grid**:
  - **India Offices**: +91 88660 08860
  - **Australia Office**: +61 2 8024 5936
- **Contact Channels**: Email Us, Web link.
- **Newsletter Block**: Stay connected with WeyBee Solutions.

### E. Careers Page (`/careers/`)
**Objective**: Employer branding and recruitment.
- **Hero/Intro**: "We are a community of thinkers, creators, and innovators."
- **Company Culture Columns**:
  - **Fun**: Celebrations, Outings, Games.
  - **Learn**: Training Programs, LLM, On-the-job training.
  - **Growth**: Chart career growth, Life skills, CSR.
- **Open Positions List**: Dynamic list showing job roles (Full Stack Developer, AI-First Full Stack Developer, Sr. Python Backend Developer, Data Analyst Lead, etc.) and experience required.
- **Application Form**: 
  - Fields: Your Name, Phone number, Your Email, Your Resume, Open Positions dropdown, Message.
  - CTA: "Apply Now".

---

## 3. Route Map (Frontend Routing Strategy)

When building the full-stack clone, we will implement the following frontend routes using our selected framework:

| Path | Component/Page | Purpose |
|------|----------------|---------|
| `/` | `Home` | Landing page |
| `/about-us` | `About` | Company info, Core values, Stats |
| `/services` | `ServicesIndex` | Overview of all services |
| `/it-staff-augmentation` | `StaffAugmentation` | Specific service landing |
| `/software-development-services` | `SoftwareDev` | Specific service landing |
| `/it-services-for-startups` | `StartupServices` | Specific service landing |
| `/data-engineering` | `DataEngineering` | Specific service landing |
| `/careers` | `Careers` | Job listings, Culture, Application Form |
| `/contact-us` | `Contact` | Offices, Direct Contacts, Map |

---

## 4. Computed UI Metrics (100% Accurate Layout Data)

Based on programmatic DOM inspection, here are the exact CSS properties required to match the original WeyBee website perfectly:

### Typography & Colors
- **Primary Brand Color**: `rgb(86, 112, 251)` / `#5670FB` (Used in Hero background, Button text, Highlights)
- **Primary Font Family**: `"Mona Sans"`, sans-serif (Used in Hero and Body content)
- **Heading Font Family**: `"Raleway"`, Arial, Helvetica, sans-serif (Used in Navbar and Headings)

### Primary Call-To-Action Button (e.g. "Get in Touch Now")
- **Shape / Border Radius**: `15px 0px 15px 15px` (A signature asymmetrical leaf-like rounded corner)
- **Padding**: `15px 45px`
- **Background Color**: `rgb(255, 255, 255)` (White)
- **Text Color**: `rgb(86, 112, 251)`
- **Font**: `16px`, weight `600`
- **Box Shadow**: `rgba(33, 33, 33, 0.07) 0px 20px 30px 0px` (Soft floating drop-shadow)
- **Animation/Transition**: `transition: 0.5s` (Used for smooth hover states)
- **Display**: `flex`, `justify-content: center`, `align-items: center`

### Hero Section Layout
- **Background Color**: `rgb(86, 112, 251)`
- **Text Color**: `rgb(255, 255, 255)` (White)
- **Typography**: `16px`, weight `400`
- **Width**: Full viewport width (100%)

---

## 5. Next Steps for Implementation
1. **Initialize Project**: Create a new Next.js or React+Vite project named `weybee-ai`.
2. **Design System**: Set up `index.css` with modern, premium styling variables.
3. **Component Building**: Create reusable `Button`, `Card`, `Navbar`, and `Footer` components.
4. **Page Assembly**: Build each page perfectly using the structural outlines provided above, starting with the Home page.
5. **Assets Integration**: Map the scraped images, logos, and SVGs from the `resources` folder into the project's public directory.
