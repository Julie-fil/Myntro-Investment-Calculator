"use client";

import { useState, useCallback } from "react";
import { ChevronDown, Lock, FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    id: "card-1",
    name: "Bank Name",
    country: "Country (AAA)",
    rate: 0.0355,
    rateLabel: "3.55",
  },
  {
    id: "card-2",
    name: "Bank Name",
    country: "Country (AAA)",
    rate: 0.042,
    rateLabel: "4.20",
  },
  {
    id: "card-3",
    name: "Bank Name",
    country: "Country (AAA)",
    rate: 0.058,
    rateLabel: "5.80",
  },
  {
    id: "card-4",
    name: "Bank Name",
    country: "Country (AAA)",
    rate: 0.031,
    rateLabel: "3.10",
  },
] as const;

const HORIZONS = [
  { value: 5, label: "5 years (5X)" },
  { value: 10, label: "10 years (10X)" },
  { value: 20, label: "20 years (20X)" },
  { value: 30, label: "30 years (30X)" },
] as const;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrencyInput(value: number) {
  return "€ " + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseCurrencyInput(s: string): number {
  const cleaned = s.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : Math.max(0, n);
}

export default function InvestmentCalculatorPage() {
  const [selectedRate, setSelectedRate] = useState(0.0355);
  const [activeCardId, setActiveCardId] = useState("card-1");
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(10);
  const [amountFocused, setAmountFocused] = useState(false);

  const P = amount;
  const r = selectedRate;
  const t = years;
  const A = P * Math.pow(1 + r, t);
  const interest = A - P;

  const selectProduct = useCallback((rate: number, cardId: string) => {
    setSelectedRate(rate);
    setActiveCardId(cardId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 sm:py-20 px-4">
      <header className="max-w-6xl w-full text-center mb-10 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight">
          Product cards headline
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
          A subtitle assists the headline and offers the user a deeper understanding of what the section is about and how it benefits the user to read it.
        </p>
      </header>

      <section
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-20"
        aria-label="Investment products"
      >
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            role="button"
            tabIndex={0}
            aria-pressed={activeCardId === product.id}
            aria-label={`Select ${product.name}, ${product.rateLabel} p.a.`}
            onClick={() => selectProduct(product.rate, product.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectProduct(product.rate, product.id);
              }
            }}
            className={cn(
              "cursor-pointer border-2 scale-100 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-4 focus-visible:ring-offset-deep-teal focus:outline-none bg-slate-100/95 border-slate-200",
              activeCardId === product.id &&
                "border-accent-teal scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-10 bg-white"
            )}
          >
            <CardContent className="p-6">
              <span className="inline-block bg-accent-teal text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                High Emphasis Chip
              </span>
              <div className="flex items-center gap-3 mt-6 mb-5">
                <div className="w-11 h-11 bg-slate-300 rounded flex-shrink-0" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900">{product.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{product.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                <ChevronDown
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    activeCardId === product.id ? "text-accent-teal" : "text-slate-600"
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "text-2xl sm:text-3xl font-black tracking-tighter",
                    activeCardId === product.id ? "text-accent-teal" : "text-slate-800"
                  )}
                >
                  {product.rateLabel}%
                </span>
                <span className="text-xs font-bold text-slate-500 ml-0.5">p.a.</span>
                <Info className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0" aria-hidden />
              </div>
              <p className="text-[11px] font-medium text-slate-600 mb-6 border-t border-slate-200 pt-3">
                Info Item · Info Item · Info Item
              </p>
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-1.5 text-slate-600 text-[11px] font-semibold">
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
                  Fixed investment amount
                </div>
                <div className="inline-flex items-center gap-1.5 text-slate-600 text-[11px] font-semibold">
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
                  No source tax
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="max-w-6xl w-full rounded-xl bg-[#0d3540] border border-white/10 p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-white/90 tracking-wide"
            >
              Investment amount
            </label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amountFocused ? String(amount) : formatCurrencyInput(amount)}
                onFocus={() => setAmountFocused(true)}
                onBlur={() => {
                  setAmountFocused(false);
                  setAmount((a) => Math.max(0, Math.min(999999999, a)));
                }}
                onChange={(e) => {
                  const v = parseCurrencyInput(e.target.value);
                  setAmount(Math.max(0, Math.min(999999999, v)));
                }}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3540]"
                aria-describedby="amount-desc"
              />
            </div>
            <span id="amount-desc" className="sr-only">
              Enter amount in euros
            </span>
          </div>
          <div className="space-y-2 [&_svg]:text-white/70">
            <label
              htmlFor="years"
              className="block text-sm font-semibold text-white/90 tracking-wide"
            >
              Investment horizon
            </label>
            <Select
              id="years"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value, 10))}
              className="bg-white/10 border-white/20 text-white [&>option]:bg-[#0d3540] [&>option]:text-white"
              aria-describedby="years-desc"
            >
              {HORIZONS.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </Select>
            <span id="years-desc" className="sr-only">
              Select number of years
            </span>
          </div>
        </div>

        <div
          className="pt-6 sm:pt-8 border-t border-white/10"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 sm:mb-4">
            Total value
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 sm:mb-8">
            {formatter.format(A)}
          </p>
          <div className="inline-flex items-center bg-accent-teal/90 text-white px-4 sm:px-6 py-2.5 rounded-lg font-bold text-sm">
            Interest earned: + {formatter.format(interest)}
          </div>
        </div>
      </div>
    </div>
  );
}
