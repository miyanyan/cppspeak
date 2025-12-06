/**
 * Audio Service
 * Hybrid approach:
 * 1. Youdao Dictionary TTS API for single words (High quality, natural voice).
 * 2. Browser Native SpeechSynthesis for sentences/code or fallback.
 */

let currentAudio: HTMLAudioElement | null = null;

export const playPronunciation = async (
  text: string,
  accent: 'US' | 'UK' = 'US'
): Promise<void> => {
  // Cancel any ongoing browser speech
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  // Stop any ongoing audio element
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Special handling for Asio - use the correct pronunciation "AY-zi-oh"
  if (text.toLowerCase() === 'asio') {
    // Break into syllables with proper emphasis
    await speakWithBrowser('AYzioh');
    return;
  }

  // DIRECT STRATEGY:
  // 1. If text contains spaces, treat it as a sentence or code snippet -> Use Browser Native (More reliable for context).
  // 2. If text is a single block (like "App" or "std::deque"), try Youdao first.
  // 3. If Youdao fails (e.g. due to special characters like "::" or network), fallback to Browser.
  
  const isSentenceOrCode = text.trim().includes(' ');

  if (isSentenceOrCode) {
    return speakWithBrowser(text);
  } else {
    try {
      await speakWithYoudao(text, accent);
    } catch (e) {
      console.warn("Youdao API failed or rejected format, falling back to browser TTS", e);
      await speakWithBrowser(text);
    }
  }
};

const speakWithYoudao = (text: string, accent: 'US' | 'UK'): Promise<void> => {
  return new Promise((resolve, reject) => {
    // type=1: UK, type=2: US
    const type = accent === 'US' ? 2 : 1;
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=${type}`;

    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      resolve();
      if (currentAudio === audio) currentAudio = null;
    };

    audio.onerror = (e) => {
      if (currentAudio === audio) currentAudio = null;
      reject(new Error("Youdao TTS error"));
    };

    audio.play().catch(reject);
  });
};

const speakWithBrowser = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("Speech Synthesis not supported"));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.9; // Slightly slower for clarity

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
};

export const generateExplanation = async (term: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return "EXPLANATION_LOADED_FROM_LOCAL_DB";
};