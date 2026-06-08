import {
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  ReceiptText,
  PiggyBank,
  CreditCard,
  Banknote,
  type LucideIcon,
} from "lucide-react"
import { transactions, formatMoney, type Transaction } from "@/lib/finance-data"
import { cn } from "@/lib/utils"

const categoryIcon: Record<Transaction["category"], LucideIcon> = {
  transfer: ArrowUpRight,
  airtime: Smartphone,
  bills: ReceiptText,
  savings: PiggyBank,
  card: CreditCard,
  deposit: Banknote,
}

export function TransactionList({ limit }: { limit?: number }) {
  const items = limit ? transactions.slice(0, limit) : transactions

  return (
    <ul className="divide-y divide-border">
      {items.map((tx) => {
        const Icon = tx.type === "in" ? ArrowDownLeft : categoryIcon[tx.category]
        return (
          <li key={tx.id} className="flex items-center gap-3 py-3">
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                tx.type === "in" ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{tx.name}</p>
              <p className="truncate text-xs text-muted-foreground">{tx.detail}</p>
            </div>
            <div className="text-right">
              <p
                className={cn(
                  "text-sm font-semibold",
                  tx.type === "in" ? "text-primary" : "text-foreground",
                )}
              >
                {tx.type === "in" ? "+" : "-"}
                {formatMoney(tx.amount, tx.currency)}
              </p>
              <p className="text-[11px] text-muted-foreground">{tx.date}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
