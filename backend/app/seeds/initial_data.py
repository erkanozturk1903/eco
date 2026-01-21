"""
Initial seed data for Fera Danışmanlık website
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.settings import SiteSetting, HeroSlide, HeroContent, StatItem, WhyUsItem
from app.models.about import AboutContent, TeamMember, Certification, Milestone
from app.models.service import Service, ServiceItem, ProcessStep
from app.models.article import ArticleCategory, Article


# ============ Site Settings ============
INITIAL_SETTINGS = [
    # General
    {"key": "company_name", "value": "Fera Danışmanlık", "category": "general"},
    {"key": "logo_url", "value": "/fera_logo.png", "category": "general"},
    {"key": "tagline", "value": "Sürdürülebilirlik Danışmanlığı", "category": "general"},
    {"key": "footer_text", "value": "Türkiye'nin lider ESG ve sürdürülebilirlik danışmanlık şirketi. TSRS uyumluluk, karbon ayak izi hesaplama ve sürdürülebilirlik raporlama hizmetleri.", "category": "general"},
    {"key": "copyright_text", "value": "© 2024 Fera Danışmanlık. Tüm hakları saklıdır.", "category": "general"},

    # Contact
    {"key": "email", "value": "info@feradanismanlik.com.tr", "category": "contact"},
    {"key": "phone1", "value": "+90 530 976 7938", "category": "contact"},
    {"key": "phone2", "value": "+90 532 431 1675", "category": "contact"},
    {"key": "address", "value": "Merkez Mahallesi Mülkiye Sokak Nexonya Köyiçi Evleri A Bl D:14 Çekmeköy İstanbul", "category": "contact"},
    {"key": "working_hours", "value": "Pazartesi-Cuma, 09:00-18:00", "category": "contact"},

    # Social
    {"key": "linkedin_url", "value": "", "category": "social"},
    {"key": "twitter_url", "value": "", "category": "social"},
    {"key": "instagram_url", "value": "", "category": "social"},
    {"key": "facebook_url", "value": "", "category": "social"},
]


# ============ Hero Slides ============
INITIAL_HERO_SLIDES = [
    {"image_url": "/assets/slayt1.png", "text_position": "bottom-left", "show_text": False, "order": 0, "is_active": True},
    {"image_url": "/assets/slayt4.png", "text_position": "center", "show_text": True, "order": 1, "is_active": True},
    {"image_url": "/assets/slayt5.png", "text_position": "center", "show_text": True, "order": 2, "is_active": True},
    {"image_url": "/assets/slayt7.png", "text_position": "center", "show_text": True, "order": 3, "is_active": True},
]


# ============ Hero Content ============
INITIAL_HERO_CONTENT = {
    "title": "Sürdürülebilir bir gelecek için\ninsan, strateji ve teknoloji odaklı çözümler",
    "subtitle": "Her kurumun kendi kültüründen doğan, insandan güç alan, stratejiyle yön bulan ve teknolojiyle hız kazanan çözümler geliştiriyoruz."
}


# ============ Stats ============
INITIAL_STATS = [
    {"icon": "Building2", "value": "750+", "label": "Şirket", "description": "Güvenen kurum sayısı", "order": 0, "is_active": True},
    {"icon": "TreeDeciduous", "value": "3.5M+", "label": "Ton CO2e", "description": "Hesaplanan emisyon", "order": 1, "is_active": True},
    {"icon": "FileCheck", "value": "%99.9", "label": "Doğruluk", "description": "Hesaplama doğruluğu", "order": 2, "is_active": True},
    {"icon": "Clock", "value": "24/7", "label": "Destek", "description": "Teknik destek", "order": 3, "is_active": True},
]


# ============ Why Us Items ============
INITIAL_WHY_US = [
    {"icon": "FileSpreadsheet", "title": "TSRS Platformu", "description": "Türkiye'nin ilk TSRS-native platformu", "order": 0, "is_active": True},
    {"icon": "Cpu", "title": "AI Destekli", "description": "Yapay zeka ile otomatik veri analizi", "order": 1, "is_active": True},
    {"icon": "Users", "title": "Uzman Desteği", "description": "Deneyimli sürdürülebilirlik uzmanları", "order": 2, "is_active": True},
]


# ============ About Content ============
INITIAL_ABOUT_CONTENT = [
    {
        "section": "intro",
        "title": "Fera Danışmanlık",
        "content": "Fera Danışmanlık, sürdürülebilirlik alanında uzmanlaşmış bir danışmanlık şirketidir. Kurumların çevresel, sosyal ve yönetişim (ESG) performanslarını iyileştirmelerine yardımcı oluyoruz."
    },
    {
        "section": "mission",
        "title": "Misyonumuz",
        "content": "İşletmelerin sürdürülebilir iş pratiklerini benimsemelerini sağlayarak, daha yeşil bir gelecek inşa etmek."
    },
    {
        "section": "vision",
        "title": "Vizyonumuz",
        "content": "Türkiye'nin lider sürdürülebilirlik danışmanlık şirketi olmak ve global standartlarda hizmet sunmak."
    },
]


# ============ Team Members ============
INITIAL_TEAM_MEMBERS = [
    {
        "name": "Eren Öztürk",
        "title": "Kurucu Ortak & CEO",
        "photo_url": "/team/eren.jpg",
        "linkedin_url": "https://linkedin.com/in/",
        "bio": "15+ yıllık sürdürülebilirlik deneyimi",
        "order": 0,
        "is_active": True
    },
    {
        "name": "Meltem Öztürk",
        "title": "Kurucu Ortak & COO",
        "photo_url": "/team/meltem.jpg",
        "linkedin_url": "https://linkedin.com/in/",
        "bio": "10+ yıllık operasyon yönetimi deneyimi",
        "order": 1,
        "is_active": True
    },
]


# ============ Certifications ============
INITIAL_CERTIFICATIONS = [
    {"short_name": "ISO 14001", "full_name": "ISO 14001 Çevre Yönetim Sistemi", "description": "Çevre Yönetim Sistemi Sertifikası", "order": 0, "is_active": True},
    {"short_name": "ISO 50001", "full_name": "ISO 50001 Enerji Yönetim Sistemi", "description": "Enerji Yönetim Sistemi Sertifikası", "order": 1, "is_active": True},
    {"short_name": "GRI", "full_name": "GRI Standartları", "description": "Global Raporlama Girişimi Standartları", "order": 2, "is_active": True},
]


# ============ Milestones ============
INITIAL_MILESTONES = [
    {"year": "2020", "title": "Kuruluş", "description": "Fera Danışmanlık kuruldu", "icon": "Flag", "color": "emerald", "order": 0, "is_active": True},
    {"year": "2021", "title": "İlk 100 Müşteri", "description": "100'ün üzerinde kurumla çalışmaya başladık", "icon": "Users", "color": "blue", "order": 1, "is_active": True},
    {"year": "2022", "title": "Platform Lansmanı", "description": "TSRS platformunu hayata geçirdik", "icon": "Rocket", "color": "purple", "order": 2, "is_active": True},
    {"year": "2023", "title": "Uluslararası Genişleme", "description": "Uluslararası pazarlara açıldık", "icon": "Globe", "color": "orange", "order": 3, "is_active": True},
]


# ============ Services ============
INITIAL_SERVICES = [
    {
        "slug": "fera-sustain",
        "title": "FERA SUSTAIN",
        "subtitle": "Sürdürülebilirlik Danışmanlığı",
        "mission": "Kurumların sürdürülebilirlik yolculuğunda stratejik ortak olmak.",
        "image_url": "/services/sustain.jpg",
        "gradient": "from-emerald-500 to-teal-600",
        "color": "emerald",
        "order": 0,
        "is_active": True,
        "items": [
            "TSRS Uyumluluk Danışmanlığı",
            "Karbon Ayak İzi Hesaplama",
            "Sürdürülebilirlik Raporlama",
            "ESG Stratejisi Geliştirme",
            "Çevresel Etki Değerlendirmesi"
        ]
    },
    {
        "slug": "fera-human",
        "title": "FERA HUMAN",
        "subtitle": "İnsan Kaynakları Danışmanlığı",
        "mission": "İnsan odaklı organizasyonlar inşa etmek.",
        "image_url": "/services/human.jpg",
        "gradient": "from-blue-500 to-indigo-600",
        "color": "blue",
        "order": 1,
        "is_active": True,
        "items": [
            "İK Strateji Danışmanlığı",
            "Yetenek Yönetimi",
            "Organizasyonel Gelişim",
            "Eğitim ve Gelişim Programları",
            "Performans Yönetimi"
        ]
    },
    {
        "slug": "fera-social",
        "title": "FERA SOCIAL",
        "subtitle": "Sosyal Sorumluluk Danışmanlığı",
        "mission": "Toplumsal değer yaratan projeler geliştirmek.",
        "image_url": "/services/social.jpg",
        "gradient": "from-purple-500 to-pink-600",
        "color": "purple",
        "order": 2,
        "is_active": True,
        "items": [
            "Kurumsal Sosyal Sorumluluk",
            "Toplumsal Etki Projeleri",
            "Paydaş İlişkileri Yönetimi",
            "Sosyal Etki Ölçümü",
            "STK İşbirlikleri"
        ]
    },
    {
        "slug": "fera-risk",
        "title": "FERA RISK",
        "subtitle": "Risk Yönetimi Danışmanlığı",
        "mission": "Kurumsal riskleri fırsata dönüştürmek.",
        "image_url": "/services/risk.jpg",
        "gradient": "from-orange-500 to-red-600",
        "color": "orange",
        "order": 3,
        "is_active": True,
        "items": [
            "Kurumsal Risk Yönetimi",
            "İklim Riski Analizi",
            "Tedarik Zinciri Risk Değerlendirmesi",
            "Düzenleyici Uyum Danışmanlığı",
            "İş Sürekliliği Planlaması"
        ]
    },
]


# ============ Process Steps ============
INITIAL_PROCESS_STEPS = [
    {"number": "01", "title": "Keşif", "description": "Mevcut durumunuzu analiz ediyor, ihtiyaçlarınızı belirliyoruz.", "icon": "Search", "order": 0, "is_active": True},
    {"number": "02", "title": "Strateji", "description": "Size özel sürdürülebilirlik stratejisi geliştiriyoruz.", "icon": "Target", "order": 1, "is_active": True},
    {"number": "03", "title": "Uygulama", "description": "Belirlenen stratejileri hayata geçiriyoruz.", "icon": "Cog", "order": 2, "is_active": True},
    {"number": "04", "title": "İzleme", "description": "Sonuçları takip ediyor, sürekli iyileştirme sağlıyoruz.", "icon": "LineChart", "order": 3, "is_active": True},
]


# ============ Article Categories ============
INITIAL_ARTICLE_CATEGORIES = [
    {"name": "Sürdürülebilirlik", "slug": "surdurulebilirlik", "color": "bg-emerald-100 text-emerald-700", "order": 0},
    {"name": "ESG", "slug": "esg", "color": "bg-blue-100 text-blue-700", "order": 1},
    {"name": "Karbon Ayak İzi", "slug": "karbon-ayak-izi", "color": "bg-purple-100 text-purple-700", "order": 2},
    {"name": "Düzenlemeler", "slug": "duzenlemeler", "color": "bg-orange-100 text-orange-700", "order": 3},
]


# ============ Articles ============
INITIAL_ARTICLES = [
    {
        "slug": "tsrs-nedir-ve-neden-onemli",
        "title": "TSRS Nedir ve Neden Önemli?",
        "excerpt": "Türkiye Sürdürülebilirlik Raporlama Standartları hakkında bilmeniz gereken her şey.",
        "content": """# TSRS Nedir?

