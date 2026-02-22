export type AiRole = "system" | "user" | "assistant";

export interface AiMessage {
  role: AiRole;
  content: string;
}

export type ChatContextType = "cow" | "herd";

export interface ChatRequestPayload {
  contextType: ChatContextType;
  cowId?: string;
  cowSummary?: string;
  herdSummary?: string;
  messages: AiMessage[];
}

export interface ChatResponsePayload {
  message: AiMessage;
}

export async function requestAiChat(payload: ChatRequestPayload): Promise<AiMessage> {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "Не удалось получить ответ от ИИ. Попробуйте еще раз.");
  }

  const data: ChatResponsePayload = await res.json();
  return data.message;
}
