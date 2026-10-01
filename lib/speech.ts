declare global {
  interface Window {
    TTS?: {
      speak(
        options: { text: string; locale?: string; rate?: number },
        onfulfilled?: () => void,
        onrejected?: (reason: unknown) => void
      ): void;
    };
  }
}

function speakInBrowser(text: string) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

export function speakSpellingWord(text: string) {
  if (typeof window === 'undefined') return;

  if (window.TTS) {
    window.TTS.speak(
      { text, locale: 'en-US', rate: 0.8 },
      () => {},
      () => speakInBrowser(text)
    );
    return;
  }

  speakInBrowser(text);
}