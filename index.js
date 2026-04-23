const express = require('express');
const app = express();
app.use(express.json());

// هذا هو "المخزن" الذي ستحفظ فيه البيانات التي تصلك
let userLogs = [];

// 1. الصفحة الرئيسية (الرابط الذي ترسله لأصدقائك)
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="text-align:center; padding-top:50px;">
            <h1>أهلاً بك في سحب الجوائز</h1>
            <button onclick="sendData()">اضغط هنا للمشاركة</button>
            <script>
                async function sendData() {
                    const data = {
                        device: navigator.userAgent,
                        screen: window.screen.width + "x" + window.screen.height,
                        time: new Date().toLocaleString()
                    };
                    await fetch('/api/log', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    alert("تم إرسال بياناتك!");
                }
            </script>
        </body>
        </html>
    `);
});

// 2. المسار الذي يستقبل البيانات من هواتف المستخدمين
app.post('/api/log', (req, res) => {
    const info = req.body;
    userLogs.push(info); // حفظ البيانات في المخزن
    console.log("وصلت بيانات جديدة:", info);
    res.json({ success: true });
});

// 3. لوحة التحكم (ادخل هنا من متصفحك لترى البيانات)
app.get('/admin', (req, res) => {
    res.json(userLogs); // يعرض لك كل البيانات المسجلة
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل!"));
