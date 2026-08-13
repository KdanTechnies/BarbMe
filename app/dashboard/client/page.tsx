"use client";
import { useAuth } from '@/context/AuthContext';

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">My <span className="text-[#FF4D1C]">Grooming</span></h1>
        <div className="border border-dashed border-white/10 p-20 text-center rounded-xl">
           <p className="text-gray-500 uppercase font-black tracking-widest text-xs">No active appointments. Time for a fresh cut?</p>
           <button onClick={() => window.location.href='/'} className="mt-8 bg-[#FF4D1C] px-8 py-3 font-black text-[10px] uppercase tracking-widest">Browse Barbers</button>
        </div>
      </div>
    </div>
  );
}