# Diary API

A Node.js REST API that allows users to register, login, create and manage their diary entries, and generate helpful summaries using OpenAI's API. Built with Express, MongoDB (Mongoose), and secured with JWT authentication.

## Features

- User registration and authentication (JWT)
- Create, Read, Update, Delete (CRUD) operations for diary entries
- Generate AI-powered summaries of diary entries with OpenAI
- Pagination support for listing diary entries
- Request validation and error handling

## Tech Stack

- Node.js & TypeScript
- Express.js
- MongoDB (Mongoose ODM)
- OpenAI API
- JWT authentication
- bcrypt password hashing

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or remote)
- OpenAI API Key ([Get one here](https://platform.openai.com/signup))

### Installation

```bash
# Clone the repository
git clone https://github.com/lytes20/diary-api.git
cd diary-api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3030
MONGO_DB_URL=mongodb://localhost:27017/diarydb
OPENAI_API_KEY=your_openai_api_key
```

### Run the server

```bash
npm run dev
```

Server will run on [http://localhost:3030](http://localhost:3030) (unless a different `PORT` is set).

---

## API Documentation

### Authentication

All diary routes require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Endpoints

#### Auth

- **POST /api/v1/users/create** — Register a new user
  - body: `{ firstName, lastName, userName, email, password }`
- **POST /api/v1/login** — Login
  - body: `{ email, password }`
  - returns `{ user, token }` on success

#### Diary

All endpoints below require authentication.

- **GET /api/v1/diary/** — List diary entries (pagination: `?page=1`)
- **POST /api/v1/diary/** — Create a new diary entry
  - body: `{ title, content, tags? }`
- **GET /api/v1/diary/:diaryId** — Get a single diary entry
- **PUT /api/v1/diary/:diaryId** — Update a diary entry
  - body: `{ title?, content?, tags? }`
- **DELETE /api/v1/diary/:diaryId** — Delete a diary entry
- **POST /api/v1/diary/:diaryId/summarize** — Generate & save a summary for a diary entry

#### Response format

All responses are structured as:

```
{ success: boolean, data?: any, error?: string }
```

### Diary Model

- `userId` (ObjectId)
- `title` (string, required)
- `content` (string, required)
- `tags` (array of string, optional)
- `summary` (string, generated)

---

## License

ISC

---

## Author

Gideon Bamuleseyo
