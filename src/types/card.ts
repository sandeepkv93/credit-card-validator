export interface CardCode {
  name: string
  size: number
}

export interface CardBrandInfo {
  niceType: string
  type: string
  patterns: (number | number[])[]
  gaps: number[]
  lengths: number[]
  code: CardCode
  matchStrength?: number
}

export interface CardNumberValidation {
  card: CardBrandInfo | null
  isPotentiallyValid: boolean
  isValid: boolean
}

export interface ExpirationDateValidation {
  isValid: boolean
  isPotentiallyValid: boolean
  month: string | null
  year: string | null
}

export interface ExpirationMonthValidation {
  isValid: boolean
  isPotentiallyValid: boolean
  isValidForThisYear: boolean
}

export interface ExpirationYearValidation {
  isValid: boolean
  isPotentiallyValid: boolean
  isCurrentYear: boolean
}

export interface GenericValidation {
  isValid: boolean
  isPotentiallyValid: boolean
}

export interface CardFormData {
  number: string
  holderName: string
  expiration: string
  cvv: string
  postalCode: string
}

export interface PresetCardItem {
  id: string
  name: string
  type: string
  number: string
  cvv: string
  expMonth: string
  expYear: string
  postalCode: string
  holderName: string
  description: string
  codeName: string
  codeSize: number
  isValid: boolean
}

export interface BatchItemResult {
  id: string
  rawInput: string
  cleanedNumber: string
  formattedNumber: string
  brand: string
  brandType: string
  isValid: boolean
  isPotentiallyValid: boolean
  length: number
  expectedLengths: number[]
  codeName: string
  codeSize: number
}
