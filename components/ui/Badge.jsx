// components/ui/Badge.jsx
export default function Badge({ children }) {
  return (
    <span className="ml-2 rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
      {children}
    </span>
  );
}
