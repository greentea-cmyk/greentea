import React, { useState, useEffect } from 'react';
import { X, Check, Mail, Calendar, MapPin, DollarSign, Send, ShieldCheck } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  isLightMode: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'General Inquiry',
  isLightMode
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('$5,000 – $12,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setSubmitting(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              Studio Dossier
            </div>
            <h3 className="text-lg font-serif text-white">
              Commission & Print Acquisition Desk
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-12 h-12 mx-auto bg-neutral-900 border border-neutral-700 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-serif text-white">Inquiry Dispatched to Studio</h4>
            <p className="text-sm text-neutral-300 font-sans leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-white">{name}</strong>. Elena and studio management review all
              portfolio requests personally. You will receive a direct reply and tailored portfolio deck within 24 hours at{' '}
              <span className="text-white font-mono">{email}</span>.
            </p>
            <div className="p-3 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 max-w-sm mx-auto">
              Reference: REF-{Math.floor(100000 + Math.random() * 900000)} · Zurich Studio Desk
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white text-neutral-950 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Inquiry Classification
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
              >
                <option value="Architectural & Fine Art Commission">Architectural & Fine Art Commission</option>
                <option value="Private Collector Print Acquisition">Private Collector Print Acquisition</option>
                <option value="Editorial Campaign / Cover Story">Editorial Campaign / Cover Story</option>
                <option value="Institutional Exhibition / Museum Loan">Institutional Exhibition / Museum Loan</option>
                <option value="General Commission / Print Acquisition">General Commission / Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Direct Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Organization / Studio (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Foster & Partners / Private"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Shoot Location / Project Territory
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kyoto, Japan or Milan, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Target Budget Bracket
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {['$2,500 – $5,000', '$5,000 – $12,000', '$12,000 – $25,000', 'Over $25,000'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`py-2 px-2 text-center border transition-colors ${
                      budget === b
                        ? 'bg-neutral-800 border-white text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Brief & Project Scope *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your vision, timeline, specific architectural structures, or required deliverables..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500 rounded-none resize-none"
              />
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500">
                Zurich CET · Confidential Studio Handling
              </span>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Transmitting...' : 'Send Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
