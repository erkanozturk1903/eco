# Railway Backend Deployment Rehberi

## Mevcut Durum
- **Frontend:** Railway'de deploy edilmiş, GitHub push ile auto-deploy
- **Backend:** Kod hazır, Railway'e eklenmesi gerekiyor
- **Database:** PostgreSQL eklenmesi gerekiyor

---

## Adım 1: Railway'de PostgreSQL Ekle

1. **Railway Dashboard'a git:** https://railway.app/dashboard
2. Mevcut projeyi (frontend'in olduğu proje) aç
3. **"New"** butonuna tıkla → **"Database"** → **"PostgreSQL"** seç
4. PostgreSQL oluşturulacak ve otomatik olarak environment variables tanımlanacak

### PostgreSQL Oluştuktan Sonra:
- `DATABASE_URL` otomatik olarak oluşacak
- Bu değeri not al (backend için kullanacaksın)

---

## Adım 2: Railway'de Backend Service Ekle

1. Aynı projede **"New"** → **"GitHub Repo"** tıkla
2. **eco** repository'sini seç
3. **Root Directory** olarak **`backend`** yaz (ÖNEMLİ!)
4. Deploy başlayacak

---

## Adım 3: Backend Environment Variables

Backend service'ine tıkla → **"Variables"** sekmesi → Aşağıdakileri ekle:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (Railway reference) |
| `SECRET_KEY` | `guclu-bir-secret-key-buraya-yaz-32-karakter` |
| `CORS_ORIGINS` | `https://feradanismanlik.com.tr,https://www.feradanismanlik.com.tr` |
| `ENVIRONMENT` | `production` |
| `PORT` | `8000` |

### DATABASE_URL için:
- PostgreSQL service'ine tıkla
- **"Connect"** sekmesi
- **"DATABASE_URL"** değerini kopyala
- Backend variables'a yapıştır

VEYA Railway reference syntax kullan:
```
${{Postgres.DATABASE_URL}}
```

---

## Adım 4: Frontend Environment Variables

Frontend service'ine tıkla → **"Variables"** sekmesi:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://<backend-domain>.railway.app/api/v1` |

### Backend Domain'i Bulmak:
1. Backend service tıkla
2. **"Settings"** → **"Networking"** → **"Public Networking"**
3. **"Generate Domain"** tıkla
4. Oluşan URL'i kopyala (örn: `eco-backend-production-xxxx.up.railway.app`)
5. Frontend'e ekle: `https://eco-backend-production-xxxx.up.railway.app/api/v1`

---

## Adım 5: Redeploy

Environment variables ekledikten sonra:

1. **Backend:** "Deploy" → "Redeploy" tıkla
2. **Frontend:** "Deploy" → "Redeploy" tıkla (VITE_API_URL build time'da gerekli)

---

## Kontrol Listesi

```
[ ] PostgreSQL eklendi
[ ] Backend service eklendi (root: backend)
[ ] Backend env vars eklendi:
    [ ] DATABASE_URL
    [ ] SECRET_KEY
    [ ] CORS_ORIGINS
    [ ] ENVIRONMENT
    [ ] PORT
[ ] Backend domain oluşturuldu
[ ] Frontend env vars eklendi:
    [ ] VITE_API_URL
[ ] Backend redeploy edildi
[ ] Frontend redeploy edildi
```

---

## Test

### Backend Test:
```
https://<backend-domain>.railway.app/health
```
Beklenen yanıt:
```json
{"status": "healthy", "timestamp": 123456789, "environment": "production"}
```

### API Docs Test:
```
https://<backend-domain>.railway.app/api/docs
```

### Frontend Test:
```
https://feradanismanlik.com.tr
```
- Admin login çalışmalı
- API istekleri backend'e gitmeli

---

## Sorun Giderme

### "CORS Error" Hatası:
- Backend `CORS_ORIGINS` değerini kontrol et
- Frontend domain'inin tam olarak yazıldığından emin ol
- `https://` dahil olmalı

### "Database Connection Error":
- `DATABASE_URL` doğru mu kontrol et
- PostgreSQL service çalışıyor mu kontrol et

### "404 Not Found" API İsteklerinde:
- `VITE_API_URL` doğru mu kontrol et
- `/api/v1` suffix'i var mı kontrol et
- Frontend'i redeploy et (env var değişikliği için)

### Admin Login Çalışmıyor:
- Backend'de ilk kullanıcı oluştur:
  - `https://<backend>/api/docs` → `/api/v1/auth/register` endpoint'ini kullan

---

## URL'ler

| Servis | URL |
|--------|-----|
| Frontend | https://feradanismanlik.com.tr |
| Backend API | https://<backend-domain>.railway.app |
| API Docs | https://<backend-domain>.railway.app/api/docs |
| Health Check | https://<backend-domain>.railway.app/health |
