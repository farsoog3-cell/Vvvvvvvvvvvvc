const express = require('express');
const app = express();
const path = require('path');

app.use(express.json({ limit: '10mb' })); // لزيادة حجم استقبال الصور
app.use(express.static(path.join(__dirname, 'public')));

// مصفوفة لتخزين الصور مؤقتاً
let capturedPhotos = [];

// استقبال الصورة
app.post('/upload', (req, res) => {
    const { image } = req.body;
    const photoEntry = { id: Date.now(), data: image };
    capturedPhotos.push(photoEntry);
    res.status(200).json({ success: true });
});

// جلب جميع الصور
app.get('/get-photos', (req, res) => {
    res.json(capturedPhotos);
});

// حذف صورة
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    capturedPhotos = capturedPhotos.filter(p => p.id !== id);
    res.status(200).json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
