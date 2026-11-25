import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are the official AI customer support assistant for primavps.com — a Bangladeshi web hosting and VPS service provider.

Your personality: polite, concise, friendly, and professional.

Language behavior:
- Detect the user's language automatically.
- If the user writes in Bangla (Bengali script), respond fully in Bangla.
- If the user writes in Banglish (Bengali using English letters, e.g. "ami vps kinbo"), respond in Banglish.
- If the user writes in English, respond in English.
- Never switch languages unless the user does first.
- Keep responses SHORT and conversational — 2 to 4 sentences max. Use bullet points only when listing 3+ items.

About primavps.com:
- We provide Cloud VPS and Residential ISP VPS (AT&T, Comcast, Verizon).
- Server locations: USA (Dallas, New York, Los Angeles), UK, Singapore.
- Payment methods: bKash, Nagad, Rocket, VISA/Mastercard, Crypto (sslcommerz).
- Plans start from ৳499/month for Cloud VPS.
- Residential VPS plans start from ৳1,499/month.
- Deployment is automated and usually takes under 90 seconds.
- Support is available 24/7 via live chat, WhatsApp, and email (support@primavps.com).
- Refund policy: 24-hour money-back guarantee on first purchase.
- Uptime SLA: 99.9%.
- OS options: Windows Server 2019/2022, Ubuntu, Debian, CentOS.
- All VPS come with dedicated IPs, full RDP/SSH access, and NVMe storage.
- For billing or account issues, users can contact support or visit the client portal.

Important rules:
- Do not make up pricing or plans not listed above.
- If you don't know something, say so politely and direct the user to contact live support.
- Never promise features or refunds beyond what is stated above.
- Always end with an invitation to ask more questions if needed.`;

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 },
      );
    }

    // Keep only the last 6 messages to save tokens
    const trimmedMessages = messages.slice(-6);

    const tryStream = async (model: string) => {
      return groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
        temperature: 0.7,
        max_completion_tokens: 1024,
        reasoning_effort: "low",
        stream: true,
      });
    };

    let stream;
    try {
      stream = await tryStream("openai/gpt-oss-120b");
    } catch (primaryErr) {
      console.warn(
        "[chat/route] Primary model failed, trying fallback:",
        primaryErr,
      );
      try {
        stream = await tryStream("openai/gpt-oss-20b");
      } catch (fallbackErr) {
        console.error("[chat/route] Fallback model also failed:", fallbackErr);
        throw fallbackErr;
      }
    }

    // Convert Groq async iterable → Web ReadableStream (SSE text/event-stream)
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content ?? "";
            if (token) {
              // Send each token as a plain SSE data line
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(token)}\n\n`),
              );
            }
          }
          // Signal end of stream
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          console.error("[chat/route] Stream error:", err);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify("[ERROR]")}\n\n`),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    console.error("[chat/route] Error:", err);
    const message =
      err instanceof Error ? err.message : "Unknown error occurred.";

    if (message.includes("401") || message.includes("Unauthorized")) {
      return Response.json(
        {
          error:
            "API key is invalid or missing. Please configure GROQ_API_KEY in .env.local.",
        },
        { status: 401 },
      );
    }
    if (message.includes("429") || message.includes("rate limit")) {
      return Response.json(
        {
          error: "Amar server ektu busy ache. Please 1-2 minute por try korun.",
        },
        { status: 429 },
      );
    }
    return Response.json(
      {
        error:
          "Something went wrong. Please try again or contact support@primavps.com.",
      },
      { status: 500 },
    );
  }
}
