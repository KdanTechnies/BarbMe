"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onLogin = async (data: any) => {
    setIsLoading(true);
    setError("");
    
    // FastAPI OAuth2 requires FormData (python-multipart)
    const formData = new FormData();
    formData.append('username', data.email);
    formData.append('password', data.password);

    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('bm_token', res.data.access_token);
      
      // Fetch user profile to check role
      const userRes = await api.get('/auth/me');
      const user = userRes.data;

      // Redirect based on role
      if (user.role === 'barber') router.push('/dashboard/barber');
      else router.push('/');
      
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-[#FF4D1C] blur-[120px] opacity-10 rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#141414] border border-white/5 p-10 md:p-12 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter text-white mb-2 text-center">
            BARB<span className="text-[#FF4D1C]">ME.</span>
          </h1>
          <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em]">Access your profile</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 mb-6 flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              {...register('email')} 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-[#1A1A1A] border border-white/5 py-5 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" 
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              {...register('password')} 
              type="password" 
              placeholder="PASSWORD" 
              className="w-full bg-[#1A1A1A] border border-white/5 py-5 pl-12 pr-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none transition-all placeholder:text-gray-700" 
              required 
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition">
              <input type="checkbox" className="accent-[#FF4D1C]" /> Remember Me
            </label>
            <a href="#" className="hover:text-[#FF4D1C] transition">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#FF4D1C] py-5 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <LogIn size={16} /></>}
          </button>

          <div className="pt-6 border-t border-white/5 mt-8">
            <p className="text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              Dont have an account?  <Link href="/register" className="text-[#FF4D1C] hover:underline ml-2">Join now</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}