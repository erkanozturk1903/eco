# 🌐 RAILWAY DOMAIN KURULUMU - FERADANISMANLIK.COM.TR

## 📋 RAILWAY DASHBOARD ADIMLAR

### **1. Railway URL'inizi Bulun:**

1. **Railway Dashboard'a gidin:** https://railway.app/dashboard
2. **il-ad (veya frontend) projenizi seçin**
3. **Settings → Domains sekmesine gidin**
4. Orada şöyle bir URL göreceksiniz:
   ```
   https://xxxxxxx.up.railway.app
   veya
   https://il-ad-production-xxxx.up.railway.app
   ```

**Bu URL'i not alın!** ⬅️ Önemli

---

## 🌐 IHS.COM DNS AYARLARI (DETAYLI)

### **ADIM 1: IHS Panel'e Giriş**

1. **https://panel.ihs.com.tr/** adresine gidin
2. Giriş yapın (kullanıcı adı + şifre)
3. **"Domain Yönetimi"** veya **"DNS Yönetimi"** bölümüne tıklayın
4. **feradanismanlik.com.tr** domain'ini seçin

---

### **ADIM 2: Mevcut DNS Kayıtlarını Kontrol Edin**

Eğer varsa şunları **SİLİN:**
```
❌ @ (root) → Herhangi bir A kaydı
❌ www → Herhangi bir A kaydı
❌ @ → Herhangi bir CNAME kaydı
```

**⚠️ DİKKAT:** Sadece @ ve www ile ilgili kayıtları silin. Mail (MX) kayıtlarına dokunmayın!

---

### **ADIM 3: Yeni DNS Kayıtlarını Ekleyin**

#### **KAYIT 1: Root Domain (feradanismanlik.com.tr)**

```
┌─────────────────────────────────────────────────┐
│ Kayıt Tipi:    CNAME                            │
│ Host/Name:     @                                │
│ Değer/Value:   [RAILWAY_URL].up.railway.app    │
│ TTL:           3600                             │
│                                                 │
│ [KAYDET]                                        │
└─────────────────────────────────────────────────┘
```

**Örnek:**
```
Host:  @
Değer: il-ad-production-abc123.up.railway.app
```

---

#### **KAYIT 2: WWW Subdomain (www.feradanismanlik.com.tr)**

```
┌─────────────────────────────────────────────────┐
│ Kayıt Tipi:    CNAME                            │
│ Host/Name:     www                              │
│ Değer/Value:   [RAILWAY_URL].up.railway.app    │
│ TTL:           3600                             │
│                                                 │
│ [KAYDET]                                        │
└─────────────────────────────────────────────────┘
```

**Örnek:**
```
Host:  www
Değer: il-ad-production-abc123.up.railway.app
```

---

### **ADIM 4: Railway'de Domain Ekleme**

1. **Railway Dashboard → Settings → Domains**

2. **"Custom Domain" butonuna tıklayın**

3. **İki domain ekleyin:**

**Birinci domain:**
```
Domain: feradanismanlik.com.tr
[Add Domain]
```

**İkinci domain:**
```
Domain: www.feradanismanlik.com.tr
[Add Domain]
```

4. Railway otomatik SSL sertifikası oluşturacak (5-10 dk)

---

## ⏱️ PROPAGASYON & DOĞRULAMA

### **Bekleme Süresi:**
- **En hızlı:** 5-10 dakika
- **Ortalama:** 30 dakika - 2 saat
- **Maksimum:** 24-48 saat (nadir)

### **Test Etme:**

**1. Terminal'den test:**
```bash
# Root domain test
nslookup feradanismanlik.com.tr

# WWW test
nslookup www.feradanismanlik.com.tr

# Görmeniz gereken:
# Name: feradanismanlik.com.tr
# Address: [Railway IP]
```

**2. Online tools:**
- https://www.whatsmydns.net/
  - `feradanismanlik.com.tr` girin
  - Type: CNAME seçin
  - Dünya çapında propagasyonu görün

**3. Browser test:**
```
https://feradanismanlik.com.tr
https://www.feradanismanlik.com.tr

İkisi de açılmalı!
SSL kilit ikonu ✅ olmalı
```

---

## 🔧 IHS.COM PANELİNDE ÖRNEK GÖRÜNÜM

```
╔══════════════════════════════════════════════════════╗
║          DNS YÖNETİMİ - feradanismanlik.com.tr       ║
╠══════════════════════════════════════════════════════╣
║ Tip    │ Host  │ Değer                        │ TTL  ║
╠════════╪═══════╪══════════════════════════════╪══════╣
║ CNAME  │ @     │ il-ad-production.railway.app │ 3600 ║
║ CNAME  │ www   │ il-ad-production.railway.app │ 3600 ║
║ MX     │ @     │ mail.ihs.com.tr              │ 3600 ║ ← Buna dokunma
╚════════╧═══════╧══════════════════════════════╧══════╝
```

---

## ⚠️ ÖNEMLI HUSUSLAR

