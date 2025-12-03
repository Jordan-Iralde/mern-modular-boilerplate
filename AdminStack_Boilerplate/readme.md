/project-root
├─ /client           # React frontend
│  ├─ /src
│  │  ├─ /api        # API calls & endpoints (feature-based)
│  │  ├─ /components # Reusable & feature-specific UI
│  │  ├─ /pages      # Full pages (Auth, Dashboard, Features)
│  │  ├─ /hooks      # Custom hooks for state & logic
│  │  ├─ /context    # Global state providers
│  │  ├─ /routes     # React Router setup
│  │  ├─ /services   # External APIs, notifications, utilities
│  │  ├─ /utils      # Generic helpers
│  │  ├─ App.tsx
│  │  └─ index.tsx
│
├─ /server           # Node/Express backend
│  ├─ /config        # DB, environment, server configs
│  ├─ /controllers   # Feature-specific business logic
│  ├─ /models        # MongoDB schemas (Mongoose)
│  ├─ /routes        # Express route definitions
│  ├─ /middleware    # Auth, roles, error handling
│  ├─ /utils         # Backend helpers
│  ├─ server.ts      # Entry point
│  └─ app.ts         # Middleware & routes setup
│
├─ package.json
├─ tsconfig.json
├─ .env
└─ README.md
``