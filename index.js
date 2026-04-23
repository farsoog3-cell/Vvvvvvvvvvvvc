const express = require('express');
const app = express();
app.use(express.json());

// مسار لاستقبال البيانات من المستخدم
app.post('/api/submit-data', (req, res) => {
    const data = req.body;
    console.log("--- بيانات جديدة وصلت ---");
    console.log("الموقع:", data.location);
    console.log("نوع الجهاز:", data.deviceInfo);
    // يمكنك هنا إضافة كود لحفظ البيانات في قاعدة بيانات (MongoDB/SQL)
    res.json({ success: true, message: "تم استلام البيانات بنجاح" });
});

app.listen(3000, () => console.log("السيرفر يعمل على بورت 3000"));
