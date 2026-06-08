"use client"

import { useState } from "react"
import { Check, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { contacts, wallets, formatMoney, type CurrencyCode } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

export function SendForm() {
  const [currency, setCurrency] = useState<CurrencyCode>("NGN")
  const [contactId, setContactId] = useState<string>(contacts[0].id)
  const [amount, setAmount] = useState("")
  const [sent, setSent] = useState(false)

  const wallet = wallets.find((w) => w.code === currency)!
  const selected = contacts.find((c) => c.id === contactId)!
  const numericAmount = Number.parseFloat(amount) || 0
  const canSend = numericAmount > 0 && numericAmount <= wallet.balance

  if (sent) {
    return (
      <div className="flex flex-col items-center px-4 pt-16 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary animate-slide-in-up">
          <CheckCircle2 className="h-12 w-12" />
        </span>
        <h2 className="mt-6 text-xl font-bold text-foreground">Transfer successful</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You sent {formatMoney(numericAmount, currency)} to {selected.name}
        </p>
        <Card className="mt-6 w-full p-4 text-left">
          <Row label="Recipient" value={selected.name} />
          <Row label="Handle" value={selected.handle} />
          <Row label="Amount" value={formatMoney(numericAmount, currency)} />
          <Row label="Fee" value={formatMoney(0, currency)} />
          <Row label="Settled via" value="Stellar Network" />
        </Card>
        <Button
          className="mt-6 w-full"
          onClick={() => {
            setSent(false)
            setAmount("")
          }}
        >
          Send another
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5">
      <div className="mb-5 flex justify-center gap-1.5 rounded-full bg-secondary p-1">
        {wallets.map((w) => (
          <button
            key={w.code}
            type="button"
            onClick={() => setCurrency(w.code)}
            className={cn(
              "flex-1 rounded-full py-2 text-xs font-semibold transition-all",
              currency === w.code ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground",
            )}
          >
            {w.code}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-card p-6 text-center shadow-sm">
        <p className="text-xs text-muted-foreground">Amount to send</p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className="text-2xl font-semibold text-muted-foreground">{wallet.symbol}</span>
          <input
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="w-40 bg-transparent text-center text-4xl font-bold text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Balance: {formatMoney(wallet.balance, currency)}
        </p>
      </div>

      <p className="mb-2 mt-6 text-sm font-semibold text-foreground">Send to</p>
      <div className="space-y-2">
        {contacts.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setContactId(c.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all",
              contactId === c.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary",
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-foreground">{c.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.handle}</p>
            </div>
            {contactId === c.id && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
            )}
          </button>
        ))}
      </div>

      <Button className="mt-6 w-full" disabled={!canSend} onClick={() => setSent(true)}>
        {numericAmount > wallet.balance ? "Insufficient balance" : "Send money"}
      </Button>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
