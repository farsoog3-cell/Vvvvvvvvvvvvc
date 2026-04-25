const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

let capturedPhotos = [];

// استقبال الصور
app.post('/upload', (req, res) => {
    const { image } = req.body;
    capturedPhotos.push({ id: Date.now(), data: image });
    res.status(200).send('تم الاستلام');
});

// جلب الصور للوحة التحكم
app.get('/photos', (req, res) => res.json(capturedPhotos));

// حذف صورة
app.delete('/delete/:id', (req, res) => {
    capturedPhotos = capturedPhotos.filter(p => p.id != req.params.id);
    res.status(200).send('تم الحذف');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
