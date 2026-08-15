"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Phone, ChevronRight, Scissors, Star } from 'lucide-react';
import Link from 'next/link';

// Brand SVGs
const FacebookIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function LandingPage() {
  const [nigeriaTime, setNigeriaTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [adIndex, setAdIndex] = useState(0);

  const ads = [
    "A Cut Above The Rest.",
    "Book an elite master in your city.",
    "Sophisticated Grooming, Delivered.",
    "Join the top 1% of Nigeria's hair professionals."
  ];

  // Manual Gallery for your preferred pictures
  const professionalGallery = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    "https://images.unsplash.com/photo-1621605815841-2dd60bb5882b",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
    "https://images.unsplash.com/photo-1532710093739-9470acff878f"
  ];

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      setNigeriaTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: "Africa/Lagos", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const adInt = setInterval(() => setAdIndex(p => (p + 1) % ads.length), 3000);
    return () => { clearInterval(interval); clearInterval(adInt); };
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-[#C5A27C] min-h-screen font-serif selection:bg-[#C5A27C] selection:text-black">
      
      {/* --- TOP BAR --- */}
      <header className="flex border-b border-[#C5A27C]/10 py-3 px-6 lg:px-12 justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] bg-black">
        <div className="flex gap-8">
          <span className="flex items-center gap-2 text-white">
            <Clock size={12} className="text-[#C5A27C]" /> Lagos: {isMounted ? nigeriaTime : "--:--"}
          </span>
          <span className="flex items-center gap-2"><MapPin size={12} /> Nigeria</span>
        </div>
        <div className="flex-1 text-center overflow-hidden h-4">
          <AnimatePresence mode="wait">
            <motion.p key={adIndex} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="italic text-[#C5A27C]">
              {ads[adIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="hidden md:flex gap-6 items-center text-white">
          <Phone size={12} className="text-[#C5A27C]" /> 800-BARB-ME
          <InstagramIcon size={12} />
        </div>
      </header>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[#C5A27C]/5 py-8 px-6 lg:px-12 flex justify-between items-center">
        <div className="text-3xl font-light tracking-[0.4em] uppercase text-white">
          BARB<span className="text-[#C5A27C] font-bold">ME</span>
        </div>
        <div className="hidden lg:flex gap-12 font-medium uppercase text-[10px] tracking-[0.4em] text-gray-400">
          <Link href="/about" className="hover:text-[#C5A27C] transition">The Concept</Link>
          <Link href="/marketplace" className="hover:text-[#C5A27C] transition">The Masters</Link>
          <Link href="/faq" className="hover:text-[#C5A27C] transition">Inquiries</Link>
        </div>
        <div className="flex gap-6">
          <Link href="/login" className="uppercase text-[10px] tracking-widest text-[#C5A27C] mt-2">Login</Link>
          <Link href="/register" className="bg-[#C5A27C] text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
            Join Now
          </Link>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1512690199101-8d8ebe4b2806?q=80&w=2070" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <motion.h4 initial={{opacity:0}} animate={{opacity:1}} className="uppercase tracking-[0.8em] text-[#C5A27C] mb-8 text-xs font-light">Established MMXXVI</motion.h4>
          <motion.h1 initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} className="text-6xl md:text-[120px] font-black leading-none uppercase text-white mb-10 italic">
            A Cut <br/> Above The Rest
          </motion.h1>
          <p className="text-gray-400 text-lg uppercase tracking-widest font-light mb-12 max-w-2xl mx-auto">
            Our world-class marketplace offers the perfect blend of old-world charm and modern convenience.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link href="/marketplace" className="border border-[#C5A27C] px-12 py-5 uppercase text-xs tracking-[0.3em] text-[#C5A27C] hover:bg-[#C5A27C] hover:text-black transition-all">
              Request Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* --- MANUAL PICTURE GALLERY --- */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
          {professionalGallery.map((url, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group">
              <img src={url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* --- THE SIGNATURE QUOTE --- */}
      <section className="py-40 bg-black text-center border-y border-[#C5A27C]/5">
        <div className="max-w-4xl mx-auto px-6">
           <Star className="mx-auto text-[#C5A27C] mb-10" fill="#C5A27C" size={24}/>
           <h2 className="text-3xl md:text-5xl italic font-light text-white leading-relaxed">
             "I love coming here and getting the full treatment. There's nothing like a sharp fade and a seamless booking."
           </h2>
           <p className="mt-10 uppercase tracking-[0.5em] text-[#C5A27C] text-sm">Alex Markov — Elite Client</p>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 text-center bg-[#050505]">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-12">Experience Perfection</h2>
        <Link href="/register" className="bg-[#C5A27C] text-black px-16 py-6 uppercase text-sm font-bold tracking-[0.4em] hover:bg-white transition-all">
          Create Account
        </Link>
      </section>

      <footer className="py-20 px-6 border-t border-[#C5A27C]/10 text-center bg-black">
        <div className="text-5xl font-light tracking-[0.6em] uppercase text-white mb-12">BARBME</div>
        <p className="text-[#C5A27C]/40 text-[10px] tracking-[0.5em] uppercase">© 2026 THE ELITE GROOMING NETWORK. PRIVACY IS PARAMOUNT.</p>
      </footer>
    </div>
  );
}