# Task Manager – Vue 3 & Supabase

A full-stack Task Management web application built using Vue 3 (Composition API) and Supabase. 
The app provides secure user authentication, task creation and management, and real-time data handling with a clean and responsive UI.

This project demonstrates practical experience with frontend architecture, authentication workflows, and database CRUD operations using modern web technologies.

---

## Features

###  Authentication

- User login and registration
- Password reset via email using Supabase Auth
- Secure session handling
- Redirect-based navigation after authentication

---

###  Task Management (CRUD)

- Create, read, update and delete tasks
- Task fields:
  - Title
  - Description
  - Status (To Do / In Progress / Done)
  - Deadline
- Modal-based task creation and editing
- Real-time task refresh after updates

---

### Filtering & UI Logic

- Filter tasks by status:
  - All
  - To Do
  - In Progress
  - Done
- Dynamic status color indicators
- Teleport-based modal rendering
- Form validation with user feedback

---

###  Client-side Routing (Custom)

- Lightweight hash-based routing without Vue Router
- Dynamic component rendering using:

