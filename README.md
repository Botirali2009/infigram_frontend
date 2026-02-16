# 🚀 INFIGRAM - TO'LIQ LOYIHA

**Professional Telegram Bot Management Platform**

---

## 📦 Ichida nima bor:

### **Frontend (HTML/CSS/JS):**
- ✅ `login.html` - Login sahifasi (API bilan)
- ✅ `dashboard.html` - Bot management (real-time)
- ✅ `chats.html` - Chat interface (real messages)
- ✅ `analytics.html` - Statistics (real data)
- ✅ `js/api.js` - API helper

### **Backend (Django):**
- ✅ Models (User, Bot, Chat, Message, Analytics)
- ✅ REST API (DRF)
- ✅ Admin Panel
- ✅ Webhook Handler (Telegram)

---

## 🎯 FRONTEND O'RNATISH

### **1. Fayllarni qo'yish:**

VS Code da Live Server bilan:
```
D:\Projects\infigram-frontend\
├── login.html
├── dashboard.html
├── chats.html
├── analytics.html
└── js/
    └── api.js
```

### **2. Live Server ishga tushirish:**

1. VS Code'da papkani oching
2. **Live Server** extension o'rnating
3. `login.html` ni oching
4. **"Go Live"** bosing
5. Brauzer avtomatik ochiladi: `http://127.0.0.1:5500/login.html`

---

## 🔧 BACKEND O'RNATISH

### **1. Webhook handler qo'shish:**

`bots/webhook.py` faylini yarating va `webhook_handler.py` dan kod ko'chiring.

### **2. URLs yangilash:**

`bots/urls.py` ga qo'shing:
```python
from .webhook import telegram_webhook

urlpatterns = [
    # ... existing urls
    path('webhook/<int:bot_id>/', telegram_webhook, name='webhook'),
]
```

### **3. Settings yangilash:**

`infigram_backend/settings.py`:
```python
ALLOWED_HOSTS = ['*']  # Development uchun

# Logging
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```

### **4. Server ishga tushirish:**

```bash
cd D:\BACKEND\Komiljon xamidjonov\INFIGRAM
python manage.py runserver
```

---

## 🤖 TELEGRAM BOT SOZLASH

### **1. Bot yaratish:**

1. Telegram'da **@BotFather** ga o'ting
2. `/newbot` yuboring
3. Bot nomini kiriting: `Infigram Test Bot`
4. Username: `infigram_test_bot`
5. **Token oling**: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### **2. Bot qo'shish (Frontend):**

