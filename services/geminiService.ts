/**
 * Audio Service
 * Uses browser native SpeechSynthesis API.
 */

// Helper function to get the best available voice for a specific accent
const getBestVoice = (accent: 'US' | 'UK'): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  
  // Filter logic
  const isUS = accent === 'US';
  const preferredLocales = isUS ? ['en-US', 'en_US'] : ['en-GB', 'en_GB'];
  const fallbackLocales = isUS ? ['en-GB', 'en_GB'] : ['en-US', 'en_US'];

  // 1. Try finding Google/Premium voices for specific locale
  let voice = voices.find(v => 
    preferredLocales.some(loc => v.lang === loc) && 
    (v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Enhanced"))
  );

  // 2. Try any voice for specific locale
  if (!voice) {
    voice = voices.find(v => preferredLocales.some(loc => v.lang === loc));
  }

  // 3. Fallback to other English
  if (!voice) {
    voice = voices.find(v => fallbackLocales.some(loc => v.lang === loc));
  }

  // 4. Absolute fallback
  return voice || voices.find(v => v.lang.startsWith('en')) || null;
};

export const playPronunciation = async (
  text: string,
  accent: 'US' | 'UK' = 'US'
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      console.error("Browser does not support speech synthesis");
      reject("Browser not supported");
      return;
    }

    // Cancel any currently playing speech
    window.speechSynthesis.cancel();

    // Pre-processing text for better C++ pronunciation
    let speakText = text;
    
    if (text.includes("std::cout")) speakText = speakText.replace("std::cout", "standard see out");
    else if (text.includes("cout")) speakText = speakText.replace("cout", "see out");
    
    if (text.toLowerCase() === "char") speakText = "care"; 
    if (text.toLowerCase() === "deque") speakText = "deck";
    if (text.includes("std::")) speakText = speakText.replace(/std::/g, "standard ");
    
    const utterance = new SpeechSynthesisUtterance(speakText);
    
    // Configuration
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voice = getBestVoice(accent);
    if (voice) {
      utterance.voice = voice;
      // Adjust rate for some voices if needed
      if (voice.name.includes("Google")) utterance.rate = 0.85;
    }

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      reject(e);
    };

    // Small delay to ensure voices are loaded
    if (window.speechSynthesis.getVoices().length === 0) {
       window.speechSynthesis.onvoiceschanged = () => {
           const v = getBestVoice(accent);
           if(v) utterance.voice = v;
           window.speechSynthesis.speak(utterance);
       };
    } else {
       window.speechSynthesis.speak(utterance);
    }
  });
};

export const generateExplanation = async (term: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return "EXPLANATION_LOADED_FROM_LOCAL_DB";
};