import React, { useState, useMemo } from 'react';
import { LayoutGrid, Grid3X3, List, SlidersHorizontal, Eye, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { PhotoProject } from '../data/photography';

interface ProjectsGalleryProps {
  projects: PhotoProject[];
  onSelectProject: (project: PhotoProject) => void;
  onOpenPrintConfigurator: (project: PhotoProject) => void;
  isLightMode: boolean;
}

type CategoryFilter = 'all' | 'architecture' | 'editorial' | 'documentary' | 'landscape';
type ViewMode = 'bento' | 'grid' | 'index';

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  projects,
  onSelectProject,
  onOpenPrintConfigurator,
  isLightMode
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('bento');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exif.camera.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="w-full py-16 lg:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-2">
            Portfolio Archive 2024–2026
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-serif font-light ${
              isLightMode ? 'text-neutral-900' : 'text-neutral-50'
            }`}
          >
            Selected Works & Monograph Plates
          </h2>
        </div>

        {/* View Switchers (Segmented Controls) */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center p-1 rounded-sm border ${
              isLightMode
                ? 'bg-neutral-100 border-neutral-300'
                : 'bg-neutral-900/90 border-neutral-800'
            }`}
          >
            <button
              onClick={() => setViewMode('bento')}
              title="Curated Bento Layout"
              className={`p-1.5 transition-colors ${
                viewMode === 'bento'
                  ? isLightMode ? 'bg-white text-neutral-900 shadow-sm' : 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Clean 2-Column Grid"
              className={`p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? isLightMode ? 'bg-white text-neutral-900 shadow-sm' : 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('index')}
              title="Technical Index Table"
              className={`p-1.5 transition-colors ${
                viewMode === 'index'
                  ? isLightMode ? 'bg-white text-neutral-900 shadow-sm' : 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/40">
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {(
            [
              { id: 'all', label: 'All Series' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'editorial', label: 'Editorial' },
              { id: 'documentary', label: 'Documentary' },
              { id: 'landscape', label: 'Landscape' }
            ] as const
          ).map((cat) => {
            const count =
              cat.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors whitespace-nowrap shrink-0 border ${
                  isActive
                    ? isLightMode
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-950 border-white'
                    : isLightMode
                    ? 'bg-transparent text-neutral-600 border-neutral-300 hover:border-neutral-500'
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {cat.label} <span className="opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Keyword Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search series, camera, place..."
            className={`w-full px-3 py-1.5 text-xs font-mono border rounded-none focus:outline-none transition-colors ${
              isLightMode
                ? 'bg-white border-neutral-300 text-neutral-900 focus:border-neutral-800'
                : 'bg-neutral-950 border-neutral-800 text-neutral-200 focus:border-neutral-500'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Gallery Content Modes */}
      <div className="pt-10">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-800">
            <p className="text-neutral-400 font-serif text-lg">No plates matched your search criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs uppercase tracking-widest font-mono underline hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'bento' ? (
          /* Dynamic Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project, idx) => {
              // Bento layout pattern:
              // 0: wide (col-span-12 md:col-span-8)
              // 1: square/tall (col-span-12 md:col-span-4)
              // 2: portrait (col-span-12 md:col-span-5)
              // 3: landscape (col-span-12 md:col-span-7)
              // 4: full-span or wide (col-span-12)
              const spanClass =
                idx === 0
                  ? 'md:col-span-8'
                  : idx === 1
                  ? 'md:col-span-4'
                  : idx === 2
                  ? 'md:col-span-5'
                  : idx === 3
                  ? 'md:col-span-7'
                  : 'md:col-span-12';

              const aspectClass =
                idx === 0
                  ? 'aspect-[16/10]'
                  : idx === 1
                  ? 'aspect-[4/3] md:aspect-[3/4]'
                  : idx === 2
                  ? 'aspect-[3/4]'
                  : idx === 3
                  ? 'aspect-[16/11]'
                  : 'aspect-[21/9] min-h-[360px]';

              return (
                <article
                  key={project.id}
                  className={`${spanClass} group relative flex flex-col`}
                >
                  <div
                    onClick={() => onSelectProject(project)}
                    className={`relative w-full ${aspectClass} overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer`}
                  >
                    {/* Fallback frame */}
                    <div className="absolute inset-0 bg-neutral-900 -z-10" />

                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Measured Scrim on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-80 sm:opacity-40 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top right indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="bg-neutral-950/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase text-neutral-300 border border-neutral-800">
                        {project.aspectRatio}
                      </span>
                    </div>

                    {/* Floating quick actions */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="p-2 bg-neutral-950/80 hover:bg-white text-neutral-200 hover:text-neutral-950 backdrop-blur-md border border-neutral-700/60 transition-colors"
                        title="Open Lightbox"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPrintConfigurator(project);
                        }}
                        className="px-2.5 py-2 bg-neutral-950/80 hover:bg-white text-neutral-200 hover:text-neutral-950 backdrop-blur-md border border-neutral-700/60 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        title="Acquire Archival Print"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire Print</span>
                      </button>
                    </div>

                    {/* Bottom Metadata Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                      {/* Unboxed metadata (NO PILLS) */}
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 mb-1">
                        <span>{project.series}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.year}</span>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide group-hover:underline underline-offset-4 decoration-neutral-500">
                          {project.title}
                        </h3>

                        <span className="text-xs font-mono text-neutral-400 shrink-0 hidden sm:inline tabular-nums">
                          {project.exif.camera} ({project.exif.focalLength})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Caption Strip beneath card */}
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span className="line-clamp-1 max-w-[70%]">
                      {project.narrative}
                    </span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="hover:text-white inline-flex items-center gap-1 uppercase tracking-wider text-[11px] shrink-0"
                    >
                      <span>EXIF Data</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : viewMode === 'grid' ? (
          /* Uniform 2-Column Gallery Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project) => (
              <article key={project.id} className="group flex flex-col">
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer"
                >
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors" />

                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPrintConfigurator(project);
                      }}
                      className="px-3 py-1.5 bg-neutral-950/80 hover:bg-white text-neutral-200 hover:text-neutral-950 text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-neutral-700/60 transition-colors"
                    >
                      Acquire Edition
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                    <span>{project.series}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.year}</span>
                  </div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-2xl font-serif tracking-tight cursor-pointer hover:underline text-white"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 font-sans leading-relaxed">
                    {project.narrative}
                  </p>
                  <div className="mt-3 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-500 tabular-nums">
                    <span>{project.exif.camera} · {project.exif.lens}</span>
                    <span>{project.exif.aperture} · {project.exif.shutterSpeed} · ISO {project.exif.iso}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Technical Index Table */
          <div className="w-full overflow-x-auto border border-neutral-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Plate</th>
                  <th className="p-4">Title & Series</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Camera & Lens</th>
                  <th className="p-4 tabular-nums">Aperture / Shutter</th>
                  <th className="p-4 tabular-nums">ISO</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredProjects.map((project, i) => (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="hover:bg-neutral-900/50 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-mono text-neutral-500 tabular-nums">
                      {String(i + 1).padStart(2, '0')}.
                    </td>
                    <td className="p-4">
                      <div className="font-serif text-base text-white">{project.title}</div>
                      <div className="text-neutral-400">{project.series}</div>
                    </td>
                    <td className="p-4 text-neutral-300">{project.location}</td>
                    <td className="p-4 text-neutral-300">
                      <div>{project.exif.camera}</div>
                      <div className="text-neutral-500">{project.exif.lens}</div>
                    </td>
                    <td className="p-4 text-neutral-300 tabular-nums">
                      {project.exif.aperture} · {project.exif.shutterSpeed}
                    </td>
                    <td className="p-4 text-neutral-300 tabular-nums">
                      {project.exif.iso}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPrintConfigurator(project);
                        }}
                        className="px-2.5 py-1 text-[11px] uppercase tracking-wider bg-neutral-800 hover:bg-white text-neutral-200 hover:text-neutral-950 transition-colors"
                      >
                        Print Edition
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
