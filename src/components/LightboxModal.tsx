import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Info,
  ShoppingBag,
  Share2,
  Check,
  Compass,
  Camera,
  Sliders,
  Calendar,
  MapPin
} from 'lucide-react';
import { PhotoProject } from '../data/photography';

interface LightboxModalProps {
  project: PhotoProject | null;
  projects: PhotoProject[];
  onClose: () => void;
  onNavigate: (newProject: PhotoProject) => void;
  onOpenPrintConfigurator: (project: PhotoProject) => void;
  isLightMode: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  projects,
  onClose,
  onNavigate,
  onOpenPrintConfigurator,
  isLightMode
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfo((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const total = projects.length;

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + total) % total;
    onNavigate(projects[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % total;
    onNavigate(projects[nextIndex]);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#plate-${project.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Top Bar Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        {/* Index & Title */}
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span className="text-white font-medium tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="text-neutral-600">|</span>
          <span className="text-neutral-200 font-serif text-base hidden sm:inline">
            {project.title}
          </span>
          <span aria-hidden="true" className="text-neutral-600 hidden sm:inline">·</span>
          <span className="hidden md:inline">{project.location}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className={`p-2 transition-colors rounded-none text-xs flex items-center gap-1.5 ${
              showInfo
                ? 'bg-white text-neutral-950'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title="Toggle EXIF & Project Dossier (Key: I)"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline font-mono uppercase text-[11px]">Dossier</span>
          </button>

          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title={isZoomed ? 'Fit to Screen' : 'Zoom 100%'}
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title="Copy Plate Reference Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-neutral-900 hover:bg-white text-neutral-300 hover:text-neutral-950 transition-colors ml-2"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Artwork Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16 overflow-hidden">
        {/* Prev / Next Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-950/70 hover:bg-white text-neutral-400 hover:text-neutral-950 backdrop-blur-md border border-neutral-800 transition-colors"
          title="Previous Plate (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-950/70 hover:bg-white text-neutral-400 hover:text-neutral-950 backdrop-blur-md border border-neutral-800 transition-colors"
          title="Next Plate (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Frame */}
        <div
          className={`relative transition-all duration-300 flex items-center justify-center ${
            isZoomed
              ? 'scale-125 cursor-zoom-out'
              : 'max-w-full max-h-full cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed((prev) => !prev)}
        >
          <img
            src={project.imageSrc}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="max-h-[82vh] max-w-[86vw] object-contain shadow-2xl border border-neutral-800/80 select-none"
          />
        </div>
      </div>

      {/* Slide-out Dossier & EXIF Panel */}
      {showInfo && (
        <aside className="absolute right-0 top-0 bottom-0 z-30 w-full sm:w-[420px] bg-neutral-950/95 border-l border-neutral-800 p-8 overflow-y-auto text-neutral-200 backdrop-blur-2xl animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              Technical Dossier
            </span>
            <button
              onClick={() => setShowInfo(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                {project.series} · {project.year}
              </div>
              <h3 className="text-2xl font-serif font-light text-white leading-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>{project.location}</span>
              </p>
            </div>

            {/* Narrative / Context */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Artist Statement
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {project.narrative}
              </p>
              {project.curatorNote && (
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-sans italic leading-relaxed">
                  "{project.curatorNote}"
                </div>
              )}
            </div>

            {/* EXIF Metadata Card */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
                <Camera className="w-3.5 h-3.5" />
                <span>Optical Specification & EXIF</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">Camera Body</span>
                  <span className="text-neutral-200">{project.exif.camera}</span>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">Lens Optic</span>
                  <span className="text-neutral-200">{project.exif.lens}</span>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">Aperture</span>
                  <span className="text-neutral-200 tabular-nums">{project.exif.aperture}</span>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">Shutter</span>
                  <span className="text-neutral-200 tabular-nums">{project.exif.shutterSpeed}</span>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">ISO Sensitivity</span>
                  <span className="text-neutral-200 tabular-nums">{project.exif.iso}</span>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800/80">
                  <span className="block text-neutral-500 text-[10px] uppercase">Focal Length</span>
                  <span className="text-neutral-200 tabular-nums">{project.exif.focalLength}</span>
                </div>
              </div>

              {project.exif.filmSimulationOrProfile && (
                <div className="text-[11px] font-mono text-neutral-400">
                  Profile: <span className="text-neutral-300">{project.exif.filmSimulationOrProfile}</span>
                </div>
              )}
            </div>

            {/* Print acquisition trigger */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="mb-3">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Archival Pigment Edition
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-0.5">
                  Available in limited hand-numbered editions with signed studio COA.
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPrintConfigurator(project);
                }}
                className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Configure Print Acquisition</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
