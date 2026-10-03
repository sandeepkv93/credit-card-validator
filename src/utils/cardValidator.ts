import cardValidator from 'card-validator'
import type {
  CardBrandInfo,
  CardNumberValidation,
  ExpirationDateValidation,
  ExpirationMonthValidation,
  ExpirationYearValidation,
  GenericValidation,
  PresetCardItem,
  BatchItemResult,
} from '../types/card'

/**
 * Validates a credit card number using Braintree card-validator.
 */
export function validateCardNumber(
  value: string,
  options: { luhnValidateUnionPay?: boolean; maxLength?: number } = { luhnValidateUnionPay: true }
): CardNumberValidation {
  const result = cardValidator.number(value, options)
  return {
    card: (result.card as CardBrandInfo) || null,
    isPotentiallyValid: result.isPotentiallyValid,
    isValid: result.isValid,
  }
}

/**
 * Validates card expiration date using Braintree card-validator.
 */
export function validateExpirationDate(
  value: string,
  maxElapsedYear = 19
): ExpirationDateValidation {
  const result = cardValidator.expirationDate(value, maxElapsedYear)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
    month: result.month,
    year: result.year,
  }
}

/**
 * Validates expiration month specifically.
 */
export function validateExpirationMonth(value: string): ExpirationMonthValidation {
  const result = cardValidator.expirationMonth(value)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
    isValidForThisYear: result.isValidForThisYear,
  }
}

/**
 * Validates expiration year specifically.
 */
export function validateExpirationYear(
  value: string,
  maxElapsedYear = 19
): ExpirationYearValidation {
  const result = cardValidator.expirationYear(value, maxElapsedYear)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
    isCurrentYear: result.isCurrentYear,
  }
}

/**
 * Validates CVV/CVC/CID code with dynamic size.
 */
export function validateCvv(
  value: string,
  maxLength: number | number[] = 3
): GenericValidation {
  const result = cardValidator.cvv(value, maxLength)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
  }
}

/**
 * Validates cardholder name.
 */
export function validateCardholderName(value: string): GenericValidation {
  const result = cardValidator.cardholderName(value)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
  }
}

/**
 * Validates postal code / billing ZIP.
 */
export function validatePostalCode(
  value: string,
  options: { minLength?: number } = { minLength: 3 }
): GenericValidation {
  const result = cardValidator.postalCode(value, options)
  return {
    isValid: result.isValid,
    isPotentiallyValid: result.isPotentiallyValid,
  }
}

/**
 * Access to credit-card-type registry
 */
export const creditCardType = cardValidator.creditCardType

/**
 * Formats a raw card number string using card gaps (e.g. [4, 8, 12] -> "4444 4444 4444 4444")
 */
export function formatCardNumber(value: string, gaps: number[] = [4, 8, 12]): string {
  const cleaned = value.replace(/\D/g, '')
  if (!cleaned) return ''

  const parts: string[] = []
  let previousIndex = 0

  for (const gap of gaps) {
    if (cleaned.length > gap) {
      parts.push(cleaned.slice(previousIndex, gap))
      previousIndex = gap
    } else {
      break
    }
  }

  parts.push(cleaned.slice(previousIndex))
  return parts.filter(Boolean).join(' ')
}

/**
 * Formats expiration date string to MM / YY or MM / YYYY
 */
export function formatExpirationDate(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 4)
  if (cleaned.length >= 3) {
    return `${cleaned.slice(0, 2)} / ${cleaned.slice(2)}`
  }
  return cleaned
}

/**
 * Card brand visual styling specifications
 */
export interface CardBrandDesign {
  name: string
  bgGradient: string
  textColor: string
  accentColor: string
  badgeBg: string
  glowColor: string
}

