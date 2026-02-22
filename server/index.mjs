import "dotenv/config";
import express from "express";
import { callOpenRouterChat } from "./openRouterClient.mjs";

const app = express();
const port = Number(process.env.API_PORT || 8787);

app.use(express.json({ limit: "1mb" }));

app.post("/api/ai/chat", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload?.contextType || !Array.isArray(payload?.messages)) {
      return res.status(400).json({ error: "Некорректный формат запроса." });
    }

    const message = await callOpenRouterChat(payload);
    return res.json({ message });
  } catch (error) {
    console.error("AI chat error", error);
    return res.status(500).json({
      error:
        "Не удалось получить ответ от ИИ. Проверьте подключение и попробуйте снова.",
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`AI proxy server is running on http://0.0.0.0:${port}`);
});
