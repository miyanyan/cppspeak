/**
 * Audio Service (Formerly Gemini Service)
 * Now uses browser native SpeechSynthesis API to remove API Key dependency.
 */

// Helper function to get the best available voice
const getBestVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  
  // Priority list for voices that sound decent for tech terms
  const preferred = [
    // Google voices usually sound better than system defaults
    voices.find(v => v.name === "Google US English"),
    voices.find(v => v.name === "Google UK English Male"),
    // Microsoft voices on Windows
    voices.find(v => v.name.includes("Microsoft Zira")), 
    voices.find(v => v.name.includes("Microsoft David")),
    // Apple voices
    voices.find(v => v.name === "Samantha"),
    // Fallback to any English voice
    voices.find(v => v.lang.startsWith('en-US')),
    voices.find(v => v.lang.startsWith('en'))
  ];

  return preferred.find(v => v !== undefined) || null;
};

export const playPronunciation = async (
  text: string,
  context: string = "programming"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      console.error("Browser does not support speech synthesis");
      reject("Browser not supported");
      return;
    }

    // Cancel any currently playing speech
    window.speechSynthesis.cancel();

    // Pre-processing text to help the dumb browser TTS pronounce C++ better
    let speakText = text;
    
    // Special handling for C++ specific terms where browser TTS fails
    if (text.includes("std::cout")) speakText = speakText.replace("std::cout", "standard see out");
    if (text.includes("cout")) speakText = speakText.replace("cout", "see out");
    if (text.toLowerCase() === "char") speakText = "care"; // Force 'care' pronunciation for char
    if (text.toLowerCase() === "deque") speakText = "deck";
    if (text.includes("std::")) speakText = speakText.replace(/std::/g, "standard ");
    
    const utterance = new SpeechSynthesisUtterance(speakText);
    
    // Configuration
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      reject(e);
    };

    // Small delay to ensure voices are loaded (common browser bug)
    if (window.speechSynthesis.getVoices().length === 0) {
       window.speechSynthesis.onvoiceschanged = () => {
           const v = getBestVoice();
           if(v) utterance.voice = v;
           window.speechSynthesis.speak(utterance);
       };
    } else {
       window.speechSynthesis.speak(utterance);
    }
  });
};

// Mocking the explanation generation since we now use static data
// Keeping the function signature to avoid breaking the UI component logic immediately
export const generateExplanation = async (term: string): Promise<string> => {
  // Simulate network delay for the "cool" loading effect
  await new Promise(resolve => setTimeout(resolve, 800));
  return "EXPLANATION_LOADED_FROM_LOCAL_DB";
};