export function getCardBrandDesign(type?: string | null): CardBrandDesign {
  switch (type) {
    case 'visa':
      return {
        name: 'Visa',
        bgGradient: 'from-blue-700 via-indigo-900 to-slate-950',
        textColor: 'text-white',
        accentColor: '#3b82f6',
        badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
        glowColor: 'rgba(59, 130, 246, 0.4)',
      }
    case 'mastercard':
      return {
        name: 'Mastercard',
        bgGradient: 'from-amber-600 via-rose-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#f97316',
        badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-400/30',
        glowColor: 'rgba(249, 115, 22, 0.4)',
      }
    case 'american-express':
      return {
        name: 'American Express',
        bgGradient: 'from-teal-700 via-cyan-900 to-slate-950',
        textColor: 'text-white',
        accentColor: '#06b6d4',
        badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
        glowColor: 'rgba(6, 182, 212, 0.4)',
      }
    case 'discover':
      return {
        name: 'Discover',
        bgGradient: 'from-orange-600 via-stone-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#ea580c',
        badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
        glowColor: 'rgba(234, 88, 12, 0.4)',
      }
    case 'diners-club':
      return {
        name: 'Diners Club',
        bgGradient: 'from-sky-700 via-slate-800 to-slate-950',
        textColor: 'text-white',
        accentColor: '#38bdf8',
        badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
        glowColor: 'rgba(56, 189, 248, 0.4)',
      }
    case 'jcb':
      return {
        name: 'JCB',
        bgGradient: 'from-emerald-700 via-blue-900 to-slate-950',
        textColor: 'text-white',
        accentColor: '#10b981',
        badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
        glowColor: 'rgba(16, 185, 129, 0.4)',
      }
    case 'unionpay':
      return {
        name: 'UnionPay',
        bgGradient: 'from-red-700 via-cyan-900 to-neutral-950',
        textColor: 'text-white',
        accentColor: '#ef4444',
        badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
        glowColor: 'rgba(239, 68, 68, 0.4)',
      }
    case 'maestro':
      return {
        name: 'Maestro',
        bgGradient: 'from-blue-600 via-red-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#60a5fa',
        badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
        glowColor: 'rgba(96, 165, 250, 0.4)',
      }
    case 'elo':
      return {
        name: 'Elo',
        bgGradient: 'from-yellow-600 via-red-900 to-neutral-950',
        textColor: 'text-white',
        accentColor: '#eab308',
        badgeBg: 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30',
        glowColor: 'rgba(234, 179, 8, 0.4)',
      }
    case 'mir':
      return {
        name: 'Mir',
        bgGradient: 'from-emerald-600 via-teal-900 to-slate-950',
        textColor: 'text-white',
        accentColor: '#22c55e',
        badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
        glowColor: 'rgba(34, 197, 94, 0.4)',
      }
    case 'hipercard':
    case 'hiper':
      return {
        name: 'Hipercard',
        bgGradient: 'from-rose-700 via-stone-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#f43f5e',
        badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
        glowColor: 'rgba(244, 63, 94, 0.4)',
      }
    case 'troy':
      return {
        name: 'Troy',
        bgGradient: 'from-blue-700 via-sky-900 to-slate-950',
        textColor: 'text-white',
        accentColor: '#38bdf8',
        badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
        glowColor: 'rgba(56, 189, 248, 0.4)',
      }
    case 'naranja':
      return {
        name: 'Naranja',
        bgGradient: 'from-orange-600 via-amber-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#f97316',
        badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-400/30',
        glowColor: 'rgba(249, 115, 22, 0.4)',
      }
    case 'verve':
      return {
        name: 'Verve',
        bgGradient: 'from-teal-600 via-emerald-950 to-neutral-950',
        textColor: 'text-white',
        accentColor: '#14b8a6',
        badgeBg: 'bg-teal-500/20 text-teal-200 border-teal-400/30',
        glowColor: 'rgba(20, 184, 166, 0.4)',
      }
    default:
      return {
        name: 'Credit Card',
        bgGradient: 'from-slate-800 via-slate-900 to-zinc-950',
        textColor: 'text-white',
        accentColor: '#94a3b8',
        badgeBg: 'bg-slate-700/40 text-slate-300 border-slate-600/30',
        glowColor: 'rgba(148, 163, 184, 0.2)',
      }
  }
}

/**
 * Step-by-step Luhn algorithm inspection
 */
export interface LuhnStep {
  digit: number
  isDoubled: boolean
  doubledValue: number
  finalSumContribution: number
}

export interface LuhnReport {
  steps: LuhnStep[]
  sum: number
  isValidChecksum: boolean
}

export function computeLuhnReport(cardNumber: string): LuhnReport | null {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 2) return null

  const steps: LuhnStep[] = []
  let sum = 0
  let isDoubled = false

  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = parseInt(digits[i], 10)
    let contribution = digit

    if (isDoubled) {
      const doubled = digit * 2
      contribution = doubled > 9 ? doubled - 9 : doubled
      steps.unshift({
        digit,
        isDoubled: true,
        doubledValue: doubled,
        finalSumContribution: contribution,
      })
    } else {
      steps.unshift({
        digit,
        isDoubled: false,
        doubledValue: digit,
        finalSumContribution: contribution,
      })
    }

    sum += contribution
    isDoubled = !isDoubled
  }

  return {
    steps,
    sum,
    isValidChecksum: sum % 10 === 0,
  }
}

/**
 * Presets of real test card numbers verified by Braintree card-validator
 */
