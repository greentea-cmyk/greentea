import React from 'react';
import { ArrowDownRight, Compass, Eye, ShieldCheck } from 'lucide-react';
import { PhotoProject } from '../data/photography';

interface HeroSectionProps {
  heroProject: PhotoProject;
  onSelectProject: (project: PhotoProject) => void;
  onOpenInquiry: (topic?: string) => void;
  isLightMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProject,
  onSelectProject,
  onOpenInquiry,
  isLightMode
}) => {
  return (
    <section className="relative w-full pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-neutral-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              {/* Unboxed subtle kicker (NO PILL) */}
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6 font-mono">
                <span>Elena Rostova</span>
                <span aria-hidden="true">·</span>
                <span>Zurich / Tokyo</span>
                <span aria-hidden="true">·</span>
                <span>Fine Art & Space</span>
              </div>

              {/* Display Headline */}
              <h1
                style={{ textWrap: 'balance' }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] mb-6 font-serif ${
                  isLightMode ? 'text-neutral-900' : 'text-neutral-50'
                }`}
              >
                Sculpting silence through light, brutalist form, and coastal geology.
              </h1>

              {/* Lead Editorial Copy */}
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-xl font-light mb-8 ${
                  isLightMode ? 'text-neutral-600' : 'text-neutral-300'
                }`}
              >
                Working predominantly with high-resolution medium format optics and 35mm rangefinders,
                Elena documents the tension between monolithic concrete structures and elemental forces.
                Each series is published as signed archival pigment editions.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-neutral-800/40 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition-transform duration-150 active:scale-[0.98] ${
                  isLightMode
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'bg-white text-neutral-950 hover:bg-neutral-200'
                }`}
              >
                <span>Browse Gallery</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onOpenInquiry('Architectural & Fine Art Commission')}
                className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold border transition-colors ${
                  isLightMode
                    ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                    : 'border-neutral-700 text-neutral-200 hover:bg-neutral-800/70 hover:border-neutral-500'
                }`}
              >
                Commission Series
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container at Matching Height */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              onClick={() => onSelectProject(heroProject)}
              className="group relative cursor-pointer overflow-hidden bg-neutral-900 rounded-sm border border-neutral-800/80 aspect-[16/10] lg:h-full min-h-[380px]"
            >
              {/* Fallback container with gradient and icon */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center -z-10">
                <span className="text-neutral-600 text-sm font-mono tracking-widest">LOADING ARCHIVAL ASSET...</span>
              </div>

              <img
                src={heroProject.imageSrc}
                alt={heroProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Overlay metadata & trigger */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                    <span>{heroProject.series}</span>
                    <span aria-hidden="true">·</span>
                    <span>{heroProject.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide">
                    {heroProject.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="block text-[11px] font-mono text-neutral-400">
                      {heroProject.exif.camera}
                    </span>
                    <span className="block text-[11px] font-mono text-neutral-500 tabular-nums">
                      {heroProject.exif.focalLength} · {heroProject.exif.aperture} · {heroProject.exif.shutterSpeed}
                    </span>
                  </div>
                  <button
                    className="p-2.5 bg-white/10 hover:bg-white text-white hover:text-neutral-950 backdrop-blur-md transition-colors rounded-none"
                    title="Inspect EXIF and full story"
                    aria-label="Inspect photograph"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Discrete Corner Kicker */}
              <div className="absolute top-4 left-4 pointer-events-none bg-neutral-950/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-neutral-300 border border-neutral-700/50">
                Featured Acquisition Plate
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metric / Credibility Row Below Split (Rule 2.B) */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <div className="text-2xl font-light font-serif tracking-tight text-neutral-100 tabular-nums">
              14 Solo Exhibitions
            </div>
            <div className="text-xs text-neutral-400 font-sans">
              Tokyo, Paris, Zurich & New York
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-light font-serif tracking-tight text-neutral-100 tabular-nums">
              100 Megapixels
            </div>
            <div className="text-xs text-neutral-400 font-sans">
              Hasselblad Medium Format & Leica M
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-light font-serif tracking-tight text-neutral-100 tabular-nums">
              28 Architectural
            </div>
            <div className="text-xs text-neutral-400 font-sans">
              Editorial monographs & commissions
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-light font-serif tracking-tight text-neutral-100 tabular-nums">
              Hasselblad Masters
            </div>
            <div className="text-xs text-neutral-400 font-sans">
              Architecture Finalist 2024–2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
