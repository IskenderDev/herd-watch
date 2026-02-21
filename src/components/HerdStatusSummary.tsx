interface HerdStatusSummaryProps {
  normal: number;
  attention: number;
  risk: number;
}

export default function HerdStatusSummary({ normal, attention, risk }: HerdStatusSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatusCard count={normal} label="В норме" variant="normal" />
      <StatusCard count={attention} label="Внимание" variant="attention" />
      <StatusCard count={risk} label="Риск" variant="risk" />
    </div>
  );
}

function StatusCard({
  count,
  label,
  variant,
}: {
  count: number;
  label: string;
  variant: "normal" | "attention" | "risk";
}) {
  const colors = {
    normal: "bg-normal text-normal-foreground",
    attention: "bg-attention text-attention-foreground",
    risk: "bg-risk text-risk-foreground",
  };

  return (
    <div
      className={`${colors[variant]} rounded-2xl p-4 text-center shadow-md`}
    >
      <div className="text-3xl font-extrabold">{count}</div>
      <div className="text-xs font-medium mt-1 opacity-90">{label}</div>
    </div>
  );
}
