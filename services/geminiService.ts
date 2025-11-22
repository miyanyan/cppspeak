/**
 * Audio Service
 * Uses Youdao Dictionary TTS API for faster response times compared to browser native speech synthesis.
 */

let currentAudio: HTMLAudioElement | null = null;

export const playPronunciation = async (
  text: string,
  accent: 'US' | 'UK' = 'US'
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Pre-processing text for better C++ pronunciation
    let speakText = text;
    
    // Specific fixups for C++ terms to ensure phonetic correctness
    if (text.includes("std::cout")) speakText = speakText.replace("std::cout", "standard see out");
    else if (text.includes("cout")) speakText = speakText.replace("cout", "see out");
    
    if (text.toLowerCase() === "char") speakText = "care"; 
    if (text.toLowerCase() === "deque") speakText = "deck";
    if (text.includes("std::")) speakText = speakText.replace(/std::/g, "standard ");
    
    // Stop any currently playing audio to prevent overlap
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Construct Youdao API URL
    // type=1: UK (English), type=2: US (American)
    const type = accent === 'US' ? 2 : 1;
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(speakText)}&type=${type}`;

    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      resolve();
      if (currentAudio === audio) {
        currentAudio = null;
      }
    };

    audio.onerror = (e) => {
      console.error("Youdao TTS playback error", e);
      reject(new Error("Failed to play audio"));
      if (currentAudio === audio) {
        currentAudio = null;
      }
    };

    // Play the audio
    audio.play().catch(e => {
      console.error("Audio play interrupted or failed", e);
      reject(e);
    });
  });
};

export const generateExplanation = async (term: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return "EXPLANATION_LOADED_FROM_LOCAL_DB";
};
