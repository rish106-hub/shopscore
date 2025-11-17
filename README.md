# ShopScore Backend

Node.js/Express backend for authentication and user management backed by PostgreSQL and Prisma ORM. Provides signup, login, profile, verification, and logout endpoints with JWT-based authentication via HTTP-only cookies or Bearer tokens.

## Tech Stack
- Node.js (ES Modules)
- Express 5
- Prisma ORM
- PostgreSQL
- JWT for auth
- CORS, cookie-parser, bcrypt, dotenv
- Nodemon (dev)

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (local or managed)

## Getting Started

### 1) Clone and install
```bash
npm install
```

### 2) Environment variables
Create a `.env` file in the backend root with:
```bash
# App
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Auth
JWT_SECRET=replace-with-a-strong-random-string

# Database (PostgreSQL)
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>?schema=public"
```

### 3) Database setup (Prisma)
```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations (for local/dev)
npx prisma migrate dev --name init

# Optional: Prisma Studio
npx prisma studio
```

### 4) Run the server
```bash
# Dev (with nodemon)
npm run dev

# Prod
npm start
```
Server starts on `http://localhost:5000` by default.

## Available Scripts
- `npm run dev` — start with nodemon on `src/index.js`
- `npm start` — start with Node on `src/index.js`

## API
Base URL: `/api/auth`

- `POST /signup`
  - Body: `{ email: string, password: string, name?: string }`
  - Creates user, sets `token` cookie, returns `user` and `token`.

- `POST /login`
  - Body: `{ email: string, password: string }`
  - Authenticates, sets `token` cookie, returns `user` and `token`.

- `GET /me` (protected)
  - Reads user from JWT. Provide auth via HTTP-only cookie or `Authorization: Bearer <token>`.

- `POST /logout`
  - Clears `token` cookie.

- `GET /verify` (protected)
  - Same as `/me`, useful for session checks.

### Auth details
- JWT payload: `{ userId, email }`
- Cookie name: `token` (httpOnly, SameSite=strict, Secure in production)
- Alternative: send `Authorization: Bearer <token>` header

### Minimal curl examples
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Passw0rd!","name":"User"}' -i

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Passw0rd!"}' -i

# Me (Bearer token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## CORS
- In development, allowed origin defaults to `http://localhost:3000`.
- In production, set `NODE_ENV=production` and define `FRONTEND_URL`.

## Error Handling
- Centralized error handler returns JSON with `status`, `message`, and optional `stack` (hidden in production).
- Process-level handlers for uncaught exceptions and unhandled promise rejections.

## Project Structure
```
backend/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
└─ src/
   ├─ controllers/
   │  └─ auth.controller.js
   ├─ middleware/
   │  └─ auth.js
   ├─ routes/
   │  └─ auth.routes.js
   ├─ db/
   │  └─ prisma.js
   └─ index.js
```

## Database Schema (excerpt)
- Table: `users` (mapped by Prisma model `User`)
  - `id` (UUID, PK)
  - `email` (unique)
  - `password`
  - `name` (nullable)
  - `createdAt`, `updatedAt`

## Deployment Notes
- Ensure `NODE_ENV=production`.
- Set `FRONTEND_URL` to your deployed frontend origin.
- Set strong `JWT_SECRET` and secure `DATABASE_URL`.
- Run `npx prisma generate` and migrations before starting.

## License
ISC (see `package.json`).