Türkiye Sürdürülebilirlik Raporlama Standartları (TSRS), şirketlerin çevresel, sosyal ve yönetişim (ESG) performanslarını raporlamak için kullanılan ulusal standartlardır.

## Neden Önemli?

1. **Yasal Zorunluluk**: Belirli ölçekteki şirketler için zorunlu hale geldi
2. **Şeffaflık**: Paydaşlara karşı hesap verebilirlik sağlar
3. **Rekabet Avantajı**: Sürdürülebilir iş yapan şirketler öne çıkar

## Kimler Raporlama Yapmalı?

- Halka açık şirketler
- Büyük ölçekli işletmeler
- Finansal kuruluşlar
""",
        "category_slug": "surdurulebilirlik",
        "read_time": "5 dk",
        "author": "Fera Danışmanlık",
        "is_featured": True,
        "is_published": True
    },
    {
        "slug": "karbon-ayak-izi-hesaplama-rehberi",
        "title": "Karbon Ayak İzi Hesaplama Rehberi",
        "excerpt": "Kurumunuzun karbon ayak izini nasıl hesaplayacağınızı adım adım öğrenin.",
        "content": """# Karbon Ayak İzi Nedir?

Karbon ayak izi, bir kuruluşun faaliyetleri sonucunda atmosfere salınan sera gazı miktarıdır.

