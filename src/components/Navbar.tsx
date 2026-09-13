import { useState } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
];

const GITHUB_URL = 'https://github.com/Abhinavsureshav';
const LINKEDIN_URL = 'https://www.linkedin.com/in/abhinav-av-0a2b97202/';

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
            <span key={link.label}>
              <a href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && <span>{', '}</span>}
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-black transition-opacity hover:opacity-60"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href="mailto:sureshabhinav8@gmail.com"
            aria-label="Email"
            className="text-black transition-opacity hover:opacity-60"
          >
            <MailIcon size={22} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-black transition-opacity hover:opacity-60"
          >
            <LinkedinIcon size={22} />
          </a>
          <a
            href="#contact"
            className="text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60"
          >
            Get in touch
          </a>
        </div>

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
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-black"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium text-black underline underline-offset-2"
        >
          Get in touch
        </a>
        <div className="flex items-center gap-6 pt-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onClick={() => setOpen(false)}
            className="text-black"
          >
            <GithubIcon size={28} />
          </a>
          <a
            href="mailto:sureshabhinav8@gmail.com"
            aria-label="Email"
            onClick={() => setOpen(false)}
            className="text-black"
          >
            <MailIcon size={28} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            onClick={() => setOpen(false)}
            className="text-black"
          >
            <LinkedinIcon size={28} />
          </a>
        </div>
      </div>
    </>
  );
}
