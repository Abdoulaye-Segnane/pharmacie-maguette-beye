interface PharmacyCrossProps {
  className?: string
}

export default function PharmacyCross({ className }: PharmacyCrossProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="15" y="0" width="10" height="40" rx="2" />
      <rect x="0" y="15" width="40" height="10" rx="2" />
    </svg>
  )
}
