import React, { useState } from 'react'
import {
  ListChecks,
  Download,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react'
import { processBatchValidation, PRESET_CARDS } from '../utils/cardValidator'
import { CardBrandLogo } from './CardBrandLogo'
import type { BatchItemResult } from '../types/card'

const SAMPLE_BATCH_INPUT = `${PRESET_CARDS.map((p) => p.number).join('\n')}
4000000000000009
1234567890123456
5555555555554444`

export const BatchValidator: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_BATCH_INPUT)
  const [filterMode, setFilterMode] = useState<'all' | 'valid' | 'invalid'>('all')
  const [copied, setCopied] = useState(false)

  const results: BatchItemResult[] = processBatchValidation(inputText)

  const totalCount = results.length
  const validCount = results.filter((r) => r.isValid).length
  const invalidCount = totalCount - validCount

  const filteredResults = results.filter((r) => {
    if (filterMode === 'valid') return r.isValid
    if (filterMode === 'invalid') return !r.isValid
    return true
  })

  const handleDownloadCsv = () => {
    const headers = [
      'Card Number',
      'Brand',
      'Is Valid',
      'Is Potentially Valid',
      'Length',
      'Expected Lengths',
      'Security Code',
    ]
    const rows = results.map((r) => [
      `"${r.cleanedNumber}"`,
      `"${r.brand}"`,
      r.isValid,
      r.isPotentiallyValid,
      r.length,
      `"${r.expectedLengths.join(';')}"`,
      `"${r.codeName} (${r.codeSize})"`,
    ])
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'card-validator-batch-results.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyResults = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-blue-500" />
            Batch Card Validator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Paste multiple credit card numbers (one per line) for high-speed validation and brand detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyResults}
            className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Input area */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <label htmlFor="batchCardNumbers" className="font-semibold text-slate-700 dark:text-slate-300">
            Card Numbers (one per line)
          </label>
          <button
            type="button"
            onClick={() => setInputText(SAMPLE_BATCH_INPUT)}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
          >
            <Sparkles className="w-3 h-3" />
            <span>Load Sample Dataset</span>
          </button>
        </div>
        <textarea
          id="batchCardNumbers"
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste card numbers here..."
          className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
            Total Cards
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 text-center">
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {validCount}
          </div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 font-medium uppercase tracking-wider">
            Valid (Luhn Passed)
          </div>
        </div>

        <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/50 text-center">
          <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {invalidCount}
          </div>
          <div className="text-[11px] text-rose-600/80 dark:text-rose-400/80 font-medium uppercase tracking-wider">
            Invalid / Failed
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterMode === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('valid')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterMode === 'valid'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Valid ({validCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('invalid')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterMode === 'invalid'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Invalid ({invalidCount})
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Showing {filteredResults.length} records
        </span>
      </div>

      {/* Results Table */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Brand</th>
              <th className="py-2.5 px-3">Formatted Card Number</th>
              <th className="py-2.5 px-3">Validation Status</th>
              <th className="py-2.5 px-3">Length</th>
              <th className="py-2.5 px-3">Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-2 px-3 text-slate-400 text-[11px]">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <CardBrandLogo type={item.brandType} size="sm" />
                      <span className="font-sans font-medium text-slate-800 dark:text-slate-200">
                        {item.brand}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-slate-800 dark:text-slate-200 font-semibold">
                    {item.formattedNumber || item.cleanedNumber}
                  </td>
                  <td className="py-2 px-3 font-sans">
                    {item.isValid ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Valid Luhn
                      </span>
                    ) : item.isPotentiallyValid ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        <Clock className="w-3 h-3" /> Incomplete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3 h-3" /> Invalid
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                    {item.length} d {item.expectedLengths.length > 0 && `(exp ${item.expectedLengths.join('/')})`}
                  </td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                    {item.codeName} ({item.codeSize}d)
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                  No cards matched the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