## Kapsam 1, 2 ve 3

### Kapsam 1 - Doğrudan Emisyonlar
- Şirketin sahip olduğu kaynaklardan çıkan emisyonlar
- Örnek: Şirket araçları, kazanlar

### Kapsam 2 - Dolaylı Emisyonlar
- Satın alınan elektrik, ısı ve buhardan kaynaklanan emisyonlar

### Kapsam 3 - Diğer Dolaylı Emisyonlar
- Tedarik zinciri, iş seyahatleri, atık yönetimi

## Hesaplama Adımları

1. Veri toplama
2. Emisyon faktörlerinin belirlenmesi
3. Hesaplama ve raporlama
""",
        "category_slug": "karbon-ayak-izi",
        "read_time": "8 dk",
        "author": "Fera Danışmanlık",
        "is_featured": True,
        "is_published": True
    },
    {
        "slug": "esg-yatirimcilari-icin-neden-kritik",
        "title": "ESG: Yatırımcılar İçin Neden Kritik?",
        "excerpt": "ESG kriterleri yatırım kararlarını nasıl etkiliyor?",
        "content": """# ESG ve Yatırım Dünyası

ESG (Çevresel, Sosyal ve Yönetişim) kriterleri, artık yatırım kararlarının ayrılmaz bir parçası.

