import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

const config = {
  info: {
    icon: Info,
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    iconColor: "text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-accent-gold",
    iconColor: "text-accent-gold",
  },
} as const;

export function Callout({ type = "info", children }: CalloutProps) {
  const { icon: Icon, borderColor, iconColor } = config[type];

  return (
    <div
      className={`bg-background-secondary px-5 py-4 rounded-r-lg border-l-4 ${borderColor} my-6`}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="text-foreground-muted text-sm [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