export const PRESET_CARDS: PresetCardItem[] = [
  {
    id: 'visa-valid',
    name: 'Visa (Valid)',
    type: 'visa',
    number: '4000000000000002',
    cvv: '123',
    expMonth: '12',
    expYear: '29',
    postalCode: '94103',
    holderName: 'ALEXANDER SMITH',
    description: 'Standard 16-digit Visa card with 3-digit CVV',
    codeName: 'CVV',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'mastercard-valid',
    name: 'Mastercard (Valid)',
    type: 'mastercard',
    number: '5100000000000008',
    cvv: '876',
    expMonth: '08',
    expYear: '30',
    postalCode: '10001',
    holderName: 'EMILY R. JOHNSON',
    description: 'Mastercard 16-digit with 3-digit CVC code',
    codeName: 'CVC',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'amex-valid',
    name: 'American Express (Valid)',
    type: 'american-express',
    number: '340000000000009',
    cvv: '9876',
    expMonth: '11',
    expYear: '28',
    postalCode: '90210',
    holderName: 'JORDAN T. BLAKE',
    description: '15-digit Amex with 4-digit front CID and 4-6-5 gap layout',
    codeName: 'CID',
    codeSize: 4,
    isValid: true,
  },
  {
    id: 'discover-valid',
    name: 'Discover (Valid)',
    type: 'discover',
    number: '6011000000000004',
    cvv: '542',
    expMonth: '04',
    expYear: '29',
    postalCode: '60601',
    holderName: 'MORGAN REESE',
    description: 'Discover card with 3-digit CID code',
    codeName: 'CID',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'diners-club-valid',
    name: 'Diners Club (Valid)',
    type: 'diners-club',
    number: '30000000000004',
    cvv: '321',
    expMonth: '09',
    expYear: '28',
    postalCode: '75001',
    holderName: 'SEBASTIAN VANE',
    description: '14-digit Diners Club with 4-6-4 spacing',
    codeName: 'CVV',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'jcb-valid',
    name: 'JCB (Valid)',
    type: 'jcb',
    number: '2131000000000008',
    cvv: '654',
    expMonth: '06',
    expYear: '29',
    postalCode: '100-0001',
    holderName: 'KENJI SATO',
    description: 'Japan Credit Bureau international card',
    codeName: 'CVV',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'unionpay-valid',
    name: 'UnionPay (Valid)',
    type: 'unionpay',
    number: '62000000000005',
    cvv: '789',
    expMonth: '10',
    expYear: '30',
    postalCode: '200000',
    holderName: 'WEI ZHANG',
    description: 'China UnionPay with 3-digit CVN security code',
    codeName: 'CVN',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'maestro-valid',
    name: 'Maestro (Valid)',
    type: 'maestro',
    number: '493698000004',
    cvv: '444',
    expMonth: '03',
    expYear: '28',
    postalCode: 'EC1A 1BB',
    holderName: 'LUCAS MOREAU',
    description: '12-digit Maestro debit card',
    codeName: 'CVC',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'elo-valid',
    name: 'Elo (Valid)',
    type: 'elo',
    number: '4011780000000006',
    cvv: '321',
    expMonth: '05',
    expYear: '29',
    postalCode: '01310-100',
    holderName: 'GABRIEL SILVA',
    description: 'Brazilian national payment scheme with CVE',
    codeName: 'CVE',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'mir-valid',
    name: 'Mir (Valid)',
    type: 'mir',
    number: '2200000000000004',
    cvv: '129',
    expMonth: '07',
    expYear: '29',
    postalCode: '101000',
    holderName: 'DMITRI IVANOV',
    description: 'Mir payment system card with CVP2',
    codeName: 'CVP2',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'hipercard-valid',
    name: 'Hipercard (Valid)',
    type: 'hipercard',
    number: '6062820000000003',
    cvv: '912',
    expMonth: '02',
    expYear: '30',
    postalCode: '04538-133',
    holderName: 'JULIANA COSTA',
    description: 'Brazilian credit card brand',
    codeName: 'CVC',
    codeSize: 3,
    isValid: true,
  },
  {
    id: 'invalid-luhn',
    name: 'Invalid Luhn Checksum',
    type: 'visa',
    number: '4000000000000009', // Last digit wrong
    cvv: '123',
    expMonth: '12',
    expYear: '29',
    postalCode: '90210',
    holderName: 'TEST FAILING LUHN',
    description: 'Card number with valid Visa prefix and length, but failed Luhn mod 10',
    codeName: 'CVV',
    codeSize: 3,
    isValid: false,
  },
  {
    id: 'invalid-expired',
    name: 'Expired Date Card',
    type: 'mastercard',
    number: '5100000000000008',
    cvv: '321',
    expMonth: '01',
    expYear: '20', // Expired
    postalCode: '10001',
    holderName: 'EXPIRED CARDHOLDER',
    description: 'Valid Mastercard number but past expiration year',
    codeName: 'CVC',
    codeSize: 3,
    isValid: false,
  },
]

/**
 * Runs batch validation across multiple card lines
 */
export function processBatchValidation(input: string): BatchItemResult[] {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  return lines.map((line, index) => {
    // Check if line contains CSV or raw number
    const parts = line.split(/[,\t|]/)
    const rawNum = parts[0]?.trim() || line
    const cleaned = rawNum.replace(/\D/g, '')

    const valResult = validateCardNumber(cleaned)
    const cardInfo = valResult.card

    const formatted = formatCardNumber(cleaned, cardInfo?.gaps || [4, 8, 12])

    return {
      id: `batch-${index + 1}`,
      rawInput: line,
      cleanedNumber: cleaned,
      formattedNumber: formatted,
      brand: cardInfo?.niceType || 'Unknown Brand',
      brandType: cardInfo?.type || 'unknown',
      isValid: valResult.isValid,
      isPotentiallyValid: valResult.isPotentiallyValid,
      length: cleaned.length,
      expectedLengths: cardInfo?.lengths || [],
      codeName: cardInfo?.code?.name || 'CVV',
      codeSize: cardInfo?.code?.size || 3,
    }
  })
}
