import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Truck, Award, Eye } from 'lucide-react';
import { PhotoProject, PrintOption } from '../data/photography';

interface PrintConfiguratorModalProps {
  project: PhotoProject | null;
  onClose: () => void;
  onOpenInquiry: (initialSubject: string) => void;
  isLightMode: boolean;
}

type Currency = 'USD' | 'EUR' | 'GBP';
const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 }
};

interface FrameStyle {
  id: string;
  name: string;
  priceUsd: number;
  previewBorderColor: string;
  previewBg: string;
  description: string;
}

const FRAME_STYLES: FrameStyle[] = [
  {
    id: 'unframed',
    name: 'Archival Tube (Unframed)',
    priceUsd: 0,
    previewBorderColor: 'transparent',
    previewBg: 'bg-transparent',
    description: 'Rolled in acid-free glassine with cotton inspection gloves.'
  },
  {
    id: 'black-aluminum',
    name: 'Matte Black Aluminum',
    priceUsd: 220,
    previewBorderColor: '#18181b',
    previewBg: 'bg-neutral-900',
    description: 'Ultra-thin profile anodized aluminum with TruVue 99% UV museum glass.'
  },
  {
    id: 'white-oak',
    name: 'Natural White Oak',
    priceUsd: 280,
    previewBorderColor: '#c2a688',
    previewBg: 'bg-[#d8c2a7]',
    description: 'Hand-milled solid European oak with 5cm conservation passe-partout.'
  },
  {
    id: 'walnut-box',
    name: 'Deep Walnut Shadowbox',
    priceUsd: 340,
    previewBorderColor: '#452b1f',
    previewBg: 'bg-[#3b2419]',
    description: '30mm deep floating reveal frame with non-reflective art glass.'
  }
];

const PAPER_OPTIONS = [
  {
    id: 'hahnemuhle',
    name: 'Hahnemühle Photo Rag 308gsm',
    detail: '100% white cotton rag, smooth velvety matte finish with exceptional D-Max blacks.'
  },
  {
    id: 'baryta',
    name: 'Canson Infinity Baryta Prestige II',
    detail: 'Traditional darkroom barium sulphate coating with subtle satin reflection.'
  },
  {
    id: 'awagami',
    name: 'Awagami Washi Kozo Mulberry (+$60)',
    detail: 'Artisanal Japanese mulberry fibers with organic tactile deckle edges.'
  }
];

