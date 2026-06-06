# BusNav — Backend API

A real-time bus navigation and tracking API built with **NestJS**, **TypeORM**, and **MySQL**.

---

## Tech Stack

- **NestJS** — Node.js framework
- **TypeORM** — ORM for database interactions
- **MySQL** — relational database
- **JWT + Passport** — authentication & authorization
- **bcrypt** — password hashing
- **@nestjs/event-emitter** — internal event bus for SSE broadcasting
- **@nestjs/swagger** — API documentation UI
- **class-validator / class-transformer** — DTO validation
- **Joi** — environment variable validation

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| npm | >= 9.x |
| MySQL | >= 8.x |

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd busnav-backend

# Install dependencies
npm install
```

---

## Environment Setup

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_db_password
DB_NAME=busnav

JWT_SECRET=bus_nav_super_secret_key
JWT_EXPIRES_IN=1d

PORT=3003
```

> **Note:** Never commit `.env` to version control.

---

## Database Setup

1. Create the database in MySQL:

```sql
CREATE DATABASE busnav;
```

2. TypeORM will auto-sync the tables on first run (if `synchronize: true` is set in the TypeORM config).

---

## Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The API will be available at:

```
http://localhost:3003
```

Swagger documentation:

```
http://localhost:3003/api
```

---

## Project Structure

```
src/
  app.module.ts
  main.ts
  auth/
  roles/
  users/
  drivers/
  bus-lines/
  bus-stops/
  buses/
  bus-locations/
  trips/
  predictions/
  service/
  passes/
  favorite-places/
  notifications/
```

---

## API Overview

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/auth/profile` | Get current user profile (protected) |

**Login response:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "user_id": 1,
    "user_name": "Ali",
    "user_email": "ali@test.com",
    "role": "driver",
    "driver_id": 2
  }
}
```

### Resources (CRUD)

All resources support: `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`

| Resource | Base Path |
|----------|-----------|
| Roles | `/roles` |
| Users | `/users` |
| Drivers | `/drivers` |
| Bus Lines | `/bus-lines` |
| Bus Stops | `/bus-stops` |
| Buses | `/buses` |
| Bus Locations | `/bus-locations` |
| Trips | `/trips` |
| Predictions | `/predictions` |
| Service (line ↔ stop) | `/service` |
| Passes (bus ↔ stop) | `/passes` |
| Favorite Places | `/favorite-places` |
| Notifications | `/notifications` |

### Real-Time (SSE)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bus-locations/stream` | SSE stream of live bus locations |

Connect with:
```bash
curl -N http://localhost:3003/bus-locations/stream
```

Every `POST /bus-locations` automatically broadcasts to all SSE clients.

### Trips Filter

```
GET /trips                  → all trips
GET /trips?driver_id=2      → trips assigned to driver 2
```

---

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

### Roles

| Role | Permissions |
|------|------------|
| `admin` | Manage users, drivers, buses, bus lines, bus stops, trips |
| `driver` | View assigned trips, update trip status, post bus location |
| `user` | View lines/stops/predictions, manage favorites, see notifications |

---

## Testing Order (Postman)

Because tables are relational, seed data in this order:

1. `POST /roles`
2. `POST /auth/register` (creates users)
3. `POST /drivers`
4. `POST /bus-lines`
5. `POST /bus-stops`
6. `POST /buses`
7. `POST /service`
8. `POST /passes`
9. `POST /bus-locations`
10. `POST /trips`
11. `POST /predictions`

---

## .gitignore

```
node_modules/
dist/
.env
coverage/
```