### **1. Railway URL Formatı:**
```
✅ DOĞRU: il-ad-production-abc123.up.railway.app
❌ YANLIŞ: https://il-ad-production-abc123.up.railway.app
❌ YANLIŞ: il-ad-production-abc123
```

### **2. IHS.com'da @ işareti:**
- Bazı panellerde `@` yerine **boş** bırakılır
- Veya **domain adının kendisi** yazılır: `feradanismanlik.com.tr`
- IHS.com genelde `@` kabul eder

### **3. SSL Sertifikası:**
- Railway **otomatik** sağlar
- Let's Encrypt kullanır
- **ÜCRETSİZ**
- 10 dakika içinde aktif olur
- Her 90 günde otomatik yenilenir

---

## 🚨 SORUN GİDERME

### **HATA 1: "DNS_PROBE_FINISHED_NXDOMAIN"**
**Sebep:** DNS henüz propagate olmadı
**Çözüm:** 30 dakika daha bekleyin

### **HATA 2: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"**
**Sebep:** SSL henüz oluşturulmadı
**Çözüm:** Railway'de Domains sekmesinde SSL status'u kontrol edin

### **HATA 3: "This site can't be reached"**
**Sebep:** DNS kayıtları yanlış
**Çözüm:**
```bash
nslookup feradanismanlik.com.tr

# Railway URL ile eşleşmeli
# Eşleşmiyorsa IHS.com DNS ayarlarını kontrol et
```

### **HATA 4: Eski site açılıyor**
**Sebep:** Browser cache
**Çözüm:**
```
1. Ctrl + Shift + Delete (cache temizle)
2. Incognito mode'da test et
3. Farklı browser'da dene
```

---

## ✅ BAŞARILI KURULUM KONTROLÜ

Kurulum başarılı olduğunda:

```
✅ https://feradanismanlik.com.tr → Site açılıyor
✅ https://www.feradanismanlik.com.tr → Site açılıyor
✅ SSL aktif (adres çubuğunda kilit ikonu 🔒)
✅ Railway Dashboard'da domain yanında yeşil check ✓
✅ Her iki domain de aynı siteyi gösteriyor
```

---

## 🎯 SUPABASE AUTH URL GÜNCELLEMESİ (ÖNEMLİ!)

Domain çalışmaya başladıktan sonra **mutlaka** yapın:

1. **Supabase Dashboard:** https://supabase.com/dashboard
2. Projeniz → **Authentication** → **URL Configuration**
3. **Redirect URLs'e ekleyin:**
   ```
   https://feradanismanlik.com.tr
   https://feradanismanlik.com.tr/**
   https://www.feradanismanlik.com.tr
   https://www.feradanismanlik.com.tr/**
   ```

4. **Site URL güncelleyin:**
   ```
   https://feradanismanlik.com.tr
   ```

5. **Save Changes**

**Bunu yapmazsanız admin login çalışmaz!** ⚠️

---

## 📝 ÖZET CHECKLIST

```
☐ Railway Dashboard'dan deployment URL'i aldım
☐ IHS.com paneline giriş yaptım
☐ Eski DNS kayıtlarını sildim (@ ve www)
☐ CNAME kaydı ekledim: @ → [railway-url].up.railway.app
☐ CNAME kaydı ekledim: www → [railway-url].up.railway.app
☐ Railway'e custom domain ekledim: feradanismanlik.com.tr
☐ Railway'e custom domain ekledim: www.feradanismanlik.com.tr
☐ 30 dakika bekledim
☐ Browser'da test ettim - çalışıyor ✅
☐ SSL aktif - kilit ikonu ✅
☐ Supabase Auth URL'lerini güncelledim ✅
```

---

## 🚀 BİTİRDİKTEN SONRA

Domain çalıştıktan sonra test edin:

1. **Ana sayfa:** https://feradanismanlik.com.tr
2. **Hizmetler:** https://feradanismanlik.com.tr/hizmetler
3. **Admin login:** https://feradanismanlik.com.tr/admin/login
4. **Contact form:** Bir test formu gönderin

Hepsi çalışıyorsa **TAMAMDIR!** 🎉

---

## 📞 RAILWAY URL NEREDEN BULUNUR?

1. Railway Dashboard: https://railway.app/dashboard
2. Projenizi seçin
3. **Settings** → **Domains**
4. "Domains" başlığı altında göreceksiniz:
   - **Generated Domain:** `xxxxxx.up.railway.app` ← BU!
   - Bu URL'i kopyalayın
   - IHS.com DNS ayarlarında kullanın

---

## 🔗 YARARLІ LİNKLER

- Railway Dashboard: https://railway.app/dashboard
- IHS Panel: https://panel.ihs.com.tr/
- DNS Test: https://www.whatsmydns.net/
- Supabase Dashboard: https://supabase.com/dashboard
- SSL Test: https://www.ssllabs.com/ssltest/

---

**NOT:** Railway URL'inizi bulduktan sonra bu dokümandaki `[RAILWAY_URL]` yazan yerlere o URL'i yazın!
