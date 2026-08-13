"use client";
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Scissors, DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function BarberDashboard() {
  const [bookings, setBookings] = useState([]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">Barber <span className="text-[#FF4D1C]">Console</span></h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111] p-8 border border-white/5">
             <DollarSign className="text-[#FF4D1C] mb-4" />
             <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total Earnings</p>
             <h2 className="text-3xl font-black italic">₦145,000</h2>
          </div>
          <div className="bg-[#111] p-8 border border-white/5">
             <Calendar className="text-[#FF4D1C] mb-4" />
             <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">New Requests</p>
             <h2 className="text-3xl font-black italic">8</h2>
          </div>
        </div>

        {/* Incoming Requests */}
        <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-6 text-[#FF4D1C]">Active Appointments</h3>
        <div className="space-y-4">
          <div className="bg-[#111] p-6 border border-white/5 flex flex-col md:flex-row justify-between items-center group hover:border-[#FF4D1C]/50 transition-all">
            <div className="flex gap-6 items-center">
               <div className="w-12 h-12 bg-gray-800 rounded-full" />
               <div>
                  <h4 className="font-black uppercase tracking-tighter">Florence Bieber</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Skin Fade • Today, 2:00 PM</p>
               </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
               <button className="px-6 py-2 text-[10px] font-black bg-white text-black uppercase tracking-widest">Accept</button>
               <button className="px-6 py-2 text-[10px] font-black border border-white/10 text-gray-500 uppercase tracking-widest">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}