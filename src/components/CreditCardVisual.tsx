import React from 'react'
import type { CardBrandInfo } from '../types/card'
import { getCardBrandDesign } from '../utils/cardValidator'
import { CardBrandLogo } from './CardBrandLogo'
import { Wifi } from 'lucide-react'

interface CreditCardVisualProps {
  cardNumber: string
  holderName: string
  expiration: string
  cvv: string
  cardInfo: CardBrandInfo | null
  isFlipped: boolean
  onCardClick?: () => void
}

export const CreditCardVisual: React.FC<CreditCardVisualProps> = ({
  cardNumber,
  holderName,
  expiration,
  cvv,
  cardInfo,
  isFlipped,
  onCardClick,
}) => {
  const brandDesign = getCardBrandDesign(cardInfo?.type)
  const isAmex = cardInfo?.type === 'american-express'

  // Determine gaps for card number formatting
  const gaps = cardInfo?.gaps || [4, 8, 12]
  const expectedLength = cardInfo?.lengths[0] || 16
  const rawDigits = cardNumber.replace(/\D/g, '')

  // Create formatted number display with placeholders
  const getMaskedFormattedNumber = () => {
    if (!rawDigits) {
      if (isAmex) {
        return '••••  ••••••  •••••'
      }
      return '••••  ••••  ••••  ••••'
    }

    const chars = rawDigits.split('')
    const groups: string[] = []
    let prevGap = 0

    for (const gap of gaps) {
      if (chars.length > gap) {
        groups.push(chars.slice(prevGap, gap).join(''))
        prevGap = gap
      } else {
        break
      }
    }
    groups.push(chars.slice(prevGap).join(''))

    return groups.join('  ')
  }

  return (
    <div
      className="perspective-1000 w-full max-w-[390px] h-[225px] sm:h-[240px] cursor-pointer select-none mx-auto group"
      onClick={onCardClick}
      title="Click card to flip"
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ease-out shadow-2xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= CARD FRONT ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden overflow-hidden bg-gradient-to-tr ${brandDesign.bgGradient} border border-white/20 shadow-xl`}
          style={{
            boxShadow: `0 20px 40px -15px ${brandDesign.glowColor}, 0 0 1px 1px rgba(255,255,255,0.15) inset`,
          }}
        >
          {/* Subtle metallic reflection effect */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          {/* Top Row: Chip + Contactless + Brand Logo */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {/* EMV Chip */}
              <div className="w-11 h-8 sm:w-12 sm:h-9 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 border border-yellow-200/80 shadow-md relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 border border-amber-600/40 rounded-sm m-1" />
                <div className="w-full h-[1px] bg-amber-600/50 absolute top-1/2 -translate-y-1/2" />
                <div className="h-full w-[1px] bg-amber-600/50 absolute left-1/3" />
                <div className="h-full w-[1px] bg-amber-600/50 absolute right-1/3" />
                <div className="w-3.5 h-3 rounded-full border border-amber-600/60 bg-yellow-400/50" />
              </div>

              {/* NFC Contactless Wave */}
              <Wifi className="w-5 h-5 text-white/70 rotate-90 stroke-[2.2]" />
            </div>

            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <CardBrandLogo type={cardInfo?.type} size="md" />
            </div>
          </div>

          {/* Middle: Card Number + Amex CID badge */}
          <div className="z-10 my-auto">
            <div className="flex items-baseline justify-between">
              <div className="font-mono text-lg sm:text-xl md:text-[22px] tracking-[0.16em] sm:tracking-[0.2em] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {getMaskedFormattedNumber()}
              </div>

              {/* Front CID for Amex */}
              {isAmex && (
                <div className="ml-2 text-right">
                  <div className="text-[8px] font-mono text-cyan-200 uppercase tracking-wider">CID</div>
                  <div className="font-mono text-xs font-bold text-white bg-black/40 px-1.5 py-0.5 rounded border border-white/20">
                    {cvv ? cvv.slice(0, 4) : '••••'}
                  </div>
                </div>
              )}
            </div>

            {cardInfo && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-white/80 font-medium tracking-wide">
                  {cardInfo.niceType}
                </span>
                <span className="text-[10px] text-white/50">•</span>
                <span className="text-[10px] text-white/60 font-mono">
                  {rawDigits.length}/{expectedLength} digits
                </span>
              </div>
            )}
          </div>

          {/* Bottom Row: Cardholder Name + Expiration */}
          <div className="flex items-end justify-between z-10 pt-1">
            <div className="flex-1 mr-4 overflow-hidden">
              <div className="text-[8px] uppercase tracking-widest text-white/70 font-medium">
                Cardholder Name
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white truncate drop-shadow-sm">
                {holderName ? holderName.toUpperCase() : 'YOUR NAME HERE'}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[8px] uppercase tracking-widest text-white/70 font-medium">
                Expires
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-white drop-shadow-sm">
                {expiration ? expiration : 'MM / YY'}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl py-4 flex flex-col justify-between backface-hidden rotate-y-180 overflow-hidden bg-gradient-to-tr ${brandDesign.bgGradient} border border-white/20 shadow-xl`}
          style={{
            boxShadow: `0 20px 40px -15px ${brandDesign.glowColor}, 0 0 1px 1px rgba(255,255,255,0.15) inset`,
          }}
        >
          {/* Black Magnetic Stripe */}
          <div className="w-full h-10 sm:h-12 bg-neutral-950 mt-1 shadow-inner relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-neutral-900 to-black/80" />
          </div>

          {/* Signature Panel + CVV Code */}
          <div className="px-5 sm:px-6 my-auto">
            <div className="text-[8px] uppercase tracking-widest text-white/70 font-medium text-right mb-1">
              Authorized Signature • {cardInfo?.code?.name || 'CVV'}
            </div>
            <div className="flex items-center">
              {/* Signature Strip */}
              <div className="flex-1 h-9 rounded-l bg-slate-100 flex items-center px-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_2px,transparent_6px)]" />
                <span className="font-serif italic text-xs text-slate-600 truncate relative z-10">
                  {holderName ? holderName : 'Authorized Signature'}
                </span>
              </div>

              {/* Security Code Box */}
              <div className="w-16 h-9 rounded-r bg-white flex items-center justify-center font-mono font-bold text-sm tracking-widest text-slate-900 border-l border-slate-300 shadow-inner">
                {cvv ? cvv : '•••'}
              </div>
            </div>

            <div className="flex items-center justify-between text-[8px] text-white/60 mt-2">
              <span>{cardInfo?.code?.name || 'CVV'} code length: {cardInfo?.code?.size || 3} digits</span>
              <span>Not valid unless signed</span>
            </div>
          </div>

          {/* Hologram / Bottom details */}
          <div className="px-5 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-6 rounded bg-gradient-to-tr from-cyan-400 via-rose-300 to-amber-300 opacity-80 border border-white/40 shadow-sm flex items-center justify-center text-[7px] font-bold text-slate-800">
                HOL
              </div>
              <span className="text-[8px] text-white/50 font-mono">
                Braintree card-validator engine
              </span>
            </div>
            <CardBrandLogo type={cardInfo?.type} size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
