# WealthWise

Personal wealth management mini project built with MongoDB Atlas, Express, React, Node.js, and Tailwind CSS.

## Folder structure

```text
WealthWise/
├── frontend/                       # React + Vite + Tailwind application
│   ├── public/                     # Static frontend files
│   ├── src/
│   │   ├── api/                    # Axios/fetch API functions
│   │   ├── assets/                 # Images, icons, fonts
│   │   ├── components/             # Reusable UI components
│   │   │   ├── budgets/
│   │   │   ├── goals/
│   │   │   ├── income/
│   │   │   ├── investments/
│   │   │   ├── networth/
│   │   │   ├── profile/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   ├── context/                # Auth and app state contexts
│   │   ├── data/                   # Temporary/mock data
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── layouts/                # Shared page layouts
│   │   ├── pages/                  # Route-level pages
│   │   ├── routes/                 # Router and protected routes
│   │   ├── utils/                  # Formatters and helpers
│   │   ├── App.jsx
│   │   ├── index.css               # Tailwind import and global styles
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                        # Node + Express + MongoDB backend
│   ├── src/
│   │   ├── config/                 # Database configuration
│   │   ├── controllers/            # Request handling
│   │   ├── middleware/             # Auth and error middleware
│   │   ├── models/                 # Mongoose schemas
│   │   ├── routes/                 # API endpoints
│   │   ├── utils/                  # Backend helper functions
│   │   ├── app.js                  # Express configuration
│   │   └── server.js               # API entry point
│   ├── uploads/                    # Optional user uploads (gitignored)
│   ├── .env.example                # MongoDB Atlas and JWT configuration
│   └── package.json
├── .gitignore
├── package.json                    # Shortcut scripts for each application
└── README.md
```

## Start locally

```bash
npm run frontend
```

In a second terminal:

```bash
cd backend
npm install
npm run dev
```

The frontend is already configured to call `http://localhost:5000/api` in `frontend/.env`.

Copy `backend/.env.example` to `backend/.env`, then add your MongoDB Atlas connection string and JWT secret before starting the backend. See `backend/README.md` for the simple Atlas steps and the full API list.
"# WealthWise-Personal-Wealth-Management-Platform" 
