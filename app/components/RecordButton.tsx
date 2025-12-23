type Props = {
  recording: boolean
  loading: boolean
  onStart: () => void
  onStop: () => void
}

export default function RecordButton({
  recording,
  loading,
  onStart,
  onStop,
}: Props) {
  if (loading) {
    return (
      <button
        disabled
        className="w-full bg-slate-300 text-slate-600 py-4 rounded-lg text-sm font-medium mb-4"
      >
        Processando áudio...
      </button>
    )
  }

  if (recording) {
    return (
      <button
        onClick={onStop}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-sm font-medium mb-4"
      >
        Parar gravação
      </button>
    )
  }

  return (
    <button
      onClick={onStart}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-sm font-medium mb-4"
    >
      Iniciar gravação
    </button>
  )
}
