import React from 'react'
import { creditCardType, PRESET_CARDS } from '../utils/cardValidator'
import { CardBrandLogo } from './CardBrandLogo'
import type { PresetCardItem } from '../types/card'
import { ArrowRight, Check } from 'lucide-react'

interface BrandShowcaseProps {
  onSelectPreset: (preset: PresetCardItem) => void
  currentBrand?: string | null
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  onSelectPreset,
  currentBrand,
}) => {
  const cardTypes = creditCardType.types
  const typeKeys = Object.keys(cardTypes)

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
            Supported Card Networks & Test Presets
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Braintree <code className="text-blue-600 dark:text-blue-400 font-mono">card-validator</code> includes full pattern recognition, Luhn checksum verification, length matching, and code types for 15 payment networks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {typeKeys.map((key) => {
          const typeId = (cardTypes as Record<string, string>)[key]
          const info = creditCardType.getTypeInfo(typeId)
          const matchedPreset = PRESET_CARDS.find((p) => p.type === typeId)
          const isCurrent = currentBrand === typeId

          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 ring-1 ring-blue-500 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <CardBrandLogo type={typeId} size="sm" />
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {info.niceType}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {info.type}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lengths:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {info.lengths.join(', ')} digits
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Security Code:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {info.code.name} ({info.code.size} digits)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Spacing Gaps:</span>
                    <span>[{info.gaps.join(', ')}]</span>
                  </div>
                </div>
              </div>

              {matchedPreset ? (
                <button
                  type="button"
                  onClick={() => onSelectPreset(matchedPreset)}
                  className="mt-3.5 w-full py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span>Load {info.niceType} Test Card</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <div className="mt-3.5 text-center text-[11px] text-slate-400 py-1">
                  Supported via card-validator
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
