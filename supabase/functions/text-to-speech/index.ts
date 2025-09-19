import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, voice = "Aria", model = "eleven_multilingual_v2" } = await req.json()
    
    if (!text) {
      throw new Error('Text is required')
    }

    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    if (!elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Voice ID mapping for professional voices
    const voiceIds: { [key: string]: string } = {
      "Aria": "9BWtsMINqrJLrRacOk9x",
      "Roger": "CwhRBWXzGAHq8TQ4Fs17", 
      "Sarah": "EXAVITQu4vr4xnSDxMaL",
      "Laura": "FGY2WhTYpPnrIDTdsKH5",
      "Charlie": "IKne3meq5aSn9XLyUdCD",
      "George": "JBFqnCBsd6RMkjVDRZzb",
      "Charlotte": "XB0fDUnXU5powFXDhCwa",
      "Brian": "nPczCjzI2devNBz1zQrb"
    }

    const voiceId = voiceIds[voice] || voiceIds["Aria"]

    console.log(`Generating speech for text: "${text.substring(0, 50)}..." with voice: ${voice}`)

    // Generate speech using ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`)
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    console.log(`Successfully generated ${arrayBuffer.byteLength} bytes of audio`)

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        voice: voice,
        model: model
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in text-to-speech function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})