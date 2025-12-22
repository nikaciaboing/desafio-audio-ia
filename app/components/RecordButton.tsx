interface Props {
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
  return (
    <div className="flex justify-center mb-6">
      {!recording ? (
        <button
          onClick={onStart}
          disabled={loading}
          className="
            w-45 h-15 rounded-full
            bg-slate-900 text-white
            font-medium
            shadow-md
            hover:bg-slate-800
            transition
            disabled:opacity-50
          "
        >
          Iniciar gravação
        </button>
      ) : (
        <button
          onClick={onStop}
          className="
            w-32 h-32 rounded-full
            bg-slate-600 text-white
            font-medium
            shadow-md
            hover:bg-slate-500
            transition
          "
        >
          Parar
        </button>
      )}
    </div>
  )
}
