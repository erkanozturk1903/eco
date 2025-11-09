# EcoConsult - Sustainability & ESG Platform

Modern sürdürülebilirlik danışmanlık platformu. Türkiye'nin ESG (Çevre, Sosyal, Yönetişim) alanında lider dijital çözümü.

## 🏗️ Monorepo Structure

```
eco/
├── frontend/              # React + TypeScript + Vite
│   ├── src/              # React components & pages
│   └── package.json
├── backend/              # FastAPI + PostgreSQL + Redis + ML/AI
│   ├── app/             # FastAPI application
│   ├── models/          # ML models
│   ├── notebooks/       # Jupyter notebooks
│   ├── docker-compose.yml
│   └── Dockerfile
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for frontend development)
- Python 3.12+ (for backend development)

### 1. Backend (FastAPI + PostgreSQL + Redis)

```bash
cd backend
docker-compose up -d
```

Backend API: http://localhost:8002
API Docs: http://localhost:8002/api/docs
PostgreSQL: localhost:5434
Redis: localhost:6380

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## 📦 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **TanStack Query** - Data fetching
- **React Router v6** - Routing

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL 16** - Database with **pgvector** for AI/ML
- **Redis** - Caching & task queue
- **SQLAlchemy** - ORM (async)
- **Alembic** - Database migrations
- **Pydantic** - Data validation
- **JWT** - Authentication

### ML/AI Ready
- **pgvector** - Vector embeddings for semantic search
- **Redis** - ML predictions caching
- **Jupyter** - Data analysis & model training
- **MinIO** - Model storage (optional)
- **Celery** - Async ML tasks (optional)

## 🛠️ Development

### Backend Development

```bash
cd backend

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Database migrations
docker exec -it eco-backend alembic upgrade head

# Access PostgreSQL
docker exec -it eco-postgres psql -U eco_user -d eco_database

# Access Redis
docker exec -it eco-redis redis-cli

# With Jupyter & MinIO
docker-compose --profile dev up -d
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Backend API | 8002 | FastAPI application |
| PostgreSQL | 5434 | Database with pgvector |
| Redis | 6380 | Caching & task queue |
| Jupyter | 8888 | ML development (--profile dev) |
| MinIO | 9000/9001 | Model storage (--profile dev) |
| Frontend | 5173 | React development server |

## 🔐 Environment Variables

### Backend (.env)
```bash
# Database
POSTGRES_DB=eco_database
POSTGRES_USER=eco_user
POSTGRES_PASSWORD=your-secure-password
POSTGRES_PORT=5434

# Redis
REDIS_PORT=6380

# Backend
BACKEND_PORT=8002
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
ENVIRONMENT=development

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:8080
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8002
```

## 📚 API Documentation

- **Swagger UI**: http://localhost:8002/api/docs
- **ReDoc**: http://localhost:8002/api/redoc

## 🚢 Deployment

### Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy backend
cd backend
railway up

# Add PostgreSQL & Redis from Railway dashboard
```

### Manual Deployment

1. Set environment variables in production
2. Build frontend: `npm run build`
3. Deploy backend with Docker
4. Configure domain & SSL

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📝 Project Features

- ✅ Modern React frontend with TypeScript
- ✅ FastAPI backend with async support
- ✅ PostgreSQL with pgvector for AI/ML
- ✅ Redis for caching & task queues
- ✅ Docker containerization
- ✅ Hot reload for development
- ✅ API documentation (Swagger/ReDoc)
- ✅ JWT authentication
- ✅ File upload support
- 🔜 Database migrations (Alembic)
- 🔜 Admin panel
- 🔜 ML/AI integrations
- 🔜 ESG analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🙋 Support

For support, email info@feradanismanlik.com.tr or visit https://feradanismanlik.com.tr

---

**Made with ❤️ for a sustainable future**
