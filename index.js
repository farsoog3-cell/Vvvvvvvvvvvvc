const express = require('express');
const app = express();

// حالة الهاتف الافتراضية
let phoneStatus = "مغلق";

// 1. صفحة الهاتف (الرابط الرئيسي)
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="display:flex; justify-content:center; align-items:center; height:100vh; background:#222; margin:0;">
            <div id="phone" style="width:250px; height:500px; border:15px solid #000; border-radius:40px; background:${phoneStatus === 'مفتوح' ? '#7cfc00' : '#fff'}; display:flex; justify-content:center; align-items:center; font-size:24px; transition: 0.5s;">
                ${phoneStatus === 'مفتوح' ? 'الهاتف يعمل' : 'الهاتف مغلق'}
            </div>
            <script>setInterval(() => location.reload(), 1000);</script>
        </body>
        </html>
    `);
});

// 2. صفحة التحكم (الرابط /admin)
app.get('/admin', (req, res) => {
    res.send(`
        <div style="text-align:center; margin-top:50px;">
            <h1>لوحة التحكم</h1>
            <button style="padding:20px; font-size:20px;" onclick="fetch('/set?status=مفتوح')">تشغيل الهاتف</button>
            <button style="padding:20px; font-size:20px;" onclick="fetch('/set?status=مغلق')">إغلاق الهاتف</button>
        </div>
    `);
});

// 3. رابط لتغيير الحالة
app.get('/set', (req, res) => {
    phoneStatus = req.query.status;
    res.send("تم تغيير الحالة إلى: " + phoneStatus);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل الآن!"));
