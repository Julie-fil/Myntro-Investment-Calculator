# Investment Calculator – Interactive Prototype

Next.js 14 (App Router) prototype of the investment calculator with product cards, amount/horizon inputs, and compound interest result.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Lucide React** (icons)
- **shadcn-style UI** (Card, Input, Select in `src/components/ui`)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app is mobile-first and works on all screen sizes.

## Features

- Select one of four product cards (Bank Alpha/Beta/Gamma/Delta) to set the interest rate.
- Adjust **Investment amount** (€) and **Investment horizon** (5–30 years).
- **Total value** and **Interest earned** update using compound interest: `A = P(1 + r)^t`.
- Active card is visually emphasized (scale, border, shadow) and keyboard-accessible.
