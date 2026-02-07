interface CostItem {
  category: string;
  low: string;
  high: string;
  notes?: string;
}

interface CostBreakdownProps {
  items: CostItem[];
}

export function CostBreakdown({ items }: CostBreakdownProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-background-card">
            <th className="text-left p-4 font-heading text-foreground font-medium border-b border-border">
              Category
            </th>
            <th className="text-left p-4 font-heading text-foreground font-medium border-b border-border">
              Low Estimate
            </th>
            <th className="text-left p-4 font-heading text-foreground font-medium border-b border-border">
              High Estimate
            </th>
            <th className="text-left p-4 font-heading text-foreground font-medium border-b border-border">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-background" : "bg-background-card"
              } hover:bg-background-secondary transition-colors`}
            >
              <td className="p-4 text-foreground font-medium">{item.category}</td>
              <td className="p-4 text-accent-gold">{item.low}</td>
              <td className="p-4 text-accent-gold">{item.high}</td>
              <td className="p-4 text-foreground-muted">{item.notes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
