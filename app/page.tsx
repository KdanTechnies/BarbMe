"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Scissors, Star, Clock, Phone, 
  ChevronRight, ChevronDown, ShieldCheck, Zap, 
  UserCheck, PlayCircle, Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import BarberCard from '@/components/BarberCard';

// Professional Brand SVGs
const FacebookIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function LandingPage() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [nigeriaTime, setNigeriaTime] = useState("");
  const [isMounted, setIsMounted] = useState(false); // Hydration fix
  
  // Marketing Ads State
  const [adIndex, setAdIndex] = useState(0);
  const ads = [
    "Have you barb today or have you shaved?",
    "Book a top-tier barber now in your location.",
    "Look sharp, feel confident—Experience the fade.",
    "Premium grooming delivered to your doorstep.",
    "Your next fresh cut is just a click away.",
    "Join Nigeria's elite network of hair professionals."
  ];

  const marketplaceRef = useRef<HTMLDivElement>(null);

  // 1. Hydration & Real-Time Clock
  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      };
      setNigeriaTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Marketing Ads Timer
  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 2000);
    return () => clearInterval(adInterval);
  }, [ads.length]);

  // 3. Fetch Barbers
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await api.get(`/barbers/nearby?lat=${latitude}&lng=${longitude}`);
        setBarbers(res.data);
      } catch (err) {
        console.error("Backend unreachable", err);
      } finally {
        setLoading(false);
      }
    }, () => setLoading(false));
  }, []);

  // 4. Search Filtering
  const filteredBarbers = useMemo(() => {
    return barbers.filter((barber: any) => 
      barber.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      barber.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, barbers]);

  const scrollToMarketplace = () => {
    marketplaceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    { q: "How do I pay the barber?", a: "All payments are processed securely through Paystack on our platform." },
    { q: "Can I cancel a booking?", a: "Yes, you can cancel up to 2 hours before the scheduled time." },
    { q: "Do barbers come to my house?", a: "Yes! Our elite barbers offer dedicated Home Services." },
    { q: "How are barbers verified?", a: "Every barber must provide a valid NIN and pass a skill assessment." }
  ];

  const testimonials = [
    { id: 1, name: "Tunde Kelvin", video: "/test1.mp4" },
    { id: 2, name: "Sarah John", video: "/test2.mp4" },
    { id: 3, name: "Emeka Obi", video: "/test3.mp4" },
    { id: 4, name: "David Adeleke", video: "/test4.mp4" },
    { id: 5, name: "Blessing Egbe", video: "/test5.mp4" },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans selection:bg-[#FF4D1C]">
      
      {/* --- TOP INFO BAR --- */}
      <div className="flex border-b border-white/5 py-3 px-6 lg:px-12 justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-[#0F0F0F]">
        <div className="hidden lg:flex gap-8">
          <span className="flex items-center gap-2">
            <Clock size={12} className="text-[#FF4D1C]" /> 
            Lagos: <span className="text-white w-20">{isMounted ? nigeriaTime : "--:--:--"}</span>
          </span>
          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#FF4D1C]" /> Nigeria</span>
        </div>

        {/* Marketing Ad Section */}
        <div className="flex-1 text-center px-4 overflow-hidden relative h-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={adIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-[#FF4D1C] truncate font-black tracking-widest text-[9px] md:text-[10px]"
            >
              {ads[adIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Phone size={12} className="text-[#FF4D1C]" /> (+234) 800-BARB-ME
          <div className="flex gap-4 ml-4 border-l border-white/10 pl-4">
            <FacebookIcon size={12} /> <TwitterIcon size={12} /> <InstagramIcon size={12} />
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 py-6 px-6 lg:px-12 flex justify-between items-center">
        <div className="text-3xl font-black italic tracking-tighter cursor-pointer">
          BARB<span className="text-[#FF4D1C]">ME.</span>
        </div>
        <div className="hidden md:flex gap-10 font-bold uppercase text-[11px] tracking-[0.3em]">
          <button onClick={scrollToMarketplace} className="hover:text-[#FF4D1C] transition uppercase">Marketplace</button>
          <a href="#why-us" className="hover:text-[#FF4D1C] transition">Why Us</a>
          <a href="#testimonials" className="hover:text-[#FF4D1C] transition">Reviews</a>
          <a href="#faq" className="hover:text-[#FF4D1C] transition">FAQ</a>
        </div>
        <button onClick={() => window.location.href='/register'} className="bg-[#FF4D1C] px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Join Elite
        </button>
      </nav>

      {/* --- HERO --- */}
      <section className="relative h-[90vh] flex items-center px-6 lg:px-12">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074" className="w-full h-full object-cover opacity-20 grayscale" alt="Barber" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h4 className="text-[#FF4D1C] font-black uppercase tracking-[0.5em] mb-6 text-xs">Certified Grooming Experts</h4>
          <h1 className="text-6xl md:text-[100px] font-black leading-[0.85] uppercase italic mb-8">
            Experience <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>Perfection</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10 font-medium tracking-wide">Connecting Nigeria's elite with top-tier hair professionals.</p>
          <button 
            onClick={scrollToMarketplace}
            className="bg-[#FF4D1C] px-12 py-6 font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-transform"
          >
            Book Your Session <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* --- MARKETPLACE --- */}
      <section ref={marketplaceRef} id="barbers" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h4 className="text-[#FF4D1C] font-black uppercase tracking-[0.4em] mb-4 text-[10px]">Marketplace</h4>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Nearby Masters</h2>
          </div>
          <div className="w-full md:w-96 bg-[#111] p-1 border border-white/10 flex items-center px-4">
             <Search size={18} className="text-[#FF4D1C]" />
             <input 
                placeholder="SEARCH NAME OR SKILL..." 
                className="bg-transparent w-full py-4 px-3 text-[10px] font-black uppercase focus:outline-none" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => <div key={i} className="h-[400px] bg-white/5 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBarbers.map((b: any) => <BarberCard key={b.id} barber={b} />)}
          </div>
        )}
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 bg-[#0F0F0F] overflow-hidden">
        <div className="px-6 lg:px-12 mb-12 text-center">
          <h4 className="text-[#FF4D1C] font-black uppercase tracking-[0.4em] mb-4 text-[10px]">Testimonials</h4>
          <h2 className="text-5xl font-black uppercase tracking-tighter italic">Client Speak</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 lg:px-12 no-scrollbar pb-10">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-[350px] snap-center">
              <div className="relative aspect-[9/16] bg-[#1A1A1A] border border-white/5 overflow-hidden">
                 <video className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" muted loop playsInline>
                    <source src={t.video} type="video/mp4" />
                 </video>
                 <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF4D1C] mb-2">Verified Client</p>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{t.name}</h4>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 px-6 lg:px-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-center uppercase mb-12 tracking-tighter">Common Inquiries</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 bg-[#111]">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-xs font-black uppercase tracking-widest">{faq.q}</span>
                <ChevronDown className={`text-[#FF4D1C] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} size={16} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-500 text-[11px] font-bold uppercase italic border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-20 px-6 border-t border-white/5 text-center">
        <div className="text-5xl font-black italic tracking-tighter mb-12">BARB<span className="text-[#FF4D1C]">ME.</span></div>
        <p className="text-gray-800 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 BARBME ELITE TECHNOLOGY.</p>
      </footer>
    </div>
  );
}