# 💳 Credit Card Validator & Inspector

A modern, responsive, client-side web application for validating and inspecting credit cards in real time. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and powered completely by [Braintree's official `card-validator`](https://github.com/braintree/card-validator) library.

🔗 **Live Demo:** [https://sandeepkv93.github.io/credit-card-validator/](https://sandeepkv93.github.io/credit-card-validator/)

Designed for seamless deployment to **GitHub Pages**.

---

## ✨ Features

- **Interactive 3D Flipping Card**:
  - Realistic card with EMV golden contact chip, NFC contactless payment wave, dynamic network branding, and embossed typography.
  - Auto-flips to the reverse signature strip when focusing on the CVV/CVC field.
  - Formats card numbers in real-time according to card-specific gaps (e.g. `4-6-5` for American Express, `4-4-4-4` for Visa/Mastercard, `4-6-4` for Diners Club).
  - Dynamic brand styling, metallic gradient, and glowing ambient drop shadows for 15+ payment networks.

- **Complete Braintree `card-validator` Integration**:
  - `cardValidator.number`: Card network pattern matching, Luhn modulo-10 checksum validation, allowed length checks.
  - `cardValidator.expirationDate`: Expiration date parsing, validity checking, past date detection.
  - `cardValidator.expirationMonth` & `expirationYear`: Fine-grained expiration diagnostics (e.g., current year check, valid for this year).
  - `cardValidator.cvv`: Dynamic security code verification (matches expected size, e.g. 4-digit CID for Amex, 3-digit CVV for Visa).
  - `cardValidator.cardholderName`: Format & length validation.
  - `cardValidator.postalCode`: Billing ZIP / postal code validation (international support).
  - `cardValidator.creditCardType`: Direct access to network specifications, allowed lengths, and gaps.

- **Deep Diagnostic Inspector**:
  - Real-time inspector displaying the complete raw JSON responses from all `card-validator` API functions.
  - Interactive **Luhn Algorithm Visualizer** showing the step-by-step breakdown of doubling alternating digits and calculating the modulo-10 checksum.

- **Batch Card Validator**:
  - Bulk validation for multiple card numbers at once.
  - Real-time statistics: Total Cards, Valid (Luhn Passed), and Invalid / Failed.
  - Filter by status and export results as **CSV** or **JSON**.

- **15 Supported Card Networks & Test Presets**:
  - Visa, Mastercard, American Express, Discover, Diners Club, JCB, UnionPay, Maestro, Elo, Mir, Hiper, Hipercard, Troy, Verve, and Naranja.
  - Quick 1-click test cards for valid and edge-case scenarios (e.g. failing Luhn checksum, expired date).

- **100% Client-Side & Privacy First**:
  - All validations execute strictly in the client's browser.
  - Zero server calls, zero telemetry, zero card data storage.

---

## 🚀 Deployment to GitHub Pages

The project is pre-configured with relative asset paths (`base: './'`) in `vite.config.ts`, ensuring it works under any GitHub Pages repository path without configuration changes.

### Option A: Automated GitHub Actions (Recommended)

A workflow file is already included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically build and publish your site!

### Option B: Manual CLI Deployment

You can deploy directly to the `gh-pages` branch using:

```bash
npm run deploy
```

---

## 💻 Local Development

### Prerequisites
- Node.js (v18 or newer recommended, tested on Node 22 & 24)
- npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
credit-card-validator/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   └── favicon.svg                 # Credit card SVG icon
├── src/
│   ├── components/
│   │   ├── BatchValidator.tsx      # Multi-card bulk testing & CSV/JSON export
│   │   ├── BrandShowcase.tsx       # 15-network card catalog with test presets
│   │   ├── CardBrandLogo.tsx       # Vector SVG logos for payment card brands
│   │   ├── CardForm.tsx            # Form with real-time feedback & validation
│   │   ├── CreditCardVisual.tsx    # 3D flipping interactive card visual
│   │   ├── DiagnosticInspector.tsx # Deep API inspector & Luhn visualizer
│   │   ├── Footer.tsx              # Safe client-side statement & links
│   │   └── Navbar.tsx              # Top navigation, theme switcher, tabs
│   ├── types/
│   │   └── card.ts                 # TypeScript interfaces
│   ├── utils/
│   │   └── cardValidator.ts        # Braintree card-validator wrappers & presets
│   ├── App.tsx                     # Main application layout & reactive state
│   ├── index.css                   # Tailwind CSS v4 styling & 3D card classes
│   └── main.tsx                    # React DOM root entry
├── package.json
├── tsconfig.app.json
├── vite.config.ts                  # Vite config with @tailwindcss/vite & base: './'
└── README.md
```

---

## 🛡️ License

MIT License. Uses [braintree/card-validator](https://github.com/braintree/card-validator) (MIT License).