1. `http://127.0.0.1:5500/login.html` - Login qiling
2. Dashboard'da **"Add New Bot"** bosing
3. Bot ma'lumotlarini kiriting:
   - **Name:** Support Bot
   - **Token:** (BotFather'dan olgan token)
   - **Description:** Customer support bot
4. **Add Bot** bosing

Bot muvaffaqiyatli qo'shiladi! ✅

---

## 🌐 WEBHOOK O'RNATISH (Production)

### **Local Testing (ngrok):**

```bash
# 1. ngrok o'rnating
# https://ngrok.com/download

# 2. Django serverni ishga tushiring
python manage.py runserver

# 3. Yangi terminal'da ngrok ishga tushiring
ngrok http 8000

# 4. ngrok sizga URL beradi:
# https://abc123.ngrok.io
```

### **Webhook o'rnatish:**

Python shell'da:
```python
python manage.py shell

from bots.models import Bot
bot = Bot.objects.first()

# Token
token = bot.decrypt_token()

# Webhook URL
webhook_url = "https://abc123.ngrok.io/api/webhook/{}/".format(bot.id)

# Set webhook
import requests
response = requests.post(
    f'https://api.telegram.org/bot{token}/setWebhook',
    json={'url': webhook_url}
)
print(response.json())
```

Natija: `{"ok": true, "result": true}`

---

## 🧪 TEST QILISH

### **1. Bot'ga xabar yuboring:**

Telegram'da botingizni oching va xabar yuboring:
```
Salom!
```

### **2. Frontend'da tekshiring:**

1. `http://127.0.0.1:5500/chats.html`
2. Botni tanlang
3. Chat ochiladi
4. Xabarlar ko'rinadi! 🎉

### **3. Xabar yuborish:**

Frontend'dan bot orqali foydalanuvchiga javob yuboring!

---

## 🔥 AUTO-REPLY SOZLASH

### **Admin panel'da:**

1. `http://127.0.0.1:8000/admin/`
2. **Bots** → **Auto Reply Rules** → **Add**
3. Ma'lumotlar:
   - **Bot:** Support Bot
   - **Keywords:** `narx, price, qancha`
   - **Reply text:** `Narxlar haqida ma'lumot: /katalog`
   - **Is active:** ✓
   - **Priority:** 1
4. **Save**

Endi bot "narx", "price", "qancha" so'zlariga avtomatik javob beradi! ✅

---

## 📊 FEATURES

### **Dashboard:**
- ✅ Real-time bot statistics
- ✅ Bot qo'shish/o'chirish
- ✅ Status monitoring
- ✅ Auto-refresh (30 sekund)

### **Chats:**
- ✅ Real-time xabarlar
- ✅ Xabar yuborish
- ✅ Chat list
- ✅ Online/Offline status
- ✅ Auto-refresh (3 sekund)
- ✅ Dark mode

### **Analytics:**
- ✅ Charts (Message activity, User growth)
- ✅ Bot performance
- ✅ Statistics
- ✅ Bot selector

### **Backend:**
- ✅ Webhook handler
- ✅ Auto-reply rules
- ✅ FAQ
- ✅ Message history
- ✅ User management

---

## 🚀 PRODUCTION DEPLOY

### **Frontend:**

Vercel, Netlify yoki GitHub Pages:
```bash
# js/api.js da API URL'ni o'zgartiring:
BASE_URL: 'https://api.infigram.uz'  # Production URL
```

### **Backend:**

Railway, Heroku, DigitalOcean:
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['api.infigram.uz']

# PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'infigram_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'db.railway.app',
        'PORT': '5432',
    }
}
```

---

## 📝 API ENDPOINTS

```
POST   /api/auth/login/              - Login
POST   /api/auth/register/           - Register
GET    /api/auth/profile/            - Get profile

GET    /api/bots/                    - Get all bots
POST   /api/bots/                    - Create bot
GET    /api/bots/{id}/               - Get bot detail
PUT    /api/bots/{id}/               - Update bot
DELETE /api/bots/{id}/               - Delete bot

GET    /api/bot/{bot_id}/chats/     - Get chats
GET    /api/chats/{id}/              - Get chat detail

GET    /api/messages/chat/{chat_id}/messages/  - Get messages
POST   /api/messages/send/           - Send message

POST   /api/webhook/{bot_id}/        - Telegram webhook
```

---

## 🐛 TROUBLESHOOTING

### **CORS xatosi:**
```python
# settings.py
CORS_ALLOW_ALL_ORIGINS = True
```

### **Webhook ishlamayapti:**
```bash
# ngrok ishga tushiring
ngrok http 8000

# Webhook'ni qayta o'rnating
```

### **Xabarlar ko'rinmayapti:**
```bash
# Database tekshiring
python manage.py shell
from bot_messages.models import Message
Message.objects.all()
```

---

## 📞 SUPPORT

- **Telegram:** @infigram_support
- **Email:** support@infigram.uz
- **GitHub:** github.com/infigram

---

## 🎉 CONGRATULATIONS!

To'liq ishlaydigan Telegram Bot Management Platform tayyor!

**Next Steps:**
1. ✅ Production'ga deploy qiling
2. ✅ Custom domain qo'shing
3. ✅ SSL certificate o'rnating
4. ✅ Payment integration qo'shing
5. ✅ Marketing boshlang!

---

Made with ❤️ by Botirali
