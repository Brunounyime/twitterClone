# Twitter-like Backend (NestJS)

Minimal backend built with NestJS + TypeScript. This README contains only the essentials and local start instructions.

## Requirements

- Node.js (v18+ recommended)
- MongoDB running locally or accessible via connection string

## Quick local start

1. Install dependencies

npm install

1. Create a `.env` file in the project root with these variables:

MONGO_URI=[add your own mongodb uri]
JWT_SECRET=yourStrongSecret

1. Run in development (watch mode)

npm run start:dev

Server will run on [http://localhost:3000](http://localhost:3000).

## Important endpoints (short)

- POST /auth/register — register { email, password[, name] }
- POST /auth/login — login { email, password } -> returns { token }
- PATCH /auth/change-password — auth required
- GET /users/all — auth required
- POST /tweets — auth required, body { content, sharedWith: string[] }
- GET /tweets/my and GET /tweets/shared — auth required
