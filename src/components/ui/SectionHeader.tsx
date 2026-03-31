interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-space font-bold text-3xl md:text-4xl text-brown mb-4">
        {title}
      </h2>
      {description && (
        <p
          className={`font-inter text-base md:text-lg text-brown-mid leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
