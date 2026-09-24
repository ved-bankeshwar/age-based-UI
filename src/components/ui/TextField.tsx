export function TextField({
  label,
  hideLabel = false,
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
  type = "text",
  name,
}: {
  label: string;
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel";
  autoComplete?: string;
  type?: string;
  name?: string;
}) {
  return (
    <label className="stack" style={{ gap: "var(--space-2)" }}>
      <span className={hideLabel ? "sr-only" : undefined} style={{ fontWeight: 600 }}>
        {label}
      </span>
      <input
        className="bite-input"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
