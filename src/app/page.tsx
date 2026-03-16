"use client";

import { useState, useCallback } from "react";
import { Lock, FileText, Zap, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type ProductType = "fixed" | "overnight";

const PRODUCTS = [
  {
    id: "card-1",
    rate: 0.0425,
    rateLabel: "4.25",
    type: "fixed" as ProductType,
    badgeLabel: "Fixed Term",
    bank: "BANK A",
    title: "12-Month Fixed",
    subtitle: "Rate Guaranteed",
    tags: [
      { icon: Lock, text: "Locked for 12 Months" },
      { icon: FileText, text: "Annual Payout" },
    ],
  },
  {
    id: "card-2",
    rate: 0.0385,
    rateLabel: "3.85",
    type: "overnight" as ProductType,
    badgeLabel: "Overnight",
    bank: "BANK B",
    title: "Flexi-Saver",
    subtitle: "Daily Liquidity",
    tags: [
      { icon: Zap, text: "Instant Withdrawal" },
      { icon: TrendingUp, text: "Monthly Compounding" },
    ],
  },
  {
    id: "card-3",
    rate: 0.0475,
    rateLabel: "4.75",
    type: "fixed" as ProductType,
    badgeLabel: "Fixed Term",
    bank: "BANK C",
    title: "3-Year Special",
    subtitle: "Max Growth",
    tags: [
      { icon: Lock, text: "Locked for 3 Years" },
      { icon: FileText, text: "Compounded Annually" },
    ],
  },
] as const;

const HORIZONS = [
  { value: 1, label: "1 Year" },
  { value: 3, label: "3 Years" },
  { value: 5, label: "5 Years" },
  { value: 10, label: "10 Years" },
] as const;

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function InvestmentCalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[number]
  >(PRODUCTS[0]);
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(10);

  const calculate = useCallback(() => {
    const P = amount;
    const r = selectedProduct.rate;
    const t = years;

    if (selectedProduct.type === "overnight") {
      return P * Math.pow(1 + r / 12, 12 * t);
    }
    return P * Math.pow(1 + r, t);
  }, [amount, years, selectedProduct]);

  const totalValue = calculate();
  const interestEarned = totalValue - amount;

  const resultLabel =
    selectedProduct.type === "fixed"
      ? "Guaranteed Value"
      : "Projected Value (Variable)";

  return (
    <div className="min-h-screen flex flex-col items-center py-10 sm:py-16 px-4">
      <header className="max-w-6xl w-full text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
          Investment Strategy Forecast
        </h1>
        <p className="text-slate-300 opacity-80 text-sm sm:text-base">
          Compare guaranteed fixed returns against flexible overnight liquidity.
        </p>
      </header>

      <section
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16"
        aria-label="Investment products"
      >
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            role="button"
            tabIndex={0}
            aria-pressed={selectedProduct.id === product.id}
            aria-label={`Select ${product.title}, ${product.rateLabel}% p.a.`}
            onClick={() => setSelectedProduct(product)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProduct(product);
              }
            }}
            className={cn(
              "product-card cursor-pointer border transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] scale-100",
              "border-slate-200 bg-white text-slate-900",
              selectedProduct.id === product.id &&
                "border-[3px] border-accent-teal shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-[1.08] z-20"
            )}
          >
            <CardContent className="p-5 sm:p-6">
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block",
                  product.type === "fixed"
                    ? "bg-slate-800 text-white"
                    : "bg-emerald-500 text-white"
                )}
              >
                {product.badgeLabel}
              </span>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <div className="w-12 h-12 bg-slate-200 rounded flex-shrink-0 flex items-center justify-center font-bold text-slate-400 text-xs text-center">
                  {product.bank}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500">{product.subtitle}</p>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
                {product.rateLabel}%{" "}
                <span className="text-sm font-bold text-slate-400">p.a.</span>
              </div>
              <div className="space-y-2 border-t border-slate-200 pt-4">
                {product.tags.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-2 rounded"
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
                    {text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="text-sm font-bold text-white/80 block"
          >
            Investment Amount (€)
          </label>
          <Input
            id="amount"
            type="number"
            min={0}
            step={1000}
            value={amount}
            onChange={(e) =>
              setAmount(Math.max(0, Number(e.target.value) || 0))
            }
            className="bg-white text-slate-900 font-bold shadow-lg rounded-lg h-12 px-4"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="years"
            className="text-sm font-bold text-white/80 block"
          >
            Time Horizon (Years)
          </label>
          <Select
            id="years"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="bg-white text-slate-900 font-bold shadow-lg rounded-lg h-12 border-slate-200 [&>option]:bg-white [&>option]:text-slate-900"
          >
            {HORIZONS.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div
        className="max-w-6xl w-full bg-accent-teal rounded-xl p-8 sm:p-12 text-center shadow-2xl"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-3 sm:mb-4">
          {resultLabel}
        </p>
        <p className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 sm:mb-8">
          {formatter.format(totalValue)}
        </p>
        <div className="inline-flex items-center bg-white text-accent-teal px-6 sm:px-8 py-3 rounded-full font-black text-sm shadow-xl">
          Interest Earned: +{" "}
          <span className="ml-1">{formatter.format(interestEarned)}</span>
        </div>
      </div>
    </div>
  );
}
