interface ActivityBarProps {
  usualLevel: number; // 0-100
  currentLevel: number; // 0-100
}

export default function ActivityBar({ usualLevel, currentLevel }: ActivityBarProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Активность</h3>
      <div className="space-y-2">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Обычно</div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-normal rounded-full h-2.5 transition-all"
              style={{ width: `${usualLevel}%` }}
            />
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Сейчас</div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-attention rounded-full h-2.5 transition-all"
              style={{ width: `${currentLevel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