## ESG'nin Önemi

- **Risk Yönetimi**: ESG riskleri finansal risklere dönüşebilir
- **Fırsat Yaratma**: Sürdürülebilir şirketler büyüme fırsatları yakalar
- **Regülasyon Uyumu**: Artan düzenlemelere uyum zorunluluğu

## Yatırımcılar Ne Bekliyor?

1. Şeffaf ESG raporlaması
2. Net sıfır hedefleri
3. Yönetim kurulu düzeyinde ESG gözetimi
""",
        "category_slug": "esg",
        "read_time": "6 dk",
        "author": "Fera Danışmanlık",
        "is_featured": False,
        "is_published": True
    },
]


async def seed_initial_data(db: AsyncSession) -> dict:
    """
    Seed initial data for the website.
    Returns a dict with counts of created items.
    """
    from datetime import datetime

    result = {
        "settings": 0,
        "hero_slides": 0,
        "hero_content": 0,
        "stats": 0,
        "why_us": 0,
        "about_content": 0,
        "team_members": 0,
        "certifications": 0,
        "milestones": 0,
        "services": 0,
        "process_steps": 0,
        "article_categories": 0,
        "articles": 0
    }

    # Seed Settings
    for setting_data in INITIAL_SETTINGS:
        existing = await db.execute(
            select(SiteSetting).where(SiteSetting.key == setting_data["key"])
        )
        if not existing.scalar_one_or_none():
            db.add(SiteSetting(**setting_data))
            result["settings"] += 1

    # Seed Hero Slides
    existing_slides = await db.execute(select(HeroSlide))
    if not existing_slides.scalars().first():
        for slide_data in INITIAL_HERO_SLIDES:
            db.add(HeroSlide(**slide_data))
            result["hero_slides"] += 1

    # Seed Hero Content
    existing_content = await db.execute(select(HeroContent))
    if not existing_content.scalar_one_or_none():
        db.add(HeroContent(**INITIAL_HERO_CONTENT))
        result["hero_content"] = 1

    # Seed Stats
    existing_stats = await db.execute(select(StatItem))
    if not existing_stats.scalars().first():
        for stat_data in INITIAL_STATS:
            db.add(StatItem(**stat_data))
            result["stats"] += 1

    # Seed Why Us
    existing_why_us = await db.execute(select(WhyUsItem))
    if not existing_why_us.scalars().first():
        for why_us_data in INITIAL_WHY_US:
            db.add(WhyUsItem(**why_us_data))
            result["why_us"] += 1

    # Seed About Content
    existing_about = await db.execute(select(AboutContent))
    if not existing_about.scalars().first():
        for content_data in INITIAL_ABOUT_CONTENT:
            db.add(AboutContent(**content_data))
            result["about_content"] += 1

    # Seed Team Members
    existing_team = await db.execute(select(TeamMember))
    if not existing_team.scalars().first():
        for member_data in INITIAL_TEAM_MEMBERS:
            db.add(TeamMember(**member_data))
            result["team_members"] += 1

    # Seed Certifications
    existing_certs = await db.execute(select(Certification))
    if not existing_certs.scalars().first():
        for cert_data in INITIAL_CERTIFICATIONS:
            db.add(Certification(**cert_data))
            result["certifications"] += 1

    # Seed Milestones
    existing_milestones = await db.execute(select(Milestone))
    if not existing_milestones.scalars().first():
        for milestone_data in INITIAL_MILESTONES:
            db.add(Milestone(**milestone_data))
            result["milestones"] += 1

    # Seed Process Steps
    existing_steps = await db.execute(select(ProcessStep))
    if not existing_steps.scalars().first():
        for step_data in INITIAL_PROCESS_STEPS:
            db.add(ProcessStep(**step_data))
            result["process_steps"] += 1

    # Seed Services (with items)
    existing_services = await db.execute(select(Service))
    if not existing_services.scalars().first():
        for service_data in INITIAL_SERVICES:
            items = service_data.pop("items", [])
            service = Service(**service_data)
            db.add(service)
            await db.flush()  # Get the service ID

            for idx, item_desc in enumerate(items):
                item = ServiceItem(
                    service_id=service.id,
                    description=item_desc,
                    order=idx
                )
                db.add(item)

            result["services"] += 1

    # Seed Article Categories
    category_map = {}
    existing_categories = await db.execute(select(ArticleCategory))
    if not existing_categories.scalars().first():
        for cat_data in INITIAL_ARTICLE_CATEGORIES:
            category = ArticleCategory(**cat_data)
            db.add(category)
            await db.flush()
            category_map[cat_data["slug"]] = category.id
            result["article_categories"] += 1
    else:
        # Get existing categories for mapping
        all_cats = await db.execute(select(ArticleCategory))
        for cat in all_cats.scalars().all():
            category_map[cat.slug] = cat.id

    # Seed Articles
    existing_articles = await db.execute(select(Article))
    if not existing_articles.scalars().first():
        for article_data in INITIAL_ARTICLES:
            category_slug = article_data.pop("category_slug", None)
            article_dict = {**article_data}
            if category_slug and category_slug in category_map:
                article_dict["category_id"] = category_map[category_slug]
            if article_dict.get("is_published"):
                article_dict["published_at"] = datetime.utcnow()
            db.add(Article(**article_dict))
            result["articles"] += 1

    await db.commit()
    return result
