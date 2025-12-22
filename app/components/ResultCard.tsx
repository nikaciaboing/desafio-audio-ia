interface Props {
  title: string
  content: string
  placeholder: string
}

export default function ResultCard({
  title,
  content,
  placeholder,
}: Props) {
  return (
    <section className="border border-slate-200 rounded-xl p-5 mb-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
        {content || placeholder}
      </p>
    </section>
  )
}
