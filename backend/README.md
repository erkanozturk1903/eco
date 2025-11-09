# EcoConsult Backend API

FastAPI backend with PostgreSQL, Redis, and ML/AI support for sustainability analytics.

## 🚀 Quick Start

### Basic Setup (Postgres + Redis + Backend)
```bash
docker-compose up -d
```

API will be available at: http://localhost:8002

### With Development Tools (Jupyter + MinIO)
```bash
docker-compose --profile dev up -d
```

- API: http://localhost:8002
- Jupyter Lab: http://localhost:8888
- MinIO Console: http://localhost:9001
- API Docs: http://localhost:8002/api/docs

### With Celery Worker (for async ML tasks)
```bash
docker-compose --profile worker up -d
```

## 📦 Services

| Service | Port | Description |
|---------|------|-------------|
| Backend API | 8002 | FastAPI application |
| PostgreSQL | 5434 | Database with pgvector extension |
| Redis | 6380 | Caching & task queue |
| Jupyter Lab | 8888 | ML development (profile: dev) |
| MinIO | 9000/9001 | Model storage (profile: dev) |
| Celery Worker | - | Async tasks (profile: worker) |

## 🗂️ Project Structure

```
backend/
├── app/                    # FastAPI application
│   ├── main.py            # App entry point
│   ├── core/              # Config, database
│   ├── api/               # API endpoints
│   └── models/            # SQLAlchemy models
├── models/                # ML models storage
├── notebooks/             # Jupyter notebooks
├── data/                  # Training data
├── uploads/               # File uploads
├── init-scripts/          # Database init scripts
├── docker-compose.yml     # Docker orchestration
├── Dockerfile             # Backend container
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables
```

## 🔧 Environment Variables

Edit `.env` file:

```bash
# Database
POSTGRES_PORT=5434
POSTGRES_DB=eco_database
POSTGRES_USER=eco_user
POSTGRES_PASSWORD=eco_password

# Redis
REDIS_PORT=6380

# Backend
BACKEND_PORT=8002
DEBUG=True
SECRET_KEY=your-secret-key

# ML/AI
ML_MODEL_PATH=/app/models
```

## 🧪 Testing the API

```bash
# Health check
curl http://localhost:8002/health

# Database health
curl http://localhost:8002/api/v1/health/db

# API documentation
open http://localhost:8002/api/docs
```

## 📊 ML/AI Features

### pgvector Extension
PostgreSQL with pgvector extension for:
- Semantic search
- Document embeddings
- Similarity queries

### Redis for ML
- Model predictions caching
- Task queue for async processing
- Session storage

### Jupyter Notebooks
Development environment for:
- Data analysis
- Model training
- Experimentation

## 🛠️ Development Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Rebuild after code changes
docker-compose up -d --build backend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Access database
docker exec -it eco-postgres psql -U eco_user -d eco_database

# Access Redis CLI
docker exec -it eco-redis redis-cli
```

## 🚢 Production Deployment

### Railway
```bash
# Deploy to Railway
railway up

# Or use Railway CLI with docker-compose
railway link
railway up
```

### Environment Variables on Railway
Set these in Railway dashboard:
- `DATABASE_URL` (auto-provided by Railway Postgres)
- `REDIS_URL` (auto-provided by Railway Redis)
- `SECRET_KEY` (generate secure key)
- `ENVIRONMENT=production`
- `DEBUG=False`

## 📝 API Endpoints

- `GET /health` - Health check
- `GET /api/v1/health/db` - Database health
- `GET /api/v1/blog/` - Blog articles
- `GET /api/v1/services/` - Services
- `GET /api/docs` - Swagger documentation
- `GET /api/redoc` - ReDoc documentation

## 🔒 Security Notes

- Change `SECRET_KEY` in production
- Use strong passwords for database
- Enable HTTPS in production
- Don't commit `.env` file
- Review CORS_ORIGINS settings

## 🐛 Troubleshooting

### Port already in use
```bash
# Change ports in .env file
POSTGRES_PORT=5435
BACKEND_PORT=8003
REDIS_PORT=6381
```

### Database connection failed
```bash
# Check if postgres is healthy
docker-compose ps

# View postgres logs
docker-compose logs postgres
```

### Rebuild containers
```bash
docker-compose down
docker-compose up -d --build --force-recreate
```
