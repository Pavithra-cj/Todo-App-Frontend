# 🎨 Todo App – Frontend (React + Vite + Tailwind CSS)

This is the **frontend** of the Todo Application, built using **React**, **Vite**, and **Tailwind CSS**.  
It connects to a **Spring Boot backend** (Dockerized) running at `http://localhost:8080`.

> 🔗 **Backend Repository**: [https://github.com/Pavithra-cj/TodoApp_Backend]

---

## ✨ Features

- 📝 Create, update, complete and delete tasks
- 📌 Set task **priority** (LOW / MEDIUM / HIGH)
- ⏰ Set **due dates** for deadlines
- ✅ View completed tasks (not removed)
- 💬 SweetAlert2 for warning & success alerts
- 🎨 Styled using **Tailwind CSS**
- 🔥 Icons via Iconify
- ⚡ Powered by React Hooks — no Redux

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-frontend.git
cd todo-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

- Open the app in your browser:
  - 👉 [http://localhost:5173]

## ⚠️ Backend Required
The frontend needs the backend running at:

```arduino
http://localhost:8080
```

Make sure to run the backend before starting the frontend.
* [https://github.com/Pavithra-cj/TodoApp_Backend]

- You can start it with Docker:

```bash
cd todo-backend
docker-compose up --build
```

## 📂 Project Structure

```graphql
src/
├── components/
│   ├── model/
│   │   └── TaskCard.jsx
│   ├── TaskForm.jsx
│   └── TaskList.jsx
├── service/
│   └── taskService.js
├── App.jsx
└── main.jsx
```

## 🧠 Tech Stack

* ⚛️ React (with Hooks)
* ⚡ Vite (super-fast frontend dev)
* 💅 Tailwind CSS
* 💬 SweetAlert2
* 🎯 Iconify Icons
* 🌐 Axios

## 🔗 Related Repositories

* Backend (Spring Boot + MySQL + Docker): [https://github.com/Pavithra-cj/TodoApp_Backend]
