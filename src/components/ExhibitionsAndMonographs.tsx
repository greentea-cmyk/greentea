import React from 'react';
import { BookOpen, Camera, Award, ArrowUpRight, Compass } from 'lucide-react';
import { EXHIBITIONS_DATA, CAMERA_BAG_ITEMS, CLIENT_COMMISSIONS, PhotoProject } from '../data/photography';

interface ExhibitionsAndMonographsProps {
  onOpenInquiry: (topic?: string) => void;
  isLightMode: boolean;
}

export const ExhibitionsAndMonographs: React.FC<ExhibitionsAndMonographsProps> = ({
  onOpenInquiry,
  isLightMode
}) => {
  return (
    <section id="monographs" className="w-full py-16 lg:py-24 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Monograph & Publication Series */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-2">
                Published Volumes
              </div>
              <h2
                className={`text-3xl sm:text-4xl font-serif font-light ${
                  isLightMode ? 'text-neutral-900' : 'text-neutral-50'
                }`}
              >
                Monograph Books & Folios
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm">
              Clothbound limited edition publications distributed through Steidl, Hartmann Books, and independent art book fairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                  <span>Steidl Editions</span>
                  <span className="tabular-nums">2025</span>
                </div>
                <h3 className="text-xl font-serif text-white">Brutalist Horizons</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                  240 pages, tritone offset printing on GardaPat Kiara archival paper. Essay by Kenneth Frampton on tectonic mass and maritime climate.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-300">Edition of 1,200</span>
                <button
                  onClick={() => onOpenInquiry('Book Order: Brutalist Horizons')}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Acquire Copy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                  <span>Hartmann Books</span>
                  <span className="tabular-nums">2024</span>
                </div>
                <h3 className="text-xl font-serif text-white">Terra Incognita: North</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                  Monograph documenting 3 years along the volcanic basalt coastline of Iceland and the Faroe archipelago. Hardcover raw linen slipcase.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-300">Edition of 800</span>
                <button
                  onClick={() => onOpenInquiry('Book Order: Terra Incognita')}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Acquire Copy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-neutral-900/50 border border-neutral-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                  <span>Self-Published Folio</span>
                  <span className="tabular-nums">2023</span>
                </div>
                <h3 className="text-xl font-serif text-white">Transient Metropoles</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                  Loose leaf exhibition portfolio in bespoke embossed clam-shell box with 16 loose pigment prints, signed and numbered.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-300">Edition of 50 (Signed)</span>
                <button
                  onClick={() => onOpenInquiry('Portfolio Box: Transient Metropoles')}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Acquire Copy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exhibitions Section */}
        <div id="exhibitions" className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-2">
                Curatorial History
              </div>
              <h2
                className={`text-3xl sm:text-4xl font-serif font-light ${
                  isLightMode ? 'text-neutral-900' : 'text-neutral-50'
                }`}
              >
                Solo & Institutional Exhibitions
              </h2>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              Gallery representation: Galerie Vane (Zurich) & SORA Projects (Tokyo)
            </div>
          </div>

          <div className="divide-y divide-neutral-800/70 border-b border-neutral-800/70">
            {EXHIBITIONS_DATA.map((ex, i) => (
              <div
                key={i}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/40 px-2 transition-colors"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-mono text-neutral-500 tabular-nums w-12 shrink-0">
                    {ex.year}
                  </span>
                  <div>
                    <h4 className="text-lg font-serif text-white">{ex.title}</h4>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">
                      {ex.venue} · {ex.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="uppercase tracking-wider">{ex.type} Exhibition</span>
                  <button
                    onClick={() => onOpenInquiry(`Exhibition Inquiry: ${ex.title}`)}
                    className="text-white hover:underline text-[11px] uppercase tracking-wider"
                  >
                    Catalog
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio & Camera Bag ("The Gear & Medium Format Optics") */}
        <div id="artist" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Philosophy & Bio */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-2">
                  Artist Monograph
                </div>
                <h3 className="text-3xl font-serif text-white">Elena Rostova</h3>
              </div>

              <div className="space-y-4 text-sm text-neutral-300 font-sans leading-relaxed">
                <p>
                  Trained in architectural design at ETH Zurich before dedicating her practice to fine-art
                  cinematography, Elena approaches photography as an inquiry into spatial silence.
                </p>
                <p>
                  Rejecting rapid burst photography and post-production composite manipulation, every
                  plate is meticulously framed using slow medium-format primes or mechanical rangefinders.
                  Her works form part of private collections across Switzerland, Japan, and the United States.
                </p>
              </div>

              {/* Commission Client List */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Selected Commission Clients
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-400">
                  {CLIENT_COMMISSIONS.map((client) => (
                    <span key={client} className="hover:text-white transition-colors">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Optics ("The Bag") */}
            <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800/80 p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
                  <Camera className="w-4 h-4" />
                  <span>The Instrumentarium · Optical System</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">Fixed Focal Length Primes Only</span>
              </div>

              <div className="space-y-4">
                {CAMERA_BAG_ITEMS.map((item, idx) => (
                  <div key={idx} className="pb-3 border-b border-neutral-800/50 last:border-0">
                    <div className="flex items-baseline justify-between text-xs font-mono mb-1">
                      <span className="text-white font-medium">{item.item}</span>
                      <span className="text-neutral-500">{item.type}</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Cryptographic Content Credentials (C2PA) Verified
                </span>
                <button
                  onClick={() => onOpenInquiry('Studio Technical Consultation / Workshop')}
                  className="text-xs font-mono uppercase tracking-wider text-white hover:underline flex items-center gap-1"
                >
                  <span>Request Studio Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
