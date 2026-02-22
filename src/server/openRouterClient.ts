import type { AiMessage, ChatRequestPayload } from "@/shared/api/openRouterClient";

const DEFAULT_OPENROUTER_URL = "https://openrouter.ai/api/v1";

function buildSystemPrompt(payload: ChatRequestPayload): string {
  const assistantRole =
    "Ты ИИ-ассистент для фермеров КРС в Кыргызстане. Объясняй просто, как практичный ветврач.";

  if (payload.contextType === "cow") {
    return `${assistantRole}\n\nКонтекст: отдельная корова.\nID коровы: ${payload.cowId || "не указан"}.\nСводка: ${payload.cowSummary || "нет данных"}.\nДай практичные, приоритетные шаги и отметь, когда нужен очный ветеринар.`;
  }

  return `${assistantRole}\n\nКонтекст: всё стадо.\nСводка по стаду: ${payload.herdSummary || "нет данных"}.\nВыдели топ-3 проблемы, риски и краткий план действий на сегодня.`;
}

export async function callOpenRouterChatOnServer(
  payload: ChatRequestPayload,
  env: { OPENROUTER_API_KEY?: string; OPENROUTER_BASE_URL?: string },
): Promise<AiMessage> {
  console.log("[AI] ENV exists:", !!env.OPENROUTER_API_KEY);

  if (!env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY не задан. Добавьте ключ в переменные окружения сервера.");
  }

  const baseUrl = env.OPENROUTER_BASE_URL || DEFAULT_OPENROUTER_URL;

  console.log("[AI] Sending request to OpenRouter...");
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "system", content: buildSystemPrompt(payload) }, ...payload.messages],
      temperature: 0.7,
    }),
  });

  console.log("[AI] Response received");

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
