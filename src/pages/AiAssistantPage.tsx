import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AiMessage,
  ChatContextType,
  callOpenRouterChat,
} from "@/shared/api/openRouterClient";

type AiChatRouteState = {
  contextType: ChatContextType;
  cowId?: string;
  cowNumber?: string;
  cowSummary?: string;
  cowStatus?: string;
  cowMetric?: string;
  herdSummary?: string;
  herdStats?: { total: number; normal: number; attention: number; risk: number };
};

const cowSuggestions = [
  "Почему у этой коровы снизилась активность?",
  "Что мне проверить в первую очередь?",
];

const herdSuggestions = [
  "Какие 3 самые важные проблемы сейчас в стаде?",
  "С чего начать осмотр животных сегодня?",
];

export default function AiAssistantPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as AiChatRouteState;
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState<string>("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const contextType: ChatContextType = state.contextType || "herd";

  const suggestions = useMemo(
    () => (contextType === "cow" ? cowSuggestions : herdSuggestions),
    [contextType],
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    const content = messageText.trim();
    if (!content || isLoading) return;

    const newUserMessage: AiMessage = { role: "user", content };
    const history = [...messages, newUserMessage];

    setMessages(history);
    setInput("");
    setIsLoading(true);
    setError(null);
    setLastQuestion(content);

    try {
      const aiMessage = await callOpenRouterChat({
        contextType,
        cowId: state.cowId,
        cowSummary: state.cowSummary,
        herdSummary: state.herdSummary,
        messages: history,
      });
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ошибка связи с ИИ.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col px-4 py-3">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
        <button className="text-sm text-muted-foreground" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <div className="flex items-center gap-2 text-right">
          <Sparkles className="h-4 w-4 text-primary" />
          <h1 className="text-sm font-semibold">
            ИИ-ассистент — {contextType === "cow" ? `№${state.cowNumber || state.cowId}` : "Стадо"}
          </h1>
        </div>
      </div>

      <div className="mb-3 rounded-xl border border-border bg-muted/30 p-3 text-xs text-foreground">
        {contextType === "cow" ? (
          <div className="space-y-1">
            <p>
              <strong>Корова №{state.cowNumber || state.cowId}</strong>
            </p>
            <p>Статус: {state.cowStatus || "—"}</p>
            <p>{state.cowMetric || state.cowSummary}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p>
              <strong>Сводка по стаду</strong>
            </p>
            <p>
              Всего: {state.herdStats?.total ?? "—"} · Норма: {state.herdStats?.normal ?? "—"} · Внимание: {state.herdStats?.attention ?? "—"} · Риск: {state.herdStats?.risk ?? "—"}
            </p>
            <p>{state.herdSummary}</p>
          </div>
        )}
      </div>

      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto rounded-xl border border-border bg-background p-2">
        {messages.length === 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
            <Bot className="h-4 w-4" />
            Задайте вопрос — ИИ подскажет приоритеты и действия.
          </div>
        )}

        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && <p className="text-xs text-muted-foreground">ИИ отвечает…</p>}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
            <Button size="sm" variant="outline" onClick={() => sendMessage(lastQuestion)}>
              Повторить
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => setInput(question)}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs"
          >
            {question}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Спросите про состояние..."
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          disabled={isLoading}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void sendMessage(input);
            }
          }}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          Отправить
        </Button>
      </form>
    </div>
  );
}
