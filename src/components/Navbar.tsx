import React from 'react';
import { Camera, Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (initialSubject?: string) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  isLightMode,
  onToggleTheme,
  activeSection
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b ${
        isLightMode
          ? 'bg-[#fafafa]/90 text-neutral-900 border-neutral-200 backdrop-blur-md'
          : 'bg-[#09090b]/90 text-neutral-100 border-neutral-800 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight uppercase font-sans hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Camera className="w-4 h-4 stroke-[2]" />
          <span>Elena Rostova</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
          <a
            href="#projects"
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'projects'
                ? isLightMode ? 'text-neutral-900 underline underline-offset-8' : 'text-white underline underline-offset-8'
                : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Selected Works
          </a>
          <a
            href="#monographs"
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'monographs'
                ? isLightMode ? 'text-neutral-900 underline underline-offset-8' : 'text-white underline underline-offset-8'
                : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Series & Editions
          </a>
          <a
            href="#exhibitions"
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'exhibitions'
                ? isLightMode ? 'text-neutral-900 underline underline-offset-8' : 'text-white underline underline-offset-8'
                : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Exhibitions
          </a>
          <a
            href="#artist"
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'artist'
                ? isLightMode ? 'text-neutral-900 underline underline-offset-8' : 'text-white underline underline-offset-8'
                : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Studio & Gear
          </a>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onToggleTheme}
            title={isLightMode ? 'Switch to Darkroom Gallery mode' : 'Switch to Minimal Paper mode'}
            className={`p-2 rounded-md transition-colors text-xs flex items-center gap-1.5 ${
              isLightMode
                ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            aria-label="Toggle gallery lighting"
          >
            {isLightMode ? (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-wider">Darkroom</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-wider">Paper</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenInquiry('General Commission / Print Acquisition')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all whitespace-nowrap shrink-0 rounded-none ${
              isLightMode
                ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                : 'bg-white text-neutral-950 hover:bg-neutral-200'
            }`}
          >
            Inquire / Acquire
          </button>
        </div>
      </div>
    </header>
  );
};
