export type CurrencyCode = "NGN" | "USD" | "GBP"

export interface Wallet {
  code: CurrencyCode
  label: string
  symbol: string
  balance: number
  changePct: number
}

export interface Transaction {
  id: string
  name: string
  detail: string
  amount: number
  currency: CurrencyCode
  type: "in" | "out"
  category: "transfer" | "airtime" | "bills" | "savings" | "card" | "deposit"
  date: string
}

export interface Contact {
  id: string
  name: string
  handle: string
  initials: string
}

export interface SavingsGoal {
  id: string
  title: string
  saved: number
  target: number
  currency: CurrencyCode
  apy: number
  color: string
}

export interface PaymentCard {
  id: string
  label: string
  type: "virtual" | "physical"
  brand: "Visa" | "Mastercard"
  last4: string
  expiry: string
  balance: number
  currency: CurrencyCode
  frozen: boolean
  gradient: string
}

export const wallets: Wallet[] = [
  { code: "NGN", label: "Nigerian Naira", symbol: "₦", balance: 1284500.75, changePct: 3.2 },
  { code: "USD", label: "US Dollar", symbol: "$", balance: 4820.4, changePct: 1.1 },
  { code: "GBP", label: "British Pound", symbol: "£", balance: 1290.0, changePct: -0.6 },
]

export const transactions: Transaction[] = [
  {
    id: "t1",
    name: "Adaeze Okoro",
    detail: "Transfer received",
    amount: 75000,
    currency: "NGN",
    type: "in",
    category: "transfer",
    date: "Today, 09:42",
  },
  {
    id: "t2",
    name: "MTN Airtime",
    detail: "Mobile recharge",
    amount: 2000,
    currency: "NGN",
    type: "out",
    category: "airtime",
    date: "Today, 08:15",
  },
  {
    id: "t3",
    name: "Ikeja Electric",
    detail: "Utility bill",
    amount: 15400,
    currency: "NGN",
    type: "out",
    category: "bills",
    date: "Yesterday, 19:03",
  },
  {
    id: "t4",
    name: "Vault: New Laptop",
    detail: "Auto-save",
    amount: 50000,
    currency: "NGN",
    type: "out",
    category: "savings",
    date: "Yesterday, 12:00",
  },
  {
    id: "t5",
    name: "Spotify",
    detail: "Virtual card",
    amount: 9.99,
    currency: "USD",
    type: "out",
    category: "card",
    date: "Mar 14, 06:30",
  },
  {
    id: "t6",
    name: "Salary",
    detail: "Stellar deposit",
    amount: 850000,
    currency: "NGN",
    type: "in",
    category: "deposit",
    date: "Mar 12, 10:00",
  },
  {
    id: "t7",
    name: "James Bello",
    detail: "Split bill",
    amount: 12500,
    currency: "NGN",
    type: "out",
    category: "transfer",
    date: "Mar 11, 21:18",
  },
]

export const contacts: Contact[] = [
  { id: "c1", name: "Adaeze Okoro", handle: "@adaeze", initials: "AO" },
  { id: "c2", name: "James Bello", handle: "@jbello", initials: "JB" },
  { id: "c3", name: "Fatima Yusuf", handle: "@fatima", initials: "FY" },
  { id: "c4", name: "Chinedu Eze", handle: "@chinedu", initials: "CE" },
  { id: "c5", name: "Grace Adeyemi", handle: "@grace", initials: "GA" },
]

export const savingsGoals: SavingsGoal[] = [
  {
    id: "s1",
    title: "New Laptop",
    saved: 320000,
    target: 850000,
    currency: "NGN",
    apy: 12,
    color: "bg-primary",
  },
  {
    id: "s2",
    title: "Emergency Fund",
    saved: 1500,
    target: 5000,
    currency: "USD",
    apy: 8,
    color: "bg-accent",
  },
  {
    id: "s3",
    title: "Japa Travel",
    saved: 540,
    target: 2000,
    currency: "GBP",
    apy: 6,
    color: "bg-chart-3",
  },
]

