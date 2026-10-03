import React from 'react'
import { ShieldCheck, Moon, Sun, Lock } from 'lucide-react'

export type ActiveTab = 'interactive' | 'batch' | 'inspector' | 'brands'

interface NavbarProps {
  activeTab: ActiveTab
  onSelectTab: (tab: ActiveTab) => void
  isDark: boolean
  onToggleTheme: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                Card<span className="text-blue-600 dark:text-blue-400">Validator</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <Lock className="w-2.5 h-2.5" /> Client-Side
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Powered completely by Braintree card-validator
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => onSelectTab('interactive')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'interactive'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Interactive Card
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('inspector')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'inspector'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            API Inspector
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('batch')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'batch'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Batch Validator
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('brands')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'brands'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Card Networks (15)
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* GitHub Source Link */}
          <a
            href="https://github.com/braintree/card-validator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium py-2 px-3 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800 transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Braintree Lib</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs (Mobile) */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => onSelectTab('interactive')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'interactive'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Interactive
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('inspector')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'inspector'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Inspector
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('batch')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'batch'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Batch
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('brands')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'brands'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Networks (15)
        </button>
      </div>
    </header>
  )
}
