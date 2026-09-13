import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
}

interface UseTypewriterResult {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  { speed = 38, startDelay = 600 }: UseTypewriterOptions = {}
): UseTypewriterResult {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay]);

  return { displayed, done };
}
