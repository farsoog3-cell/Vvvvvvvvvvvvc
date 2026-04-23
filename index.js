const express = require('express');
const app = express();
app.use(express.json());

let connectedDevices = {};

// 1. الواجهة الرئيسية (للهواتف التي تفتح الرابط)
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="background:#222; color:white; text-align:center; padding-top:50px;">
            <h1>أهلاً بك في نظام التحكم</h1>
            <p id="status">جاري الاتصال...</p>
            <script>
                const deviceId = "Phone_" + Math.floor(Math.random() * 1000);
                fetch('/api/register', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ deviceId }) });
                setInterval(async () => {
                    const res = await fetch('/api/check/' + deviceId);
                    const data = await res.json();
                    document.getElementById('status').innerText = "الحالة: " + data.action;
                }, 1000);
            </script>
        </body>
        </html>
    `);
});

// 2. واجهة التحكم (لك أنت فقط على الرابط /admin)
app.get('/admin', (req, res) => {
    res.send(`
        <html>
        <body dir="rtl" style="padding:20px; font-family:sans-serif;">
            <h1>لوحة التحكم الخاصة بك</h1>
            <div id="deviceList">جارٍ تحميل الأجهزة...</div>
            <script>
                async function loadDevices() {
                    const res = await fetch('/api/devices');
                    const devices = await res.json();
                    const container = document.getElementById('deviceList');
                    container.innerHTML = '';
                    for (let id in devices) {
                        container.innerHTML += '<div style="border:1px solid #ccc; padding:10px; margin:10px;"><h3>' + id + '</h3><button onclick="sendAction(\'' + id + '\', \'تشغيل\')">تشغيل</button> <button onclick="sendAction(\'' + id + '\', \'إيقاف\')">إيقاف</button></div>';
                    }
                }
                async function sendAction(id, action) {
                    await fetch('/api/control', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ deviceId: id, action: action }) });
                }
                setInterval(loadDevices, 2000);
            </script>
        </body>
        </html>
    `);
});

// APIs للعمليات البرمجية
app.post('/api/register', (req, res) => {
    const { deviceId } = req.body;
    connectedDevices[deviceId] = { action: 'لا شيء' };
    res.json({ success: true });
});

app.get('/api/devices', (req, res) => res.json(connectedDevices));

app.post('/api/control', (req, res) => {
    const { deviceId, action } = req.body;
    if (connectedDevices[deviceId]) { connectedDevices[deviceId].action = action; }
    res.json({ success: true });
});

app.get('/api/check/:deviceId', (req, res) => {
    const device = connectedDevices[req.params.deviceId] || { action: 'لا شيء' };
    res.json(device);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل!"));
