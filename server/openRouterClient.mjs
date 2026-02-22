const DEFAULT_OPENROUTER_URL = "https://openrouter.ai/api/v1";

function buildSystemPrompt(payload) {
  const assistantRole =
    "Ты ИИ-ассистент для фермеров КРС в Кыргызстане. Объясняй очень просто и кратко, как практичный ветврач. Пиши максимум 5–7 коротких предложений, без воды.";

  if (payload.contextType === "cow") {
    return `${assistantRole}
Контекст: отдельная корова.
ID коровы: ${payload.cowId || "не указан"}.
Сводка: ${payload.cowSummary || "нет данных"}.
Дай только самые важные практичные шаги и явно отметь, когда нужен очный ветеринар.`;
  }

  return `${assistantRole}
Контекст: всё стадо.
Сводка по стаду: ${payload.herdSummary || "нет данных"}.
Выдели строго топ-3 проблемы/риска и очень краткий план действий на сегодня.`;
}

export async function callOpenRouterChat(payload) {
  const apiKey = "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";
  const baseUrl = process.env.OPENROUTER_BASE_URL || DEFAULT_OPENROUTER_URL;

  console.log("[AI] ENV exists:", !!apiKey);

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY не задан. Добавьте ключ в переменные окружения сервера.");
  }

  // обрезаем историю, чтобы не слать огромный контекст каждый раз
  const recentMessages = Array.isArray(payload.messages)
    ? payload.messages.slice(-4)
    : payload.messages;

  console.log("[AI] Sending request to OpenRouter...");
  const startedAt = Date.now();

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        { role: "system", content: buildSystemPrompt(payload) },
        ...recentMessages,
      ],
      temperature: 0.5,   // меньше болтовни
      max_tokens: 180,    // ограничиваем длину ответа
    }),
  });

  console.log("[AI] Response received in", Date.now() - startedAt, "ms");

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const message = data?.choices?.[0]?.message;

  if (!message?.content) {
    throw new Error("OpenRouter вернул пустой ответ.");
  }

  return { role: "assistant", content: message.content };
}