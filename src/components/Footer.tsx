import React from 'react'
import { ShieldCheck, ExternalLink } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              100% Client-Side Safe
            </span>
            <span>—</span>
            <span>No data is stored, transmitted, or logged.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/braintree/card-validator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <span>braintree/card-validator</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <span>GitHub Pages</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-[11px] text-slate-400">
          Built with React, TypeScript, Tailwind CSS, and Braintree card-validator. Ready for GitHub Pages deployment.
        </div>
      </div>
    </footer>
  )
}
