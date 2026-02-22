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

    const reply = await callOpenRouterChat(payload);
    return res.json({ message: reply });
  } catch (e) {
    console.error("[AI ERROR]", e);
    return res.status(500).json({ error: e instanceof Error ? e.message : "AI error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`AI proxy server is running on http://0.0.0.0:${port}`);
});
