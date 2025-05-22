# 🧭 User Access Management System

A full-stack application for managing user access to software, featuring user registration, JWT authentication, software access requests, and managerial approvals.

---

## Table of Contents

- [Introduction](#introduction)
- [System Overview](#system-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints & Pages](#api-endpoints--pages)
- [Setup & Running the Project](#setup--running-the-project)
- [GitHub Repository](#github-repository)

---

## Introduction

### Purpose

This system allows users to:

- Register and login securely
- Request access to software
- Managers to approve or reject access requests
- Admins to create and manage software

### Scope

The core functionalities include:

- User Registration
- JWT-based Authentication
- Software Listing & Creation
- Access Request Submission
- Access Request Approval/Rejection

---

## System Overview

### User Roles

- **Employee**: Sign up, login, request software access
- **Manager**: View and approve/reject requests
- **Admin**: Create software and full system access

### Functionalities

- Sign-up / Login with JWT authentication
- Role-based redirection and access
- Software management by Admin
- Access request submission by Employees
- Request approval/rejection by Managers

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Other Tools:** bcrypt, dotenv, nodemon

---

## Features

- User Registration & Login with JWT authentication
- Role-based access control
- Admin software creation with access levels (Read, Write, Admin)
- Employees submit software access requests
- Managers approve or reject requests

---

## API Endpoints & Pages

| Endpoint            | Method | Description                                | React Page          |
| ------------------- | ------ | ------------------------------------------ | ------------------- |
| `/api/auth/signup`  | POST   | Register new user (default role: Employee) | `/signup`           |
| `/api/auth/login`   | POST   | Login and return JWT + role                | `/login`            |
| `/api/software`     | POST   | Add new software (Admin only)              | `/create-software`  |
| `/api/requests`     | POST   | Submit access request (Employee)           | `/request-access`   |
| `/api/requests/:id` | PATCH  | Approve/reject access request (Manager)    | `/pending-requests` |

---

## Setup & Running the Project

### Clone the repository

```bash
git clone https://github.com/rahul-adepu/Leucine-User-Access-Management.git

cd backend

npm install

npm run server

```

### Open a new terminal

```bash
cd frontend

npm install

npm run dev
```

## GitHub Repository

[GitHub Link](https://github.com/rahul-adepu/Leucine-User-Access-Management.git)
