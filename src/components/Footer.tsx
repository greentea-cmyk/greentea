import React, { useState } from 'react';
import { Camera, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: (topic?: string) => void;
  isLightMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, isLightMode }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterDone(true);
  };

  return (
    <footer
      className={`w-full border-t transition-colors duration-200 ${
        isLightMode
          ? 'bg-neutral-100 text-neutral-800 border-neutral-200'
          : 'bg-neutral-950 text-neutral-300 border-neutral-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-neutral-800/60">
          {/* Brand & Ethos */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-white" />
              <span className="text-lg font-bold font-sans tracking-tight uppercase text-white">
                Elena Rostova Studio
              </span>
            </div>
            <p className="text-xs font-sans text-neutral-400 max-w-sm leading-relaxed">
              Fine art photography and architectural documentation. Monograph editions published through
              independent art presses. Physical representation in Zurich, Tokyo, and New York.
            </p>
            <div className="text-xs font-mono text-neutral-500 pt-2">
              Neugasse 29, 8005 Zürich, Switzerland
            </div>
          </div>

          {/* Quick Monograph Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Series Collections
            </div>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Brutalist Horizons (2024–2025)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Terra Incognita: North (2025)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Vessels of Silence (2025)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Transient Metropoles (2024)
                </a>
              </li>
            </ul>
          </div>

          {/* Private Edition Notice & Inquiries */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Collector Bulletins & Print Drops
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Receive confidential notices 48 hours prior to limited edition monograph and museum plate releases.
            </p>

            {newsletterDone ? (
              <div className="p-3 bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed to Studio Dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="curator@institution.org"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 rounded-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Elena Rostova. All photographs copyrighted. Archival registration C2PA.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenInquiry('Gallery Press Kit Request')}
              className="hover:text-white transition-colors"
            >
              Press Kit
            </button>
            <button
              onClick={() => onOpenInquiry('Curatorial Loan Request')}
              className="hover:text-white transition-colors"
            >
              Curatorial Loans
            </button>
            <a
              href="#projects"
              className="hover:text-white transition-colors"
            >
              Top of Gallery ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
