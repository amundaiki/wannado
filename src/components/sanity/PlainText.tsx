type PlainTextProps = {
  value?: string | null;
  className?: string;
};

export default function PlainText({ value, className = "" }: PlainTextProps) {
  if (!value) {
    return null;
  }

  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 20)}`} className={index > 0 ? "mt-4" : ""}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
