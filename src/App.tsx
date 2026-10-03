import { useState, useEffect } from 'react'
import { Navbar, type ActiveTab } from './components/Navbar'
import { CreditCardVisual } from './components/CreditCardVisual'
import { CardForm } from './components/CardForm'
import { DiagnosticInspector } from './components/DiagnosticInspector'
import { BatchValidator } from './components/BatchValidator'
import { BrandShowcase } from './components/BrandShowcase'
import { Footer } from './components/Footer'
import type { CardFormData, PresetCardItem } from './types/card'
import {
  validateCardNumber,
  validateExpirationDate,
  validateCvv,
  validateCardholderName,
  validatePostalCode,
  formatCardNumber,
  formatExpirationDate,
} from './utils/cardValidator'
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react'

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    }
    return false
  })

  // Form State initialized with a clean preset for instant demonstration
  const [formData, setFormData] = useState<CardFormData>({
    number: '4000 0000 0000 0002',
    holderName: 'ALEXANDER SMITH',
    expiration: '12 / 29',
    cvv: '123',
    postalCode: '94103',
  })

  // Theme synchronization
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Reactive Validations using Braintree card-validator
  const numberValidation = validateCardNumber(formData.number)
  const expirationValidation = validateExpirationDate(formData.expiration)
  const cvvValidation = validateCvv(
    formData.cvv,
    numberValidation.card?.code?.size || [3, 4]
  )
  const nameValidation = validateCardholderName(formData.holderName)
  const postalValidation = validatePostalCode(formData.postalCode)

  const handleSelectPreset = (preset: PresetCardItem) => {
    const gaps = numberValidation.card?.gaps || [4, 8, 12]
    const formattedNum = formatCardNumber(preset.number, gaps)
    const formattedExp = formatExpirationDate(`${preset.expMonth}${preset.expYear}`)

    setFormData({
      number: formattedNum,
      holderName: preset.holderName,
      expiration: formattedExp,
      cvv: preset.cvv,
      postalCode: preset.postalCode,
    })
    setIsFlipped(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pure Client-Side Payment Verification Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Credit Card Validator
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Real-time credit card validation powered by Braintree's official{' '}
            <code className="text-blue-600 dark:text-blue-400 font-mono font-medium">card-validator</code>.
            Detects card networks, runs Luhn modulo-10 algorithm checks, verifies expiration dates, security codes, and postal formats.
          </p>
        </div>

        {/* Tab 1: Interactive Validator */}
        {activeTab === 'interactive' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Card Preview & Details */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full sticky top-24 space-y-4">
                  <CreditCardVisual
                    cardNumber={formData.number}
                    holderName={formData.holderName}
                    expiration={formData.expiration}
                    cvv={formData.cvv}
                    cardInfo={numberValidation.card}
                    isFlipped={isFlipped}
                    onCardClick={() => setIsFlipped((prev) => !prev)}
                  />

                  {/* Card Status & Details pill */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Network Identification
                      </span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {numberValidation.card?.niceType || 'Unrecognized Brand'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Luhn Checksum:</span>
                      {numberValidation.isValid ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                        </span>
                      ) : numberValidation.isPotentiallyValid ? (
                        <span className="text-amber-500 font-medium">Typing / Incomplete</span>
                      ) : (
                        <span className="text-rose-500 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Checksum Failed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Security Code Spec:</span>
                      <span className="font-mono">
                        {numberValidation.card?.code?.name || 'CVV'} ({numberValidation.card?.code?.size || 3} digits)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Card Form */}
              <div className="lg:col-span-7">
                <CardForm
                  formData={formData}
                  onChange={setFormData}
                  onFlipCard={setIsFlipped}
                  numberValidation={numberValidation}
                  expirationValidation={expirationValidation}
                  cvvValidation={cvvValidation}
                  nameValidation={nameValidation}
                  postalValidation={postalValidation}
                  onSelectPreset={handleSelectPreset}
                />
              </div>
            </div>

            {/* Embedded Live Diagnostics below interactive form */}
            <div className="pt-4">
              <DiagnosticInspector
                formData={formData}
                numberValidation={numberValidation}
                expirationValidation={expirationValidation}
                cvvValidation={cvvValidation}
                nameValidation={nameValidation}
                postalValidation={postalValidation}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Full Diagnostic Inspector */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            <DiagnosticInspector
              formData={formData}
              numberValidation={numberValidation}
              expirationValidation={expirationValidation}
              cvvValidation={cvvValidation}
              nameValidation={nameValidation}
              postalValidation={postalValidation}
            />
          </div>
        )}

        {/* Tab 3: Batch Validator */}
        {activeTab === 'batch' && <BatchValidator />}

        {/* Tab 4: Supported Brands & Presets */}
        {activeTab === 'brands' && (
          <BrandShowcase
            onSelectPreset={(preset) => {
              handleSelectPreset(preset)
              setActiveTab('interactive')
            }}
            currentBrand={numberValidation.card?.type}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
