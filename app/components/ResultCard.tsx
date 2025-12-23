type Props = {
  title: string
  content: string
  placeholder: string
}

export default function ResultCard({ title, content, placeholder }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
      <h2 className="text-sm font-medium text-slate-700 mb-2">
        {title}
      </h2>

      <div className="text-sm text-slate-600 whitespace-pre-wrap min-h-[60px]">
        {content || placeholder}
      </div>
    </div>
  )
}
