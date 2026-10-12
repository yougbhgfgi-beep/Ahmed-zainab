# 🎂 موقع عيد ميلاد أحمد

موقع مفاجأة بسيط، كلمة السر الخاصة بيه تفتح رسالة وتورتة ومعرض صور وفيديو.

---

## 🔐 كلمة السر

كلمة السر الحالية: **سبايطر**

---

## ✏️ إزاي تعدّل أي حاجة في الموقع؟

كل حاجة (الكلام، الاسم، التاريخ، كلمة السر، الصور) موجودة في ملف واحد بس:

```
src/config/content.ts
```

افتحه وغيّر اللي تحبه، وخلاص. مفيش داعي تلمس أي ملف تاني.

### أمثلة سريعة

| عايز تغيّر إيه | تعدّل إيه في `content.ts` |
|----------------|---------------------------|
| كلمة السر | مصفوفة `passwords` |
| اسم صاحب العيد | `recipient.name` , `recipient.nickname` |
| تاريخ الميلاد | `recipient.birthDate` (سنة-شهر-يوم) |
| كلام المقدمة | `heroContent` |
| الرسالة الطويلة | `envelopeContent.paragraphs` |
| رسالة المفاجأة | `magicContent` |
| كلام التورتة والأمنية | `cakeContent` |
| ليه بحبك + الذكريات | `reasonsContent` |
| كلام الخاتمة | `outroContent.lines` |

> بعد أي تعديل، شغّل `npm run build` تاني (أو `npm run deploy` عشان يترفع تلقائي).

---

## 🖼️ الصور

- حط صورك في المجلد: **`src/assets/gallery/`**
- سمّيها `01.jpeg` و `02.jpeg` و `03.jpeg` ... وهكذا.
- هتظهر في المعرض تلقائيًا ومرتّبة بالاسم. مفيش كلام بيتحط على الصور.

## 🎬 الأغنية والفيديو

- الأغنية: حطّها في `public/music.mp3` — وبتشتغل لوحدها أول ما تبدأ تكتب كلمة السر 🎵
- الفيديو: حطّه في `public/video.mp4` بنفس الاسم.

---

## ▶️ التشغيل محليًا

```bash
npm install
npm run dev
```

## 📦 البناء والرفع

```bash
npm run build     # يطلّع الموقع جاهز في مجلد dist
npm run deploy    # يطلّعه على GitHub Pages تلقائيًا
```

لينك الموقع بعد الرفع:

```
https://yougbhgfgi-beep.github.io/Ahmed-zainab/
```

---

## 🗂️ شكل المشروع

```
src/
├── config/
│   └── content.ts      ← كل المحتوى (عدّل من هنا)
├── assets/
│   └── gallery/        ← صور المعرض
├── components/         ← أجزاء الموقع (مش محتاج تعدّلها)
│   ├── LoginPage.tsx
│   ├── EnvelopeModal.tsx
│   ├── HeroSection.tsx
│   ├── CountersSection.tsx
│   ├── MagicSection.tsx
│   ├── CakeSection.tsx
│   ├── SweetWords.tsx
│   ├── GallerySection.tsx
│   ├── VideoSection.tsx
│   ├── OutroSection.tsx
│   └── FloatingBackground.tsx
├── App.tsx
└── index.css
public/                 ← الفيديو والأغاني
```

بالتوفيق ❤️
