"use client";

import { useState, useCallback } from "react";
import { Lock, FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MIN_AMOUNT = 5000;
const BANK_NAME = "Myntro";

const PRODUCTS = [
  {
    id: "card-1",
    rate: 0.0245,
    rateLabel: "2.45",
    termYears: 1,
    badgeLabel: "Fixed Term",
    bank: BANK_NAME,
    title: "1-Year Fixed",
    subtitle: "Rate Guaranteed",
    tags: [
      { icon: Lock, text: "Locked for 1 Year" },
      { icon: FileText, text: "Annual Compounding" },
    ],
  },
  {
    id: "card-2",
    rate: 0.025,
    rateLabel: "2.50",
    termYears: 3,
    badgeLabel: "Fixed Term",
    bank: BANK_NAME,
    title: "3-Year Fixed",
    subtitle: "Rate Guaranteed",
    tags: [
      { icon: Lock, text: "Locked for 3 Years" },
      { icon: FileText, text: "Annual Compounding" },
    ],
  },
  {
    id: "card-3",
    rate: 0.026,
    rateLabel: "2.60",
    termYears: 4,
    badgeLabel: "Fixed Term",
    bank: BANK_NAME,
    title: "4-Year Fixed",
    subtitle: "Rate Guaranteed",
    tags: [
      { icon: Lock, text: "Locked for 4 Years" },
      { icon: FileText, text: "Annual Compounding" },
    ],
  },
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
  const [amount, setAmount] = useState(5000);

  const calculate = useCallback(() => {
    const P = amount;
    const r = selectedProduct.rate;
    const t = selectedProduct.termYears;
    return P * Math.pow(1 + r, t);
  }, [amount, selectedProduct]);

  const totalValue = calculate();
  const interestEarned = totalValue - amount;

  const termLabel =
    selectedProduct.termYears === 1
      ? "1 year"
      : `${selectedProduct.termYears} years`;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 sm:py-16 px-4 bg-[#F7F5F3]">
      <header className="max-w-6xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
          Investment Strategy Forecast
        </h1>
        <p className="text-base font-normal text-slate-600 max-w-2xl mx-auto">
          Fixed-term deposits with guaranteed rates. Interest compounded annually.
        </p>
      </header>

      <section
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
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
              "cursor-pointer border transition-colors duration-200",
              "border-slate-200 bg-white text-slate-900",
              selectedProduct.id === product.id && "border-2 border-[#3C6C7F]"
            )}
          >
            <CardContent className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-[100px] mb-4 inline-block bg-[#3C6C7F] text-[#FFFFFF]">
                {product.badgeLabel}
              </span>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <div className="h-12 min-w-[3rem] max-w-[4.5rem] px-1 bg-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-slate-400 text-[10px] text-center leading-tight">
                  {product.bank}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500">{product.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-3xl font-black text-[#3C6C7F]">
                  {product.rateLabel}%
                </span>
                <span className="text-sm font-bold text-slate-400">p.a.</span>
                <Info
                  className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0"
                  aria-hidden
                />
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Info Item · Info Item · Info Item
              </p>
              <div className="flex flex-col gap-[8px] border-t border-slate-200 pt-4">
                {product.tags.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex items-center gap-2 bg-[#F1F1F1] text-black text-[11px] font-medium px-4 py-2 rounded-full w-fit"
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0 text-black" aria-hidden />
                    {text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div
        className="max-w-6xl w-full bg-[#3E6A7E] rounded-xl p-8 sm:p-12 shadow-2xl"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="grid grid-cols-1 gap-6 mb-8 sm:mb-10">
          <div className="space-y-2 text-left">
            <label
              htmlFor="amount"
              className="text-sm font-bold text-white block"
            >
              Investment Amount (€)
            </label>
            <p className="text-xs text-white/80">
              Minimum {formatter.format(MIN_AMOUNT)} · Term is fixed by your
              selection ({termLabel})
            </p>
            <Input
              id="amount"
              type="number"
              min={MIN_AMOUNT}
              step={100}
              value={amount}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") return;
                const n = Number(raw);
                if (!Number.isNaN(n)) setAmount(n);
              }}
              onBlur={() => setAmount((a) => Math.max(MIN_AMOUNT, a))}
              className="bg-white text-slate-900 border-slate-200 rounded-lg py-4 px-4"
            />
          </div>
        </div>

        <div className="text-center pt-6 sm:pt-8 border-t border-white/20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFFFFF] bg-[#3C6C7F] rounded-[100px] inline-block px-4 py-1.5 mb-4">
            Guaranteed Value
          </p>
          <p className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">
            {formatter.format(totalValue)}
          </p>
          <div className="inline-flex items-center bg-white text-[#3E6A7E] px-8 py-3 rounded-full font-black text-sm shadow-xl">
            Interest earned: +{" "}
            <span className="ml-1">{formatter.format(interestEarned)}</span>
          </div>
        </div>
      </div>

      <p className="max-w-6xl w-full text-sm text-slate-600 text-center mt-8">
        Note: Fixed-term rates are guaranteed for the duration. Minimum
        investment {formatter.format(MIN_AMOUNT)}. Interest is compounded
        annually.
      </p>
    </div>
  );
}
