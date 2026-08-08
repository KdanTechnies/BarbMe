"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();
  const selectedRole = watch("role", "customer");

  const onRegister = async (data: any) => {
    setIsLoading(true);
    try {
      await api.post('/auth/register', data);
      router.push('/login?registered=true');
    } catch (err: any) {
      alert(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF4D1C] blur-[150px] opacity-10 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF4D1C] blur-[150px] opacity-10 rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-[#141414] border border-white/5 p-10 md:p-12 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter text-white mb-2">
            BARB<span className="text-[#FF4D1C]">ME.</span>
          </h1>
          <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em]">Create your elite account</p>
        </div>

        <form onSubmit={handleSubmit(onRegister)} className="space-y-5">
          {/* Role Selection UI */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {['customer', 'barber'].map((role) => (
              <label key={role} className="cursor-pointer">
                <input type="radio" {...register('role')} value={role} className="sr-only" defaultChecked={role === 'customer'} />
                <div className={`py-4 border text-center transition-all duration-300 font-black uppercase text-[10px] tracking-widest ${
                  selectedRole === role ? 'bg-[#FF4D1C] border-[#FF4D1C] text-white shadow-lg shadow-[#FF4D1C]/20' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/20'
                }`}>
                  {role === 'customer' ? 'Join as Client' : 'Join as Barber'}
                </div>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input {...register('full_name')} placeholder="FULL NAME" className="w-full bg-[#1A1A1A] border border-white/5 py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input {...register('email')} type="email" placeholder="EMAIL ADDRESS" className="w-full bg-[#1A1A1A] border border-white/5 py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input {...register('phone')} placeholder="PHONE NUMBER" className="w-full bg-[#1A1A1A] border border-white/5 py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" required />
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input {...register('nin')} placeholder="NIN (IDENTITY NO)" className="w-full bg-[#1A1A1A] border border-white/5 py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" required />
            </div>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input {...register('password')} type="password" placeholder="SECURE PASSWORD" className="w-full bg-[#1A1A1A] border border-white/5 py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" required />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#FF4D1C] py-5 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <>Complete Registration <ArrowRight size={16} /></>}
          </button>

          <p className="text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest pt-4">
            Already have an account? <Link href="/login" className="text-[#FF4D1C] hover:underline ml-2">Login here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}