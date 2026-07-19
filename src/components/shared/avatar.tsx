interface AvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
};

// WHY initials instead of a generic silhouette icon when there's no
// photo: an organization chart full of identical gray-person icons
// reads as "nobody filled this in yet," while initials at least carry
// real identity — closer to how people already recognize each other
// (name tags, WA contact names) than a placeholder icon would.
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export function Avatar({ name, photoUrl, size = "md" }: AvatarProps) {
  const sizeClasses = SIZE_CLASSES[size];

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external
      // photo URLs aren't in next.config's image domain allowlist yet
      // since the upload/CDN strategy isn't decided. Swap to
      // next/image once media storage is chosen.
      <img
        src={photoUrl}
        alt={name}
        className={`${sizeClasses} rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={`${sizeClasses} flex items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground`}
    >
      {getInitials(name)}
    </span>
  );
}
