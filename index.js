const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// تعريف المتغير العام لحالة الهاتف
let phoneStatus = "مغلق";

// إرسال حالة الهاتف
app.get('/api/status', (req, res) => {
    res.json({ status: phoneStatus });
});

// استقبال أمر تغيير الحالة
app.post('/api/set', (req, res) => {
    phoneStatus = req.body.status;
    res.json({ success: true });
});

// المسارات الصحيحة للملفات
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل!"));
