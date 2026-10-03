import React from 'react'
import { CreditCard } from 'lucide-react'

interface CardBrandLogoProps {
  type?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const CardBrandLogo: React.FC<CardBrandLogoProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-5 w-8',
    md: 'h-8 w-12',
    lg: 'h-11 w-16',
  }

  const baseClass = `${sizeClasses[size]} object-contain flex items-center justify-center shrink-0 transition-transform ${className}`

  switch (type) {
    case 'visa':
      return (
        <div className={`${baseClass} rounded bg-white/95 px-1 py-0.5 shadow-sm`}>
          <svg viewBox="0 0 141.7 44.5" className="h-full w-full" fill="none">
            <path
              d="M56.4 1.2L36.8 43.3H23.9L14.6 9.6c-.6-2.4-1.2-3.3-3.1-4.3-3.1-1.7-8.2-3.3-12.7-4.3L-.6 1.2h20.8c2.6 0 5 1.8 5.6 4.7l5 26.5L43.8 1.2h12.6zm37.2 28.5c0-8.2-11.4-8.7-11.3-12.4 0-1.1 1.1-2.3 3.5-2.6 1.2-.2 4.4-.3 8.2 1.4l1.5-6.8c-2-0.7-4.6-1.4-7.9-1.4-8.3 0-14.2 4.4-14.2 10.7 0 4.7 4.2 7.3 7.4 8.8 3.3 1.6 4.4 2.6 4.4 4.1 0 2.2-2.7 3.2-5.2 3.2-3.5 0-5.5-.5-8.4-1.8l-1.5 7.1c1.9.9 5.5 1.7 9.2 1.7 8.8 0 14.5-4.3 14.8-11.1v-.7zm24.7-28.5L108.2 43.3h-12L106.3 1.2h12zm23.4 0l-9.9 31.9c-.6-1.5-2.1-7.1-3.9-15.9l-2-10.4c-.6-2.8-2.6-4.8-5.4-5.6h-16.7l-.4 1.7c4 1 8.5 2.5 11.2 4.5 2.1 1.6 2.7 2.6 3.4 5.3l8.6 32.6h12.7L141.7 1.2h-12z"
              fill="#1A1F71"
            />
          </svg>
        </div>
      )

    case 'mastercard':
      return (
        <div className={`${baseClass} rounded bg-slate-900/90 p-1 shadow-sm`}>
          <svg viewBox="0 0 100 62" className="h-full w-full">
            <circle cx="35" cy="31" r="28" fill="#EB001B" />
            <circle cx="65" cy="31" r="28" fill="#F79E1B" fillOpacity="0.9" />
            <path
              d="M50 14.1a27.9 27.9 0 0 1 0 33.8 27.9 27.9 0 0 1 0-33.8z"
              fill="#FF5F00"
            />
          </svg>
        </div>
      )

    case 'american-express':
      return (
        <div className={`${baseClass} rounded bg-[#002663] px-1 py-0.5 shadow-sm text-center flex items-center justify-center`}>
          <span className="font-black text-[9px] tracking-tighter text-white font-mono leading-none">
            AMEX
          </span>
        </div>
      )

    case 'discover':
      return (
        <div className={`${baseClass} rounded bg-white p-1 shadow-sm flex items-center justify-center`}>
          <div className="flex items-center gap-0.5">
            <span className="font-bold text-[9px] tracking-tight text-slate-800">DISC</span>
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF6000]" />
            <span className="font-bold text-[9px] tracking-tight text-slate-800">VER</span>
          </div>
        </div>
      )

    case 'diners-club':
      return (
        <div className={`${baseClass} rounded bg-white p-1 shadow-sm flex items-center justify-center`}>
          <svg viewBox="0 0 50 32" className="h-full w-full">
            <rect width="50" height="32" rx="4" fill="#0079BE" />
            <circle cx="21" cy="16" r="10" fill="white" />
            <circle cx="29" cy="16" r="10" fill="#0079BE" />
            <circle cx="29" cy="16" r="8" fill="white" />
          </svg>
        </div>
      )

    case 'jcb':
      return (
        <div className={`${baseClass} rounded bg-white p-0.5 shadow-sm flex items-center justify-center gap-0.5`}>
          <div className="h-5 w-2.5 rounded-sm bg-[#0060A8] flex items-center justify-center text-[7px] font-bold text-white">J</div>
          <div className="h-5 w-2.5 rounded-sm bg-[#EE1C25] flex items-center justify-center text-[7px] font-bold text-white">C</div>
          <div className="h-5 w-2.5 rounded-sm bg-[#00873C] flex items-center justify-center text-[7px] font-bold text-white">B</div>
        </div>
      )

    case 'unionpay':
      return (
        <div className={`${baseClass} rounded bg-white p-0.5 shadow-sm flex items-center justify-center`}>
          <div className="flex h-5 w-full rounded overflow-hidden">
            <div className="w-1/3 bg-[#DA251D] flex items-center justify-center text-[6px] font-bold text-white">银</div>
            <div className="w-1/3 bg-[#003B6F] flex items-center justify-center text-[6px] font-bold text-white">联</div>
            <div className="w-1/3 bg-[#007A3E] flex items-center justify-center text-[6px] font-bold text-white">UP</div>
          </div>
        </div>
      )

    case 'maestro':
      return (
        <div className={`${baseClass} rounded bg-slate-900/90 p-1 shadow-sm`}>
          <svg viewBox="0 0 100 62" className="h-full w-full">
            <circle cx="35" cy="31" r="28" fill="#EB001B" />
            <circle cx="65" cy="31" r="28" fill="#0099DF" fillOpacity="0.9" />
          </svg>
        </div>
      )

    case 'elo':
      return (
        <div className={`${baseClass} rounded bg-black px-1.5 py-0.5 shadow-sm flex items-center justify-center`}>
          <span className="font-extrabold text-[10px] text-yellow-400 italic">elo</span>
        </div>
      )

    case 'mir':
      return (
        <div className={`${baseClass} rounded bg-[#008939] px-1 py-0.5 shadow-sm flex items-center justify-center`}>
          <span className="font-black text-[9px] text-white tracking-widest">MIR</span>
        </div>
      )

    case 'hipercard':
    case 'hiper':
      return (
        <div className={`${baseClass} rounded bg-[#A51A1A] px-1 py-0.5 shadow-sm flex items-center justify-center`}>
          <span className="font-bold text-[8px] text-white italic">hiper</span>
        </div>
      )

    default:
      return (
        <div className={`${baseClass} rounded bg-slate-200 dark:bg-slate-700/60 p-1 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-600/50`}>
          <CreditCard className="h-full w-full stroke-[1.5]" />
        </div>
      )
  }
}
