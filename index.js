const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// تشغيل الملفات الثابتة (صفحة الويب)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// مسار استقبال البيانات
app.post('/collect-data', (req, res) => {
    console.log('بيانات جديدة:', req.body);
    res.status(200).json({ status: 'success' });
});

app.listen(port, () => {
    console.log(`السيرفر يعمل على المنفذ ${port}`);
});
