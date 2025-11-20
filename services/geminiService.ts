import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to decode base64 audio
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playPronunciation = async (
  text: string,
  context: string = "programming"
): Promise<void> => {
  const ai = getClient();

  // Prompt specifically designed for clear US English technical pronunciation
  const prompt = `
    Task: You are a native US English speaker and an expert C++ engineer. 
    Action: Pronounce the following term or code snippet clearly, naturally, and authoritatively.
    Term: "${text}"
    Rules: 
    1. Do NOT explain anything. ONLY speak the term.
    2. Use standard US developer pronunciation (e.g., 'char' is 'care', 'deque' is 'deck', 'null' is 'nuhl').
    3. If it is 'std::cout', pronounce it as 'standard see out' or 'see out'.
    4. Speak at a moderate, teaching pace.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, authoritative voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini.");
    }

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const outputAudioContext = new AudioContextClass({ sampleRate: 24000 });
    const outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );

    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    source.start();
    
    await new Promise<void>((resolve) => {
        source.onended = () => {
            outputAudioContext.close();
            resolve();
        };
    });

  } catch (error) {
    console.error("Error generating pronunciation:", error);
    throw error;
  }
};

export const generateExplanation = async (term: string): Promise<string> => {
  const ai = getClient();
  
  // Updated prompt to request Chinese explanation
  const prompt = `
    请用**中文**解释 C++ 术语 "${term}"。
    要求：
    1. 简要说明它是什么 (1-2句话)。
    2. 解释为什么这个词容易读错（如果相关，可以提一下词源），指出中文母语者常见的发音误区。
    3. 提供一个非常简短的代码示例（2-3行）。
    输出格式为 Markdown。总字数控制在 150 字以内。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "无法生成解释。";
};