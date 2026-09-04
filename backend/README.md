# WealthWise Backend

Simple Express + MongoDB Atlas backend for the WealthWise exam project.

## 1. Connect MongoDB Atlas

1. Create a free cluster at MongoDB Atlas.
2. In Atlas, create a database user and allow your current IP address in **Network Access**.
3. Copy `backend/.env.example` to `backend/.env`.
4. Replace the `MONGODB_URI` value with your Atlas connection string and set a private `JWT_SECRET`.

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/wealthwise?retryWrites=true&w=majority
JWT_SECRET=my_long_private_exam_project_secret
```

## 2. Run

```bash
cd backend
npm install
npm run dev
```

The server runs at `http://localhost:5000` and `GET /api/health` confirms it is working.

## API routes

| Feature | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login` |
| Income and expenses | `GET`, `POST /api/transactions`; `PATCH`, `DELETE /api/transactions/:id` |
| Budgets | `GET`, `POST /api/budgets`; `PATCH`, `DELETE /api/budgets/:id` |
| Goals | `GET`, `POST /api/goals`; `PATCH`, `DELETE /api/goals/:id` |
| Profile | `GET`, `PATCH /api/profile`; `PATCH /api/profile/password` |
| Dashboard | `GET /api/dashboard` |

All routes except register/login/health require this request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Example expense request

```json
POST /api/transactions
{
  "type": "expense",
  "category": "Food",
  "amount": 450,
  "description": "Lunch",
  "date": "2026-08-31"
}
```

Each controller and middleware function has a short comment above it so it is easy to explain during your exam.
