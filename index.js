const express = require('express');
const app = express();
const path = require('path');

// إرسال ملف الـ HTML عند طلب الرابط
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(3000, () => {
    console.log("السيرفر يعمل الآن!");
});