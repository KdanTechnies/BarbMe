"use client";
import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);
  const items = [
    { q: "HOW DOES PAYMENT WORK?", a: "Payments are held in escrow via Paystack and released only when the barber completes the cut." },
    { q: "WHAT IF THE BARBER IS A NO-SHOW?", a: "We operate a strict refund policy. If the barber does not arrive, a full refund is issued instantly." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#C5A27C] p-12">
      <Link href="/" className="flex items-center gap-2 mb-20 text-xs tracking-widest uppercase"><ArrowLeft size={16}/> Back</Link>
      <h1 className="text-6xl font-black uppercase mb-20 tracking-tighter">Inquiries</h1>
      <div className="max-w-3xl space-y-8">
        {items.map((it, i) => (
          <div key={i} className="border-b border-[#C5A27C]/20 pb-8">
            <button onClick={() => setActive(active === i ? null : i)} className="w-full flex justify-between text-left text-xl font-bold uppercase tracking-widest">
              {it.q} <ChevronDown className={active === i ? 'rotate-180' : ''}/>
            </button>
            {active === i && <p className="mt-6 text-gray-500 italic leading-relaxed">{it.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}