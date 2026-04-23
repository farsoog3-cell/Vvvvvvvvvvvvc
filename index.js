const express = require('express');
const app = express();
const path = require('path');

app.use(express.json()); // لقراءة البيانات القادمة
app.use(express.static('public')); // ليتمكن السيرفر من قراءة ملفات HTML

let phoneStatus = "مغلق";

// إرسال حالة الهاتف
app.get('/api/status', (req, res) => {
    res.json({ status: phoneStatus });
});

// استقبال تغيير الحالة من لوحة التحكم
app.post('/api/set', (req, res) => {
    phoneStatus = req.body.status;
    res.json({ success: true });
});

// فتح لوحة التحكم
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل!"));
