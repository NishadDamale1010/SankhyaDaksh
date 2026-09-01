# CampusOS Backend Architecture & API Reference

Welcome to the CampusOS Backend documentation! This file contains the folder structure and a complete list of API endpoints for the project to help the team get up to speed quickly.

---

## 📁 Folder Architecture

The backend is built using a standard **Node.js + Express.js MVC Architecture**.

```text
server/
│
├── config/             # Database and middleware configurations
│   ├── db.js           # MongoDB connection logic
│   ├── env.js          # Environment variables validation and export
│   └── multer.js       # File upload configuration (PDF, DOCX, PPT, PPTX)
│
├── controllers/        # Request handlers (No business logic here)
│   ├── adminController.js     # Admin actions (approve/reject docs, assign faculty, manage users)
│   ├── aiController.js        # AI-related endpoints (chat, quiz, summary, viva, etc.)
│   ├── analyticsController.js # Dashboard stats, activity tracking
│   ├── authController.js      # Registration, login, profile updates
│   ├── documentController.js  # Document uploads, retrieval, updates, deletions
│   └── userController.js      # User management
│
├── middleware/         # Custom Express middleware
│   ├── auth.js         # JWT authentication verification
│   ├── errorHandler.js # Global error handler and 404 handler
│   ├── role.js         # Role-based access control (Student, Faculty, Admin)
│   └── upload.js       # File upload validation middleware
│
├── models/             # Mongoose schemas (Database structure)
│   ├── Activity.js     # User activity logs
│   ├── Assignment.js   # Faculty assignments
│   ├── Chat.js         # AI Chat history and citations
│   ├── Document.js     # Uploaded documents and metadata
│   ├── Notification.js # System notifications for users
│   ├── Quiz.js         # AI-generated quizzes
│   ├── Summary.js      # AI-generated document summaries
│   └── User.js         # User accounts and profiles
│
├── routes/             # API route definitions
│   ├── adminRoutes.js
│   ├── aiRoutes.js
│   ├── analyticsRoutes.js
│   ├── authRoutes.js
│   ├── documentRoutes.js
│   └── userRoutes.js
│
├── services/           # Core business logic & external API calls
│   ├── aiService.js           # Communicates with Python AI backend (localhost:8000)
│   ├── analyticsService.js    # Data aggregation for dashboards
│   ├── authService.js         # Token generation, hashing, login logic
│   ├── documentService.js     # Document handling logic
│   ├── notificationService.js # Notification creation and retrieval
│   └── storageService.js      # File storage utilities
│
├── uploads/            # Locally stored uploaded files
│   ├── documents/
│   ├── notes/
│   ├── questionpapers/
│   └── research/
│
├── utils/              # Helper functions and constants
│   ├── constants.js    # System-wide constants (Roles, Statuses, Categories)
│   ├── helpers.js      # Reusable utilities (pagination, formatting)
│   ├── logger.js       # Console/File logging configuration
│   ├── response.js     # Standardized API response formatters (sendSuccess, sendError)
│   └── validator.js    # Data validation helpers
│
├── app.js              # Express app setup, middleware, and route mounting
├── server.js           # Server entry point and database connection initialization
├── .env                # Secret environment variables (ignored in Git)
└── package.json        # Project dependencies and scripts
```

---

## 🌐 Full API Reference

All requests must have the `Content-Type: application/json` header unless uploading a file (`multipart/form-data`). 
Protected routes require an `Authorization: Bearer <token>` header.

### 🔐 Auth (`/api/auth`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/register` | Register new user | No | Any |
| POST | `/login` | Login user | No | Any |
| POST | `/refresh-token` | Refresh JWT token | No | Any |
| GET | `/me` | Get current user profile | Yes | Any |
| PUT | `/profile` | Update profile fields | Yes | Any |
| POST | `/logout` | Logout user | Yes | Any |

### 👥 Users (`/api/users`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all users (paginated/filtered) | Yes | Admin |
| GET | `/:id` | Get user by ID | Yes | Any |
| PUT | `/:id` | Update user role/status | Yes | Admin |
| DELETE | `/:id` | Delete user | Yes | Admin |

### 📄 Documents (`/api/documents`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/upload` | Upload PDF/DOCX/PPT | Yes | Any |
| GET | `/` | List documents (filtered) | Yes | Any |
| GET | `/:id` | Get document details | Yes | Any |
| PUT | `/:id` | Update metadata | Yes | Owner/Admin |
| DELETE | `/:id` | Delete document | Yes | Owner/Admin |
| GET | `/:id/download`| Download file | Yes | Any |

### 🧠 AI Integration (`/api/ai`) - *Calls Python Backend*
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/chat` | Chat with document/general context | Yes | Any |
| POST | `/summary` | Generate document summary | Yes | Any |
| POST | `/quiz` | Generate MCQ quiz | Yes | Any |
| POST | `/viva` | Generate Viva questions | Yes | Any |
| POST | `/recommend` | Recommend study resources | Yes | Any |
| POST | `/pyq` | Analyze Past Year Questions | Yes | Any |
| POST | `/syllabus` | Analyze Syllabus alignment | Yes | Any |

### 🛡️ Admin (`/api/admin`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| PUT | `/documents/:id/approve` | Approve a document | Yes | Admin |
| PUT | `/documents/:id/reject` | Reject a document | Yes | Admin |
| PUT | `/assign-faculty` | Assign faculty role | Yes | Admin |
| GET | `/users` | Manage users dashboard | Yes | Admin |

### 📊 Analytics (`/api/analytics`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/dashboard` | Main dashboard statistics | Yes | Any |
| GET | `/uploads` | Upload metrics by category | Yes | Any |
| GET | `/subjects` | Quiz/Study stats by subject | Yes | Any |
| GET | `/activity` | User activity timeline | Yes | Any |
