# HIMATIF Backend API

Backend untuk website HIMATIF ITG. Dibangun dengan **Node.js + Express 5 + MySQL**.

## Tech Stack
- Node.js (Express 5)
- MySQL via `mysql2` (promise pool)
- Auth: `jsonwebtoken` (JWT) + `bcrypt`
- File upload: `multer` (static serve di `/image`)
- CORS: `cors`

## Prerequisites
- Node.js 18+
- MySQL server (local/remote)

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Buat file `.env` dari template
   ```bash
   cp .env.example .env
   ```
   Lalu isi:
   ```
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=db_himatif_web
   JWT_SECRET=<ganti-dengan-secret-acak>
   NODE_ENV=development
   ```

3. Import database
   ```bash
   mysql -u root db_himatif_web < database/db_himatif_web.sql
   ```
   (Buat database kosong dulu jika perlu:
   `mysql -u root -e "CREATE DATABASE db_himatif_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`)

## Menjalankan

```bash
npm run dev     # nodemon, hot reload (port 4000)
npm start       # production
```

Jika koneksi DB berhasil akan muncul: `Database connected successfully.`

## Struktur
```
src/
  config/      database + multer
  controllers/ logic per modul
  models/      raw SQL query per tabel
  routes/      endpoint definitions
  middleware/  auth, errorHandler, logger
  app.js       express setup
  server.js    entry point
```

## Endpoint (ringkas)
| Method | Path | Auth | Keterangan |
|--------|------|------|------------|
| POST | `/auth/login` | - | Login, return JWT |
| GET | `/users` | ✅ | List users |
| POST/PUT/DELETE | `/users[/:id]` | ✅ | CRUD user |
| GET | `/berita` | - | List berita |
| POST/PUT/DELETE | `/berita[/:id]` | ✅ admin/informasi | CRUD berita |
| GET | `/pengurus` | - | List pengurus |
| POST/PUT/DELETE | `/pengurus[/:id]` | ✅ admin | CRUD pengurus |
| GET | `/divisi` | - | List divisi |
| POST/PUT/DELETE | `/divisi[/:id]` | ✅ | CRUD divisi |
| GET/POST | `/registrasi` | - / ✅ | Lihat & daftar |
| GET/PUT | `/registration-settings` | ✅ | Setting pendaftaran |

✅ = butuh header `Authorization: Bearer <token>`
