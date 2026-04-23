const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // ليتمكن السيرفر من قراءة ملفات HTML

// حالة الهاتف الافتراضية
let phoneState = "مغلق"; 

// 1. رابط الهاتف (المشاهدة فقط)
app.get('/api/status', (req, res) => {
    res.json({ status: phoneState });
});

// 2. رابط لوحة التحكم (لتغيير الحالة)
app.post('/api/set', (req, res) => {
    phoneState = req.body.status;
    res.json({ success: true, status: phoneState });
});

// تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("السيرفر يعمل الآن!");
});
