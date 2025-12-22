export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File

    if (!audio) {
      return NextResponse.json(
        { error: 'Áudio não recebido' },
        { status: 400 }
      )
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audio,
      model: 'gpt-4o-transcribe',
    })

    return NextResponse.json({
      text: transcription.text,
    })
  } catch (error) {
    console.error('TRANSCRIBE ERROR:', error)
    return NextResponse.json(
      { error: 'Erro ao transcrever áudio' },
      { status: 500 }
    )
  }
}
