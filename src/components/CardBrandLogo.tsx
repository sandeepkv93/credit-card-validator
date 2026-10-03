import React from 'react'
import {
  VisaIcon,
  MastercardIcon,
  AmericanExpressIcon,
  DiscoverIcon,
  DinersClubIcon,
  JcbIcon,
  UnionPayIcon,
  MaestroIcon,
  EloIcon,
  MirIcon,
  HipercardIcon,
  HiperIcon,
} from 'react-svg-credit-card-payment-icons'
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
    sm: 'w-8 h-5.5',
    md: 'w-13 h-8.5',
    lg: 'w-18 h-12',
  }

  const baseContainer = `${sizeClasses[size]} rounded-md overflow-hidden shadow-xs flex items-center justify-center shrink-0 transition-transform ${className}`

  switch (type) {
    case 'visa':
      return (
        <div className={baseContainer} title="Visa">
          <VisaIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'mastercard':
      return (
        <div className={baseContainer} title="Mastercard">
          <MastercardIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'american-express':
      return (
        <div className={baseContainer} title="American Express">
          <AmericanExpressIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'discover':
      return (
        <div className={baseContainer} title="Discover">
          <DiscoverIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'diners-club':
      return (
        <div className={baseContainer} title="Diners Club">
          <DinersClubIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'jcb':
      return (
        <div className={baseContainer} title="JCB">
          <JcbIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'unionpay':
      return (
        <div className={baseContainer} title="China UnionPay">
          <UnionPayIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'maestro':
      return (
        <div className={baseContainer} title="Maestro">
          <MaestroIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'elo':
      return (
        <div className={baseContainer} title="Elo">
          <EloIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'mir':
      return (
        <div className={baseContainer} title="Mir">
          <MirIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'hipercard':
      return (
        <div className={baseContainer} title="Hipercard">
          <HipercardIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'hiper':
      return (
        <div className={baseContainer} title="Hiper">
          <HiperIcon className="w-full h-full object-contain" />
        </div>
      )

    case 'verve':
      return (
        <div className={baseContainer} title="Verve">
          <svg viewBox="0 0 750 471" className="w-full h-full object-contain" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="nonzero" fill="none">
              <rect fill="#00425F" width="750" height="471" rx="40" />
              <circle fill="#EE312A" cx="156.263" cy="215.5" r="115.263" />
              <path
                d="M156.263 264.873c-25.78-58.441-44.684-113.033-44.684-113.033H72.054s24.057 70.072 68.742 157.7h30.935c44.685-87.628 68.742-157.7 68.742-157.7h-39.525s-18.905 54.592-44.685 113.033zM708.045 257.606h-77.329s1.718 25.78 36.087 25.78c17.184 0 34.369-5.16 34.369-5.16l3.437 27.495s-17.185 6.874-41.243 6.874c-34.368 0-65.3-17.185-65.3-65.3 0-37.805 24.058-61.863 58.427-61.863 51.552 0 54.99 51.553 51.552 72.174zm-53.27-48.116c-22.34 0-24.059 24.057-24.059 24.057h48.116s-1.718-24.057-24.057-24.057zM442.334 216.748l5.155-27.495s-39.813-12.081-72.174 10.31v109.978h34.37l-.002-89.356c13.746-10.31 32.65-3.437 32.65-3.437zM348.416 257.606h-77.329s1.718 25.78 36.087 25.78c17.184 0 34.367-5.16 34.367-5.16l3.438 27.495s-17.184 6.874-41.242 6.874c-34.369 0-65.3-17.185-65.3-65.3 0-37.805 24.058-61.863 58.427-61.863 51.552 0 54.988 51.553 51.552 72.174zm-53.272-48.116c-22.339 0-24.057 24.057-24.057 24.057h48.116s-1.718-24.057-24.059-24.057zM525.804 268.324a534.672 534.672 0 0 1-25.777-80.102l-34.366.005s17.184 66.345 46.399 121.32h27.487c29.215-54.975 46.399-121.308 46.399-121.308H551.58a534.82 534.82 0 0 1-25.776 80.085z"
                fill="#FFF"
              />
            </g>
          </svg>
        </div>
      )

    case 'troy':
      return (
        <div className={baseContainer} title="Troy">
          <svg viewBox="0 0 750 471" className="w-full h-full object-contain" xmlns="http://www.w3.org/2000/svg">
            <rect width="750" height="471" rx="40" fill="#0A2240" />
            <g fill="#FFFFFF">
              <path d="M190 140 h35 v35 h45 v30 h-45 v90 c0 15 8 20 22 20 h23 v30 h-35 c-32 0-45-15-45-45 v-95 h-30 v-30 h30 z" />
              <path d="M295 175 h35 v25 c10-18 28-28 50-25 v38 c-28-2-50 10-50 38 v97 h-35 z" />
              <path d="M400 260 c0-50 35-88 85-88 s85 38 85 88 -35 88 -85 88 -85-38 -85-88 z m135 0 c0-32-22-55-50-55 s-50 23-50 55 22 55 50 55 50-23 50-55 z" />
              <path d="M590 175 h38 l32 85 32-85 h38 l-55 135 c-16 40-35 55-75 55 h-25 v-30 h18 c22 0 32-8 40-28 l5-12 z" />
            </g>
            <circle cx="685" cy="162" r="18" fill="#00A3E0" />
          </svg>
        </div>
      )

    case 'naranja':
      return (
        <div className={baseContainer} title="Naranja">
          <svg viewBox="0 0 750 471" className="w-full h-full object-contain" xmlns="http://www.w3.org/2000/svg">
            <rect width="750" height="471" rx="40" fill="#FF5A00" />
            <g fill="#FFFFFF" transform="translate(15, 0)">
              <path d="M110 200 h32 v20 c10-16 28-24 48-24 35 0 52 20 52 56 v96 h-32 v-88 c0-22-10-34-28-34 -18 0-30 14-30 36 v86 h-32 z" />
              <path d="M260 274 c0-45 30-78 72-78 22 0 38 9 46 22 v-18 h30 v148 h-30 v-18 c-8 13-24 22-46 22 -42 0-72-33-72-76 z m118 3 c0-24-16-44-42-44 -26 0-44 19-44 44 0 25 18 44 44 44 26 0 42-20 42-44 z" />
              <path d="M430 200 h32 v22 c8-15 22-26 42-22 v34 c-25-3-42 8-42 32 v82 h-32 z" />
              <path d="M525 274 c0-45 30-78 72-78 22 0 38 9 46 22 v-18 h30 v148 h-30 v-18 c-8 13-24 22-46 22 -42 0-72-33-72-76 z m118 3 c0-24-16-44-42-44 -26 0-44 19-44 44 0 25 18 44 44 44 26 0 42-20 42-44 z" />
              <path d="M695 200 h32 v20 c10-16 28-24 48-24 35 0 52 20 52 56 v96 h-32 v-88 c0-22-10-34-28-34 -18 0-30 14-30 36 v86 h-32 z" />
            </g>
          </svg>
        </div>
      )

    default:
      return (
        <div
          className={`${baseContainer} rounded-md bg-slate-200 dark:bg-slate-700/60 p-1 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-600/50`}
          title="Generic Card"
        >
          <CreditCard className="h-full w-full stroke-[1.5]" />
        </div>
      )
  }
}
