const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("WhatsApp Bot Çalışıyor ✔️");
});

app.listen(PORT, () => {
  console.log("Sunucu çalışıyor: " + PORT);
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("📌 QR Kod hazır! Render log ekranından tarayacaksın.");
});

client.on("ready", () => {
  console.log("🤖 WhatsApp Bot Hazır!");
});

// Mesaj geldiğinde
client.on("message", async (msg) => {
  console.log("Mesaj:", msg.body);

  if (msg.body.toLowerCase() === "randevu") {
    msg.reply("🔔 Merhaba! Randevu sistemimiz kısa süre içinde WhatsApp ile entegre edilecek.");
  }
});

client.initialize();
