# MediGem: AI Health Assistant

MediGem is an AI-powered health monitoring application designed to empower users to proactively manage their health. It provides intuitive tools for vitals tracking, instant AI-driven insights, and seamless communication with healthcare professionals.

## Features

- **Secure Authentication:** Patient login via Firebase Auth.
- **Dashboard Overview:** View vitals, symptoms, and alerts in a unified dashboard.
- **Vitals Logging:** Log and track vitals and symptoms with timestamps.
- **Caregiver Assignment:** Admin interface to manage patients and assign caregivers.
- **Critical Alerts:** Receive alerts for critical vitals readings with configurable thresholds.
- **AI Health Query:** Get general health information powered by Google's Gemini API.
- **Role Management:** Role-based access for patients, caregivers, and doctors.
- **Data Security:** All data is encrypted in transit and at rest.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **AI Integration:** Google Gemini via Genkit
- **Other:** TypeScript, PostCSS

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn or npm
- Firebase account and project

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mallikharjun9999/medi-gem-ai.git
   cd medi-gem-ai
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (Firebase, Gemini API keys, etc.).

4. **Configure Firebase:**
   - Set up Firebase Auth and Firestore in your Firebase console.
   - Update `firestore.rules` as needed.

5. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

6. **(Optional) Start Firebase emulators:**
   - If using local emulators, ensure you have a `firebase.json` and run:
     ```sh
     firebase emulators:start
     ```

## Project Structure

```
.
├── src/
│   ├── ai/                # AI flows and integration (Gemini, Genkit)
│   ├── app/               # Next.js app directory (pages, layouts, routes)
│   ├── components/        # Reusable React components
│   ├── contexts/          # React context providers (e.g., Auth)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries (Firebase, etc.)
├── docs/                  # Documentation and blueprints
├── public/                # Static assets
├── .idx/                  # Dev environment configs (Nix, etc.)
├── firestore.rules        # Firestore security rules
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
└── ...
```

## Style Guidelines

- **Primary color:** Calming Blue (`#3498db`)
- **Background:** Light Gray (`#f0f4f7`)
- **Accent:** Soft Green (`#2ecc71`)
- **Font:** 'Inter', sans-serif
- **Icons:** Consistent, clear icons for vitals and health metrics
- **Layout:** Clean, responsive, with subtle UI transitions

## AI Disclaimer

MediGem provides general health information and is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician or qualified health provider with any questions regarding a medical condition.

Built by Penugonda Mallikharjunarao