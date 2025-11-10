# ECO - Sustainability Consulting Platform (Frontend)

Modern, responsive web uygulaması - Türkiye'nin ilk TSRS-Native ESG platformu.

## 🚀 Teknolojiler

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Radix UI** - Accessible UI components
- **React Query** - Server state management
- **Lucide React** - Icon library

## 📦 Kurulum

```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev

# http://localhost:8080 adresinde çalışacak
```

## 🛠️ Komutlar

```bash
# Development
npm run dev              # Development server (port 8080)

# Build
npm run build           # Production build
npm run build:dev       # Development build

# Preview
npm run preview         # Preview production build locally

# Production
npm start               # Serve production build (Railway'de kullanılır)

# Lint
npm run lint            # ESLint kontrolü
```

## 📁 Proje Yapısı

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/ui components
│   │   └── ...          # Feature components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── main.tsx         # App entry point
├── public/              # Static assets
└── index.html          # HTML template
```

## 🌐 Sayfalar

- `/` - Ana sayfa (Hero, Stats, Services, Why Us)
- `/hizmetler` - Hizmetler sayfası
- `/hakkimizda` - Hakkımızda sayfası
- `/iletisim` - İletişim formu
- `/kaynaklar` - Kaynaklar sayfası

## 🎨 UI Components

Aktif olarak kullanılan shadcn/ui components:

- Button
- Card & Badge
- Input, Label, Textarea
- Select & Checkbox
- Toast & Sonner
- Tooltip

## 🚢 Deployment

### Railway.app

Proje Railway'de otomatik deploy edilmektedir:

- **Production URL:** https://www.feradanismanlik.com.tr
- **Railway URL:** https://eco-production.up.railway.app

Railway her GitHub push'ta otomatik build ve deploy yapar.

### Environment Variables

Production'da environment variable'lara ihtiyaç yoktur. Statik bir SPA olarak çalışır.

## 🔧 Development

### Port Configuration

- **Local:** 8080 (vite.config.ts)
- **Production:** Railway'in PORT environment variable'ını kullanır

### Build Optimization

Vite config'de chunk optimization aktiftir:
- React vendor bundle
- Radix UI components bundle
- TanStack Query bundle

## 📝 License

Private - Tüm hakları saklıdır.

## 🤝 Katkı

Bu proje aktif geliştirme aşamasındadır. Backend entegrasyonu yakında eklenecektir.
