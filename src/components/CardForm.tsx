import React, { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Shuffle,
} from 'lucide-react'
import type {
  CardFormData,
  CardNumberValidation,
  ExpirationDateValidation,
  GenericValidation,
  PresetCardItem,
} from '../types/card'
import {
  formatCardNumber,
  formatExpirationDate,
  PRESET_CARDS,
} from '../utils/cardValidator'
import { CardBrandLogo } from './CardBrandLogo'

interface CardFormProps {
  formData: CardFormData
  onChange: (data: CardFormData) => void
  onFlipCard: (isFlipped: boolean) => void
  numberValidation: CardNumberValidation
  expirationValidation: ExpirationDateValidation
  cvvValidation: GenericValidation
  nameValidation: GenericValidation
  postalValidation: GenericValidation
  onSelectPreset: (preset: PresetCardItem) => void
}

export const CardForm: React.FC<CardFormProps> = ({
  formData,
  onChange,
  onFlipCard,
  numberValidation,
  expirationValidation,
  cvvValidation,
  nameValidation,
  postalValidation,
  onSelectPreset,
}) => {
  const [copied, setCopied] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null)
  const numberInputRef = useRef<HTMLInputElement>(null)

  const cardInfo = numberValidation.card
  const codeName = cardInfo?.code?.name || 'CVV'
  const codeSize = cardInfo?.code?.size || 3
  const expectedLengths = cardInfo?.lengths || [16]
  const gaps = cardInfo?.gaps || [4, 8, 12]

  const isFormCompletelyValid =
    numberValidation.isValid &&
    expirationValidation.isValid &&
    cvvValidation.isValid &&
    nameValidation.isValid &&
    postalValidation.isValid

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    // Cap to max length if defined by card or fallback 19
    const maxLen = expectedLengths[expectedLengths.length - 1] || 19
    const trimmed = rawVal.slice(0, maxLen)
    const formatted = formatCardNumber(trimmed, gaps)

    onChange({
      ...formData,
      number: formatted,
    })
  }

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value)
    onChange({
      ...formData,
      expiration: formatted,
    })
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    const maxLen = Array.isArray(codeSize) ? Math.max(...codeSize) : codeSize
    onChange({
      ...formData,
      cvv: rawVal.slice(0, maxLen),
    })
  }

  const handleCopyNumber = () => {
    const rawDigits = formData.number.replace(/\D/g, '')
    if (rawDigits) {
      navigator.clipboard.writeText(rawDigits)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    onChange({
      number: '',
      holderName: '',
      expiration: '',
      cvv: '',
      postalCode: '',
    })
    setIsSubmitted(false)
    setSubmissionSuccess(null)
    onFlipCard(false)
    numberInputRef.current?.focus()
  }

  const handleRandomPreset = () => {
    const validPresets = PRESET_CARDS.filter((p) => p.isValid)
    const random = validPresets[Math.floor(Math.random() * validPresets.length)]
    onSelectPreset(random)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (isFormCompletelyValid) {
      setSubmissionSuccess(true)
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'],
        })
      } catch {
        // Confetti fallback
      }
    } else {
      setSubmissionSuccess(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-5 sm:p-7 transition-all">
      {/* Quick Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Quick Presets
          </span>
          <select
            aria-label="Load preset test card"
            className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const selected = PRESET_CARDS.find((p) => p.id === e.target.value)
              if (selected) onSelectPreset(selected)
            }}
            value=""
          >
            <option value="" disabled>
              Select Card Preset...
            </option>
            {PRESET_CARDS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name} {preset.isValid ? '✓' : '✗'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleRandomPreset}
            className="inline-flex items-center gap-1 text-xs font-medium py-1.5 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            title="Fill random valid card"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Random Test</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-xs font-medium py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Validation Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* FIELD 1: Card Number */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="cardNumber"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <span>Card Number</span>
              {cardInfo && (
                <span className="text-[11px] font-normal lowercase tracking-normal text-blue-600 dark:text-blue-400">
                  ({cardInfo.niceType})
                </span>
              )}
            </label>

            {/* Status Indicator Pill */}
            {formData.number.trim() && (
              <div className="flex items-center gap-1 text-xs">
                {numberValidation.isValid ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Valid Luhn & Length
                  </span>
                ) : numberValidation.isPotentiallyValid ? (
                  <span className="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-medium">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    Incomplete / Typing...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-500 dark:text-rose-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Invalid Card Number
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="relative flex items-center">
            {/* Embedded Card Brand Icon */}
            <div className="absolute left-3 flex items-center pointer-events-none">
              <CardBrandLogo type={cardInfo?.type} size="sm" />
            </div>

            <input
              ref={numberInputRef}
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              value={formData.number}
              onChange={handleNumberChange}
              onFocus={() => onFlipCard(false)}
              className={`w-full pl-13 pr-10 py-2.5 rounded-xl font-mono text-base tracking-wider bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                !formData.number.trim()
                  ? 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  : numberValidation.isValid
                  ? 'border-emerald-500/80 focus:ring-emerald-500 bg-emerald-50/10'
                  : numberValidation.isPotentiallyValid
                  ? 'border-amber-500/80 focus:ring-amber-500 bg-amber-50/10'
                  : 'border-rose-500/80 focus:ring-rose-500 bg-rose-50/10'
              }`}
            />

            {/* Quick Copy Number */}
            {formData.number.trim() && (
              <button
                type="button"
                onClick={handleCopyNumber}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Copy card digits"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Subtext info */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 px-1">
            <span>
              Supported: Visa, MC, Amex, Discover, JCB, Diners, UnionPay, Maestro + 7 more
            </span>
            {cardInfo && (
              <span className="font-mono">
                Lengths: {cardInfo.lengths.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* FIELD 2: Cardholder Name */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="holderName"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Cardholder Name
            </label>
            {formData.holderName.trim() && (
              <span className="text-xs">
                {nameValidation.isValid ? (
                  <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                  </span>
                ) : (
                  <span className="text-amber-500 inline-flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Incomplete
                  </span>
                )}
              </span>
            )}
          </div>

          <input
            id="holderName"
            name="holderName"
            type="text"
            autoComplete="cc-name"
            placeholder="Jane Doe"
            value={formData.holderName}
            onChange={(e) =>
              onChange({
                ...formData,
                holderName: e.target.value,
              })
            }
            onFocus={() => onFlipCard(false)}
            className={`w-full px-3.5 py-2.5 rounded-xl font-medium text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white uppercase tracking-wide transition-all focus:outline-none focus:ring-2 ${
              !formData.holderName.trim()
                ? 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                : nameValidation.isValid
                ? 'border-emerald-500/80 focus:ring-emerald-500'
                : 'border-amber-500/80 focus:ring-amber-500'
            }`}
          />
        </div>

        {/* ROW 3: Expiration Date, CVV, Billing ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Expiration Date */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="expiration"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Expires
              </label>
              {formData.expiration.trim() && (
                <span className="text-xs">
                  {expirationValidation.isValid ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : expirationValidation.isPotentiallyValid ? (
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  )}
                </span>
              )}
            </div>

            <input
              id="expiration"
              name="expiration"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              value={formData.expiration}
              onChange={handleExpirationChange}
              onFocus={() => onFlipCard(false)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                !formData.expiration.trim()
                  ? 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  : expirationValidation.isValid
                  ? 'border-emerald-500/80 focus:ring-emerald-500'
                  : expirationValidation.isPotentiallyValid
                  ? 'border-amber-500/80 focus:ring-amber-500'
                  : 'border-rose-500/80 focus:ring-rose-500'
              }`}
            />
          </div>

          {/* Security Code (CVV / CVC / CID) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="cvv"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1"
                title={`${codeName} code`}
              >
                <span>{codeName}</span>
                <span className="text-[10px] text-slate-400 font-mono">({codeSize}d)</span>
              </label>
              {formData.cvv.trim() && (
                <span className="text-xs">
                  {cvvValidation.isValid ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </span>
              )}
            </div>

            <input
              id="cvv"
              name="cvv"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder={'•'.repeat(Array.isArray(codeSize) ? codeSize[0] : codeSize)}
              value={formData.cvv}
              onChange={handleCvvChange}
              onFocus={() => onFlipCard(true)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm tracking-widest bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                !formData.cvv.trim()
                  ? 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  : cvvValidation.isValid
                  ? 'border-emerald-500/80 focus:ring-emerald-500'
                  : 'border-amber-500/80 focus:ring-amber-500'
              }`}
            />
          </div>

          {/* Billing Postal Code */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="postalCode"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Billing ZIP
              </label>
              {formData.postalCode.trim() && (
                <span className="text-xs">
                  {postalValidation.isValid ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </span>
              )}
            </div>

            <input
              id="postalCode"
              name="postalCode"
              type="text"
              autoComplete="postal-code"
              placeholder="e.g. 90210"
              value={formData.postalCode}
              onChange={(e) =>
                onChange({
                  ...formData,
                  postalCode: e.target.value.toUpperCase(),
                })
              }
              onFocus={() => onFlipCard(false)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                !formData.postalCode.trim()
                  ? 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                  : postalValidation.isValid
                  ? 'border-emerald-500/80 focus:ring-emerald-500'
                  : 'border-amber-500/80 focus:ring-amber-500'
              }`}
            />
          </div>
        </div>

        {/* Submit Verification Action */}
        <div className="pt-2">
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isFormCompletelyValid
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 cursor-pointer transform active:scale-[0.99]'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify & Validate Card Details</span>
            {isFormCompletelyValid && <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />}
          </button>
        </div>

        {/* Verification Result Feedback Banner */}
        {isSubmitted && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-start gap-3 transition-all ${
              submissionSuccess
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            }`}
          >
            {submissionSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {submissionSuccess
                  ? 'All Card Details are 100% Valid!'
                  : 'Card Details Incomplete or Invalid'}
              </div>
              <p className="mt-0.5 text-xs opacity-90">
                {submissionSuccess
                  ? `Successfully validated ${cardInfo?.niceType || 'Card'} using Braintree card-validator. Card number passes Luhn mod-10 algorithm, expiration date is current, CVV length matches standard, and postal format is valid.`
                  : 'Please check the highlighted fields above. Ensure the card number satisfies the Luhn checksum and expiration date is not in the past.'}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
