# CivicRoute

CivicRoute is a mobile-first civic utility web application designed to connect citizens to the responsible municipal authorities in Karachi. Built with React, Vite, Tailwind CSS v4, and React Router.

## Features

- **Mobile-first design**: Centered max-width container (390px) matching real phone specifications.
- **Simulated Authentication**: Email/password validation and simulated Google Sign-In.
- **Terms & Civic Consent**: Mandatory agreement gate before proceeding.
- **Interactive Location Routing**: 10 prominent Karachi neighborhoods mapped to 4 municipal authorities (TMC Gulshan, Saddar Works, CBC Clifton, and TMC Korangi) with an interactive vector map.
- **Issue Reporting, Photo & Voice Note**: 4 issue categories with automatic authority compatibility detection, local photo preview, real-time voice speech-to-text dictation, and voice recording note attachment.
- **Trilingual Formal Letter & App UI (English, Urdu & Sindhi)**: Complete interface and complaint letter generation in English, Urdu (اردو), and Sindhi (سنڌي), featuring tailored RTL layouts and typography (`Noto Sans Arabic` for Sindhi, `Noto Nastaliq Urdu` for Urdu).
- **Simulated Dispatch & Receipt**: 1.5-second simulated sending state generating a unique tracking reference (`CR-YYYYMMDD-XXXX`) with tap-to-copy contacts and portal links.
- **Route Guards**: Preserves progression flow and prevents skipping prerequisite steps.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Development

```bash
cd civicroute-app
npm install
npm run dev
```

Visit `http://localhost:5173` to test the application.

### Building for Production

```bash
npm run build
npm run preview
```

## Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `civicroute-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` ensures client-side routing handles all paths seamlessly.
