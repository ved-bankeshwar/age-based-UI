export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function Rating({ value, labeled }: { value: number; labeled: boolean }) {
  const text = value.toFixed(1);
  return <span>{labeled ? `Rating ${text}` : `★ ${text}`}</span>;
}

export function Price({ amount, labeled = false, label }: { amount: number; labeled?: boolean; label?: string }) {
  const text = `₹${amount.toLocaleString("en-IN")}`;
  return <span>{labeled && label ? `${label} ${text}` : text}</span>;
}

export function VegMark({ veg, labeled }: { veg: boolean; labeled: boolean }) {
  return (
    <span className="veg-mark" data-veg={veg ? "true" : "false"}>
      <span className="veg-dot" />
      {labeled ? <span>{veg ? "Veg" : "Non-veg"}</span> : <span className="sr-only">{veg ? "Veg" : "Non-veg"}</span>}
    </span>
  );
}

export function BillRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between gap-4" style={{ fontSize: "var(--text-md)" }}>
      <span>{label}</span>
      <span style={{ fontWeight: 700 }}>{amount}</span>
    </div>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>{title}</h2>
      {action ? (
        <a href={action.href} className="bite-button bite-button-quiet" style={{ paddingInline: 0 }}>
          {action.label}
        </a>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="bite-card card-body" style={{ alignItems: "flex-start" }}>
      <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>{title}</h1>
      <p className="muted">{body}</p>
      {action ? (
        <a className="bite-button bite-button-primary" href={action.href}>
          {action.label}
        </a>
      ) : null}
    </div>
  );
}
