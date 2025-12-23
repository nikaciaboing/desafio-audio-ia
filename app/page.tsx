'use client'

import { useState, useRef } from 'react'

import Container from '@/app/components/Container'
import Header from '@/app/components/Header'
import RecordButton from '@/app/components/RecordButton'
import ResultCard from '@/app/components/ResultCard'

export default function Home() {
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState('')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      setLoading(true)

      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const formData = new FormData()
      formData.append('audio', audioBlob)

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setText(data.text)

      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.text }),
      })

      const chatData = await chatResponse.json()
      setAnswer(chatData.answer)

      setLoading(false)
    }

    mediaRecorder.start()
    setRecording(true)
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <Container>
      <Header />

      <RecordButton
        recording={recording}
        loading={loading}
        onStart={startRecording}
        onStop={stopRecording}
      />

      <p className="text-center text-xs text-slate-400 mb-6">
        {loading
          ? 'Processando áudio e gerando resposta...'
          : recording
          ? 'Gravação em andamento'
          : 'Pronto para iniciar gravação'}
      </p>

      <ResultCard
        title="Transcrição"
        content={text}
        placeholder="Nenhum áudio gravado."
      />

      <ResultCard
        title="Resposta da IA"
        content={answer}
        placeholder="Aguardando resposta da IA."
      />
    </Container>
  )
}
