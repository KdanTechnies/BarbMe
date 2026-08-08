"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Scissors, Clock, 
  ArrowLeft, CreditCard, Loader2, AlertCircle 
} from 'lucide-react';
import { api } from '@/lib/api';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // State for Real Data
  const [barber, setBarber] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form State (Real User Input)
  const [formData, setFormData] = useState({
    service_type: "",
    scheduled_time: "",
    location_address: "",
    price: 5000, // You can make this dynamic based on service_type
    lat: 6.4474,  // Default Lagos
    lng: 3.4715
  });

  // 1. Fetch real Barber details on load
  useEffect(() => {
    const fetchBarber = async () => {
      try {
        const res = await api.get(`/barbers/${id}`);
        setBarber(res.data);
      } catch (err) {
        setError("Could not find barber details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBarber();
    
    // Auto-get user's current lat/lng for the booking
    navigator.geolocation.getCurrentPosition((pos) => {
      setFormData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
    });
  }, [id]);

  // 2. The Logic: Create Booking -> Initiate Paystack
  const handleBookingAndPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Step A: Create the booking in your PostgreSQL via the backend
      const bookingRes = await api.post('/bookings/', {
        barber_id: id,
        service_type: formData.service_type,
        price: formData.price,
        scheduled_time: new Date(formData.scheduled_time).toISOString(),
        location_address: formData.location_address,
        lat: formData.lat,
        lng: formData.lng
      });

      const bookingId = bookingRes.data.id;

      // Step B: Call your payment initiate endpoint
      const payRes = await api.post(`/payments/initiate?booking_id=${bookingId}`);

      // Step C: Redirect to real Paystack checkout
      if (payRes.data?.data?.authorization_url) {
        window.location.href = payRes.data.data.authorization_url;
      } else {
        throw new Error("Payment gateway unreachable");
      }

    } catch (err: any) {
      setError(err.response?.data?.detail || "Booking failed. Ensure you are logged in.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#FF4D1C]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-[#FF4D1C] transition mb-8 uppercase text-[10px] font-black tracking-[0.2em]">
          <ArrowLeft size={16} /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Booking Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Book Appointment</h1>
            <p className="text-[#FF4D1C] font-bold text-xs uppercase tracking-[0.3em] mb-10">With {barber?.full_name || "Professional Barber"}</p>

            <form onSubmit={handleBookingAndPayment} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Select Service</label>
                <div className="relative">
                  <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <select 
                    required
                    className="w-full bg-[#141414] border border-white/5 py-4 pl-12 pr-4 text-xs font-bold focus:border-[#FF4D1C] outline-none appearance-none"
                    onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                  >
                    <option value="">Choose a service...</option>
                    <option value="Classic Haircut">Classic Haircut</option>
                    <option value="Skin Fade & Beard">Skin Fade & Beard Trim</option>
                    <option value="Home Service Special">Full Grooming (Home Service)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Date & Time</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="datetime-local" 
                    required
                    className="w-full bg-[#141414] border border-white/5 py-4 pl-12 pr-4 text-xs font-bold focus:border-[#FF4D1C] outline-none"
                    onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your Location Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="text" 
                    placeholder="E.G. 12 ADMIRALTY WAY, LEKKI"
                    required
                    className="w-full bg-[#141414] border border-white/5 py-4 pl-12 pr-4 text-xs font-bold focus:border-[#FF4D1C] outline-none uppercase placeholder:text-gray-800"
                    onChange={(e) => setFormData({...formData, location_address: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase bg-red-500/10 p-4 border border-red-500/20">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#FF4D1C] py-5 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin" /> : <>Confirm & Pay ₦{formData.price.toLocaleString()} <CreditCard size={16}/></>}
              </button>
            </form>
          </motion.div>

          {/* Right Side: Info / Summary */}
          <div className="lg:pl-12 border-l border-white/5 hidden lg:block">
            <div className="sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Booking Policy</h2>
              <ul className="space-y-6 text-gray-500 text-[11px] font-bold uppercase tracking-wider leading-relaxed">
                <li className="flex gap-4"><Clock className="text-[#FF4D1C] shrink-0" size={18} /> Arrive 5 minutes before your scheduled time for home services.</li>
                <li className="flex gap-4"><MapPin className="text-[#FF4D1C] shrink-0" size={18} /> Ensure the provided address is accurate and reachable.</li>
                <li className="flex gap-4"><CreditCard className="text-[#FF4D1C] shrink-0" size={18} /> Secure payments are handled via Paystack. Refunds are subject to cancellation terms.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}