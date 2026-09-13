import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const PILL_LABELS = [
  'See my projects',
  'Read my experience',
  'View my skills',
  'Send me a brief hello',
];

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Hero() {
  const { displayed, done } = useTypewriter(
    "Glad you stopped in. I'm building at the edge of AI, vision, and real products. Take a look around."
  );
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('sureshabhinav8@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available; ignore
    }
  };

  return (
    <section
      id="contact"
      className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
    >
      <div className="relative z-10 max-w-xl">
        <p
          className="pointer-events-none mb-5 select-none sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, I&apos;m Abhinav,
          <br />
          B.Tech student in Artificial Intelligence and Data Science
        </p>

        <p
          className="mb-5 text-black sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: 54,
          }}
        >
          {displayed}
          {!done && (
            <span
              className="typewriter-cursor ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-black"
              aria-hidden="true"
            />
          )}
        </p>

        <div className="flex flex-wrap gap-y-1">
          {PILL_LABELS.map((label) => (
            <a
              key={label}
              href="#"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              style={{
                opacity: pillsVisible ? 1 : 0,
                transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCopy}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <span>
              Reach me: <span className="underline underline-offset-1">sureshabhinav8@gmail.com</span>
            </span>
            <CopyIcon />
          </button>
          {copied && <span className="sr-only">Copied</span>}
        </div>
      </div>
    </section>
  );
}
