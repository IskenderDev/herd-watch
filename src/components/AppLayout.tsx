import BottomNav from "./BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card px-4 py-3">
        <div className="container flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight text-foreground">CattleAI</h1>
          <span className="text-xs text-muted-foreground">MVP</span>
        </div>
      </header>

      <main className="container flex-1 px-4 py-4 pb-24">{children}</main>

      <BottomNav />
    </div>
  );
}
