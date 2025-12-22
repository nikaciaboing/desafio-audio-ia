export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: text,
    })

    return NextResponse.json({
      answer: response.output_text,
    })
  } catch (error) {
    console.error('CHAT ERROR:', error)
    return NextResponse.json(
      { error: 'Erro ao chamar a IA' },
      { status: 500 }
    )
  }
}
