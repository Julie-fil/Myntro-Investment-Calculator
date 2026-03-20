"use client";

import { useState, useCallback } from "react";
import { Lock, FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MIN_AMOUNT = 5000;
const NAVY = "#162033";
const BEIGE_PANEL = "#ebe6de";
const YELLOW_ACCENT = "#f4e4a6";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function formatCurrencyInput(value: number) {
  return formatter.format(value);
}

function parseCurrencyInput(s: string): number {
  const cleaned = s.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

/** Stacked “zen stones” on dark navy square — matches Myntro tile icon */
function ZenStoneIcon() {
  return (
    <div
      className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
      style={{ backgroundColor: NAVY }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none">
        <ellipse cx="20" cy="28" rx="12" ry="4" fill="white" opacity={0.95} />
        <ellipse cx="20" cy="20" rx="10" ry="3.5" fill="white" opacity={0.95} />
        <ellipse cx="20" cy="13" rx="7" ry="3" fill="white" opacity={0.95} />
      </svg>
    </div>
  );
}

const PRODUCTS = [
  {
    id: "card-1",
    rate: 0.0245,
    rateLabel: "2.45",
    termYears: 1,
    descriptionLine: "12-Month fixed · Rate guaranteed",
    tags: [{ icon: Lock, text: "Locked for 12 months" }],
  },
  {
    id: "card-2",
    rate: 0.025,
    rateLabel: "2.50",
    termYears: 3,
    descriptionLine: "3-Year special · Solid growth.",
    tags: [
      { icon: Lock, text: "Locked for 3 years" },
      { icon: FileText, text: "Compounded annually" },
    ],
  },
  {
    id: "card-3",
    rate: 0.026,
    rateLabel: "2.60",
    termYears: 4,
    descriptionLine: "4-Year special · Max growth.",
    tags: [
      { icon: Lock, text: "Locked for 4 years" },
      { icon: FileText, text: "Compounded annually" },
    ],
  },
] as const;

export default function InvestmentCalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[number]
  >(PRODUCTS[1]);
  const [amount, setAmount] = useState(50000);
  const [amountFocused, setAmountFocused] = useState(false);

  const calculate = useCallback(() => {
    const P = amount;
    const r = selectedProduct.rate;
    const t = selectedProduct.termYears;
    return P * Math.pow(1 + r, t);
  }, [amount, selectedProduct]);

  const totalValue = calculate();
  const interestEarned = totalValue - amount;

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14" style={{ backgroundColor: "#f5f2ed" }}>
      <div
        className="mx-auto w-full max-w-5xl rounded-[28px] p-6 shadow-sm sm:p-10 md:p-12"
        style={{ backgroundColor: BEIGE_PANEL }}
      >
        <header className="mb-10 text-center sm:mb-12">
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#162033] sm:text-4xl md:text-[2.5rem]">
            Discover our core investment options
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
            Tailor your investment to your goals. View your estimated earnings
            instantly.
          </p>
        </header>

        <section
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6"
          aria-label="Investment products"
        >
          {PRODUCTS.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              role="button"
              tabIndex={0}
              aria-pressed={selectedProduct.id === product.id}
              aria-label={`Select ${product.descriptionLine}, ${product.rateLabel}% p.a.`}
              onClick={() => setSelectedProduct(product)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProduct(product);
                }
              }}
              className={cn(
                "cursor-pointer border bg-white transition-colors duration-200",
                "rounded-2xl border-slate-200/80 shadow-sm",
                selectedProduct.id === product.id && "border-2",
              )}
              style={
                selectedProduct.id === product.id
                  ? { borderColor: NAVY }
                  : undefined
              }
            >
              <CardContent className="p-6">
                <ZenStoneIcon />
                <div className="mb-3 flex flex-wrap items-baseline gap-x-1 gap-y-1">
                  <span
                    className="text-3xl font-bold tabular-nums tracking-tight sm:text-[2rem]"
                    style={{ color: NAVY }}
                  >
                    {product.rateLabel}
                  </span>
                  <span className="text-lg font-semibold text-slate-400">%</span>
                  <span className="text-sm font-semibold text-slate-400">
                    p.a.
                  </span>
                  <Info
                    className="ml-auto h-4 w-4 shrink-0 text-slate-400"
                    aria-hidden
                  />
                </div>
                <p className="mb-6 text-sm text-slate-500">
                  {product.descriptionLine}
                </p>
                <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-4">
                  {product.tags.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e8e8e8] px-4 py-2 text-[11px] font-medium text-[#162033]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div
          className="mx-auto max-w-2xl"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <label
            htmlFor="amount"
            className="mb-3 block text-center text-sm font-semibold text-[#162033]"
          >
            Your investment amount
          </label>
          <Input
            id="amount"
            type="text"
            inputMode="decimal"
            value={
              amountFocused
                ? String(amount)
                : formatCurrencyInput(amount)
            }
            onFocus={() => setAmountFocused(true)}
            onBlur={() => {
              setAmountFocused(false);
              setAmount((a) => Math.max(MIN_AMOUNT, a));
            }}
            onChange={(e) => {
              const v = parseCurrencyInput(e.target.value);
              if (e.target.value === "") return;
              setAmount(Math.max(0, v));
            }}
            className="border-slate-300/80 bg-white py-4 text-center text-lg font-semibold text-[#162033] shadow-none"
            style={{ color: NAVY }}
          />
          <p className="mt-2 text-center text-xs text-slate-500">
            Minimum {formatter.format(MIN_AMOUNT)}
          </p>

          <div className="my-8 border-t border-slate-300/60" />

          <p className="mb-2 text-center text-sm font-semibold text-[#162033]">
            Your guaranteed value
          </p>
          <p
            className="mb-6 text-center text-4xl font-bold tabular-nums tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: NAVY }}
          >
            {formatter.format(totalValue)}
          </p>

          <div className="mb-10 flex justify-center">
            <div
              className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-[#162033] shadow-sm"
              style={{ backgroundColor: YELLOW_ACCENT }}
            >
              Interest earned: + {formatter.format(interestEarned)}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="w-full max-w-md rounded-full px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: NAVY }}
            >
              Proceed with this offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