export const PrintConfiguratorModal: React.FC<PrintConfiguratorModalProps> = ({
  project,
  onClose,
  onOpenInquiry,
  isLightMode
}) => {
  if (!project) return null;

  const [selectedPrint, setSelectedPrint] = useState<PrintOption>(
    project.prints[0] || {
      size: 'Medium (A2)',
      dimensionCm: '42 × 59.4 cm',
      basePriceUsd: 480,
      editionLimit: 25,
      editionsRemaining: 8
    }
  );
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>(FRAME_STYLES[1]);
  const [selectedPaper, setSelectedPaper] = useState(PAPER_OPTIONS[0]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isReservedSuccess, setIsReservedSuccess] = useState(false);
  const [collectorName, setCollectorName] = useState('');
  const [collectorEmail, setCollectorEmail] = useState('');

  const paperExtra = selectedPaper.id === 'awagami' ? 60 : 0;
  const totalPriceUsd = selectedPrint.basePriceUsd + selectedFrame.priceUsd + paperExtra;
  const convertedTotal = Math.round(totalPriceUsd * CURRENCY_RATES[currency].rate);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectorEmail) return;
    setIsReservedSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-hidden shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              Print Acquisition Simulator
            </span>
            <span aria-hidden="true" className="text-neutral-700">|</span>
            <span className="text-sm font-serif text-white">{project.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center text-xs font-mono border border-neutral-800 bg-neutral-900">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 transition-colors ${
                    currency === c ? 'bg-white text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isReservedSuccess ? (
          /* Acquisition Success State */
          <div className="p-10 sm:p-14 text-center max-w-xl mx-auto space-y-6">
            <div className="w-14 h-14 mx-auto bg-neutral-900 border border-neutral-700 flex items-center justify-center text-emerald-400">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Acquisition Hold Confirmed
              </div>
              <h3 className="text-3xl font-serif font-light text-white">
                Certificate #ER-{Math.floor(100000 + Math.random() * 900000)}
              </h3>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              Thank you, {collectorName || 'Collector'}. A private invoice and provenance documentation for{' '}
              <strong className="text-white">"{project.title}"</strong> ({selectedPrint.size}, {selectedFrame.name})
              has been reserved for 48 hours and forwarded to <span className="text-white font-mono">{collectorEmail}</span>.
            </p>
            <div className="p-4 bg-neutral-900 border border-neutral-800 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Edition Status:</span>
                <span className="text-neutral-200">Edition {selectedPrint.editionLimit - selectedPrint.editionsRemaining + 1} of {selectedPrint.editionLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Medium:</span>
                <span className="text-neutral-200">{selectedPaper.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Total:</span>
                <span className="text-white font-bold tabular-nums">
                  {CURRENCY_RATES[currency].symbol}{convertedTotal} {currency}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white text-neutral-950 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          /* 2-Column Configurator Body */
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left: Interactive Framing Mockup */}
            <div className="lg:col-span-5 bg-neutral-900/60 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-6 text-center">
                Interactive Display Simulator · {selectedFrame.name}
              </div>

              {/* Framed Artwork Container */}
              <div
                className="relative max-w-[320px] sm:max-w-[360px] p-4 transition-all duration-300 shadow-2xl"
                style={{
                  backgroundColor:
                    selectedFrame.id === 'unframed' ? 'transparent' : '#f8f8f8',
                  boxShadow:
                    selectedFrame.id === 'unframed'
                      ? '0 10px 30px rgba(0,0,0,0.5)'
                      : `0 20px 40px rgba(0,0,0,0.8), inset 0 0 0 10px ${selectedFrame.previewBorderColor}`
                }}
              >
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover select-none"
                />
              </div>

              {/* Dimension label */}
              <div className="mt-6 text-center font-mono text-xs text-neutral-400">
                <span>{selectedPrint.dimensionCm}</span>
                <span className="mx-2 text-neutral-600">·</span>
                <span>{selectedPaper.name.split(' ')[0]}</span>
              </div>
            </div>

            {/* Right: Specifications & Reservation Options */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
              {/* Size Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  1. Dimension & Limited Edition Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.prints.map((p) => {
                    const isSelected = selectedPrint.size === p.size;
                    const priceConverted = Math.round(p.basePriceUsd * CURRENCY_RATES[currency].rate);
                    return (
                      <button
                        key={p.size}
                        type="button"
                        onClick={() => setSelectedPrint(p)}
                        className={`p-3 text-left border transition-all ${
                          isSelected
                            ? 'bg-neutral-900 border-white text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{p.size}</div>
                        <div className="text-[11px] font-mono text-neutral-500">{p.dimensionCm}</div>
                        <div className="mt-2 text-xs font-mono text-white tabular-nums">
                          {CURRENCY_RATES[currency].symbol}{priceConverted}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                          {p.editionsRemaining} of {p.editionLimit} left
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frame Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  2. Framing & Conservation Glass
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FRAME_STYLES.map((f) => {
                    const isSelected = selectedFrame.id === f.id;
                    const frameCostConverted = Math.round(f.priceUsd * CURRENCY_RATES[currency].rate);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFrame(f)}
                        className={`p-3 text-left border transition-all ${
                          isSelected
                            ? 'bg-neutral-900 border-white text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span>{f.name}</span>
                          <span className="font-mono text-white tabular-nums">
                            {f.priceUsd === 0 ? 'Included' : `+${CURRENCY_RATES[currency].symbol}${frameCostConverted}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
                          {f.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paper Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  3. Archival Substrate
                </label>
                <div className="space-y-2">
                  {PAPER_OPTIONS.map((paper) => {
                    const isSelected = selectedPaper.id === paper.id;
                    return (
                      <div
                        key={paper.id}
                        onClick={() => setSelectedPaper(paper)}
                        className={`p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-neutral-900 border-neutral-400 text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-xs font-medium text-neutral-200">{paper.name}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">{paper.detail}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certificate & Guarantees */}
              <div className="p-3 bg-neutral-900/60 border border-neutral-800/80 text-[11px] text-neutral-400 font-sans space-y-1">
                <div className="flex items-center gap-2 text-neutral-200 font-mono uppercase text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Museum Provenance Guarantee</span>
                </div>
                <p>
                  Includes an embossed Certificate of Authenticity (COA) with encrypted cryptographic registry,
                  hand-signed and numbered in graphite by Elena Rostova.
                </p>
              </div>

              {/* Collector Reservation Form */}
              <form onSubmit={handleReserve} className="pt-2 border-t border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Collector / Institution Name"
                    value={collectorName}
                    onChange={(e) => setCollectorName(e.target.value)}
                    className="px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Invoicing Email Address"
                    value={collectorEmail}
                    onChange={(e) => setCollectorEmail(e.target.value)}
                    className="px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-neutral-500">Total Acquisition</span>
                    <span className="text-2xl font-serif text-white font-light tabular-nums">
                      {CURRENCY_RATES[currency].symbol}{convertedTotal} <span className="text-xs font-mono text-neutral-400">{currency}</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Reserve Plate Edition
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
