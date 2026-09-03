/* Hand ticked checkbox used by the journal pages. Shared so the workshop
   and service pages draw the same mark instead of keeping two copies. */
export default function CheckBox() {
  return (
    <span
      className="mt-0.5 shrink-0 w-4 h-4 rounded-[3px] border border-accent/60 bg-white/60 text-accent flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
