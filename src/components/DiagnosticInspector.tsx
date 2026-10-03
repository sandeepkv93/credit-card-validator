import React, { useState } from 'react'
import {
  Code2,
  CheckCircle,
  XCircle,
  Calculator,
  Copy,
  Check,
} from 'lucide-react'
import type {
  CardFormData,
  CardNumberValidation,
  ExpirationDateValidation,
  ExpirationMonthValidation,
  ExpirationYearValidation,
  GenericValidation,
} from '../types/card'
import { computeLuhnReport, validateExpirationMonth, validateExpirationYear } from '../utils/cardValidator'

interface DiagnosticInspectorProps {
  formData: CardFormData
  numberValidation: CardNumberValidation
  expirationValidation: ExpirationDateValidation
  cvvValidation: GenericValidation
  nameValidation: GenericValidation
  postalValidation: GenericValidation
}

export const DiagnosticInspector: React.FC<DiagnosticInspectorProps> = ({
  formData,
  numberValidation,
  expirationValidation,
  cvvValidation,
  nameValidation,
  postalValidation,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'luhn' | 'rawJson'>('overview')
  const [copiedJson, setCopiedJson] = useState(false)

  // Compute month & year specific validators
  const expMonthValidation: ExpirationMonthValidation = validateExpirationMonth(
    expirationValidation.month || ''
  )
  const expYearValidation: ExpirationYearValidation = validateExpirationYear(
    expirationValidation.year || ''
  )

  // Compute live Luhn step-by-step report
  const luhnReport = computeLuhnReport(formData.number)

  const rawInspectionData = {
    cardValidator: {
      number: {
        rawInput: formData.number,
        cleaned: formData.number.replace(/\D/g, ''),
        isValid: numberValidation.isValid,
        isPotentiallyValid: numberValidation.isPotentiallyValid,
        card: numberValidation.card,
      },
      expirationDate: {
        rawInput: formData.expiration,
        isValid: expirationValidation.isValid,
        isPotentiallyValid: expirationValidation.isPotentiallyValid,
        month: expirationValidation.month,
        year: expirationValidation.year,
      },
      expirationMonth: {
        month: expirationValidation.month,
        isValid: expMonthValidation.isValid,
        isPotentiallyValid: expMonthValidation.isPotentiallyValid,
        isValidForThisYear: expMonthValidation.isValidForThisYear,
      },
      expirationYear: {
        year: expirationValidation.year,
        isValid: expYearValidation.isValid,
        isPotentiallyValid: expYearValidation.isPotentiallyValid,
        isCurrentYear: expYearValidation.isCurrentYear,
      },
      cvv: {
        rawInput: formData.cvv,
        isValid: cvvValidation.isValid,
        isPotentiallyValid: cvvValidation.isPotentiallyValid,
        expectedCode: numberValidation.card?.code || { name: 'CVV', size: 3 },
      },
      cardholderName: {
        rawInput: formData.holderName,
        isValid: nameValidation.isValid,
        isPotentiallyValid: nameValidation.isPotentiallyValid,
      },
      postalCode: {
        rawInput: formData.postalCode,
        isValid: postalValidation.isValid,
        isPotentiallyValid: postalValidation.isPotentiallyValid,
      },
    },
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawInspectionData, null, 2))
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header and Tab navigation */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            card-validator Diagnostic Inspector
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            v10.0.4
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            API Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('luhn')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              activeTab === 'luhn'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Luhn Algorithm</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rawJson')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'rawJson'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {/* Tab 1: API Overview */}
      {activeTab === 'overview' && (
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Number Check */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  cv.number()
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    numberValidation.isValid
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : numberValidation.isPotentiallyValid
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  isValid: {String(numberValidation.isValid)}
                </span>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>isPotentiallyValid:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {String(numberValidation.isPotentiallyValid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Detected Brand:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {numberValidation.card?.niceType || 'None'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Permitted Lengths:</span>
                  <span>{numberValidation.card?.lengths.join(', ') || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Card Gaps:</span>
                  <span>{JSON.stringify(numberValidation.card?.gaps || [])}</span>
                </div>
              </div>
            </div>

            {/* Expiration Date Check */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  cv.expirationDate()
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    expirationValidation.isValid
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : expirationValidation.isPotentiallyValid
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  isValid: {String(expirationValidation.isValid)}
                </span>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Parsed Month:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {expirationValidation.month || 'null'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Parsed Year:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {expirationValidation.year || 'null'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>isValidForThisYear:</span>
                  <span>{String(expMonthValidation.isValidForThisYear)}</span>
                </div>
                <div className="flex justify-between">
                  <span>isCurrentYear:</span>
                  <span>{String(expYearValidation.isCurrentYear)}</span>
                </div>
              </div>
            </div>

            {/* CVV Check */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  cv.cvv()
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    cvvValidation.isValid
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  isValid: {String(cvvValidation.isValid)}
                </span>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Code Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {numberValidation.card?.code?.name || 'CVV'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Length:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {numberValidation.card?.code?.size || 3} digits
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>isPotentiallyValid:</span>
                  <span>{String(cvvValidation.isPotentiallyValid)}</span>
                </div>
              </div>
            </div>

            {/* Postal Code & Name */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  cv.cardholderName() & postalCode()
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    nameValidation.isValid && postalValidation.isValid
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  Valid: {String(nameValidation.isValid && postalValidation.isValid)}
                </span>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Name Valid:</span>
                  <span>{String(nameValidation.isValid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Postal Code Valid:</span>
                  <span>{String(postalValidation.isValid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Postal Potentially Valid:</span>
                  <span>{String(postalValidation.isPotentiallyValid)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Luhn Algorithm Visualizer */}
      {activeTab === 'luhn' && (
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                  Luhn Modulo-10 Checksum Algorithm
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Alternating digits from the right are multiplied by 2 (if &gt;9, subtract 9). The total sum modulo 10 must equal 0.
                </p>
              </div>
              {luhnReport && (
                <div
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 ${
                    luhnReport.isValidChecksum
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                  }`}
                >
                  {luhnReport.isValidChecksum ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span>Sum: {luhnReport.sum} (Mod 10: {luhnReport.sum % 10})</span>
                </div>
              )}
            </div>

            {luhnReport ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="text-[10px] text-slate-400 border-b border-slate-200 dark:border-slate-700 font-mono">
                      <th className="py-1 px-1 font-normal">Original</th>
                      {luhnReport.steps.map((s, idx) => (
                        <th key={`orig-${idx}`} className="py-1 px-1.5 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {s.digit}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-[10px] border-b border-slate-200 dark:border-slate-700 font-mono">
                      <td className="py-1 px-1 text-slate-400">× Factor</td>
                      {luhnReport.steps.map((s, idx) => (
                        <td
                          key={`mult-${idx}`}
                          className={`py-1 px-1.5 ${
                            s.isDoubled
                              ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40'
                              : 'text-slate-400'
                          }`}
                        >
                          {s.isDoubled ? '×2' : '×1'}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-[10px] font-mono">
                      <td className="py-1 px-1 text-slate-400 font-semibold">Value</td>
                      {luhnReport.steps.map((s, idx) => (
                        <td
                          key={`val-${idx}`}
                          className={`py-1.5 px-1.5 font-bold ${
                            s.isDoubled
                              ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/30'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {s.finalSumContribution}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Enter at least 2 digits of card number to visualize the Luhn check.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Raw JSON */}
      {activeTab === 'rawJson' && (
        <div className="p-5 relative">
          <button
            type="button"
            onClick={handleCopyJson}
            className="absolute top-7 right-7 inline-flex items-center gap-1 text-xs py-1 px-2.5 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
          >
            {copiedJson ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
          </button>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-[350px]">
            {JSON.stringify(rawInspectionData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
