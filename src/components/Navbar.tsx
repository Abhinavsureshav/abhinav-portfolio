import { useState } from 'react';

const NAV_LINKS = ['Projects', 'Experience', 'Skills'];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          <span
            className="text-[21px] tracking-tight text-black sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Abhinav AV
          </span>
          <span
            className="select-none text-[25px] text-black sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            &#10035;&#65038;
          </span>
        </div>

        <nav className="hidden items-center text-[23px] text-black md:flex">
          {NAV_LINKS.map((link, i) => (
            <span key={link}>
              <a href={`#${link.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && <span>{', '}</span>}
            </span>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className="h-[2px] w-6 bg-black transition-transform duration-300"
            style={{
              transform: open ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            className="h-[2px] w-6 bg-black transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="h-[2px] w-6 bg-black transition-transform duration-300"
            style={{
              transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </header>

      <div
        className="fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-black"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium text-black underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
