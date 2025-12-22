export default function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-md">
        {children}
      </div>
    </main>
  )
}
