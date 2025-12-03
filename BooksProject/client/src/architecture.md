/src
│
├─ /api                  # Funciones para consumir backend (fetch/axios)
│   └─ auth.js
│   └─ users.js
│   └─ books.js
│
├─ /components           # Componentes reutilizables
│   ├─ Layout/
│   │   ├─ Sidebar.jsx
│   │   ├─ Navbar.jsx
│   │   └─ Footer.jsx
│   └─ UI/
│       ├─ Button.jsx
│       ├─ Input.jsx
│       └─ Modal.jsx
│
├─ /pages                # Páginas según rutas
│   ├─ Login.jsx
│   ├─ Register.jsx
│   ├─ Dashboard.jsx
│   ├─ Users.jsx
│   ├─ Books.jsx
│   └─ NotFound.jsx
│
├─ /context              # Contexto global y auth
│   ├─ AuthContext.jsx
│   └─ ThemeContext.jsx
│
├─ /routes               # Rutas y protecciones según rol
│   └─ AppRoutes.jsx
│
├─ /services             # Lógica de negocio y helpers
│   └─ authService.js
│   └─ userService.js
│
├─ /hooks                # Hooks personalizados
│   └─ useAuth.js
│   └─ useFetch.js
│
├─ /styles               # CSS/SCSS o tailwind
│
├─ App.jsx
├─ index.jsx
└─ setupProxy.js         # Opcional: proxy al backend
