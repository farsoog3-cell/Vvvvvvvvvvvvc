const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let phoneStatus = "مغلق";

// جلب الحالة
app.get('/api/status', (req, res) => {
    res.json({ status: phoneStatus });
});

// تغيير الحالة
app.post('/api/set', (req, res) => {
    phoneStatus = req.body.status;
    res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل!"));