export const cards: PaymentCard[] = [
  {
    id: "card1",
    label: "Spending Card",
    type: "physical",
    brand: "Mastercard",
    last4: "4821",
    expiry: "09/27",
    balance: 1284500.75,
    currency: "NGN",
    frozen: false,
    gradient: "from-primary to-accent",
  },
  {
    id: "card2",
    label: "Online USD Card",
    type: "virtual",
    brand: "Visa",
    last4: "7390",
    expiry: "04/26",
    balance: 4820.4,
    currency: "USD",
    frozen: false,
    gradient: "from-foreground to-muted-foreground",
  },
]

const symbols: Record<CurrencyCode, string> = { NGN: "₦", USD: "$", GBP: "£" }

export function formatMoney(amount: number, currency: CurrencyCode, hidden = false): string {
  if (hidden) return `${symbols[currency]}••••••`
  return `${symbols[currency]}${amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === "NGN" ? 2 : 2,
    maximumFractionDigits: 2,
  })}`
}

export const quickActions = [
  { id: "send", label: "Send", icon: "send" },
  { id: "request", label: "Request", icon: "request" },
  { id: "airtime", label: "Airtime", icon: "airtime" },
  { id: "bills", label: "Bills", icon: "bills" },
] as const

/* ---------------- Crypto / Stellar token layer ---------------- */

export type AssetCode = "XLM" | "USDC" | "USDT"

export interface CryptoAsset {
  code: AssetCode
  name: string
  /** Stellar asset issuer (mock testnet-style address) */
  issuer: string
  balance: number
  /** Spot price in USD */
  priceUsd: number
  changePct: number
  color: string
}

export const cryptoAssets: CryptoAsset[] = [
  {
    code: "XLM",
    name: "Stellar Lumens",
    issuer: "native",
    balance: 4250.5,
    priceUsd: 0.1185,
    changePct: 4.7,
    color: "bg-foreground",
  },
  {
    code: "USDC",
    name: "USD Coin",
    issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
    balance: 1820.0,
    priceUsd: 1.0,
    changePct: 0.0,
    color: "bg-primary",
  },
  {
    code: "USDT",
    name: "Tether USD",
    issuer: "GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRJVN6ZJVTG6V",
    balance: 540.25,
    priceUsd: 1.0,
    changePct: 0.01,
    color: "bg-accent",
  },
]

/** Your receive address on the Stellar network (mock) */
export const stellarAccount = {
  publicKey: "GDXSPAYWALLET7QK3MUKXHV2RZ4D6FJ5N2YHV3K2L9P8QW1ZC4T6BNRX",
  memo: "STLP-2048",
  network: "Stellar Public Network",
}

/** Conversion rates relative to 1 unit of the FROM asset */
export const conversionRates: Record<AssetCode, Record<AssetCode, number>> = {
  XLM: { XLM: 1, USDC: 0.1185, USDT: 0.1184 },
  USDC: { XLM: 8.4388, USDC: 1, USDT: 0.9994 },
  USDT: { XLM: 8.4459, USDC: 1.0006, USDT: 1 },
}

export interface OffRampMethod {
  id: string
  type: "bank" | "mobile"
  label: string
  detail: string
  initials: string
}

export const offRampMethods: OffRampMethod[] = [
  { id: "m1", type: "bank", label: "GTBank • Savings", detail: "•••• 8842", initials: "GT" },
  { id: "m2", type: "bank", label: "Access Bank • Current", detail: "•••• 1129", initials: "AC" },
  { id: "m3", type: "mobile", label: "Opay Wallet", detail: "+234 803 •••• 21", initials: "OP" },
]

/** Local fiat payout rate per 1 USD of stablecoin, by currency */
export const offRampRates: Record<CurrencyCode, number> = {
  NGN: 1580.5,
  USD: 1,
  GBP: 0.79,
}

export const cryptoSymbols: Record<AssetCode, string> = {
  XLM: "XLM",
  USDC: "USDC",
  USDT: "USDT",
}

export function formatCrypto(amount: number, code: AssetCode, hidden = false): string {
  if (hidden) return `•••• ${code}`
  return `${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: code === "XLM" ? 4 : 2,
  })} ${code}`
}

export function shortenKey(key: string, lead = 6, tail = 6): string {
  return `${key.slice(0, lead)}…${key.slice(-tail)}`
}
