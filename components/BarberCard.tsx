import { Globe, MessageSquare, Camera, Star } from 'lucide-react'; // Changed here
import { motion } from 'framer-motion';

export default function BarberCard({ barber }: { barber: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="group bg-[#141414] border border-white/5 transition-all duration-500"
    >
      <div className="relative h-[320px] overflow-hidden">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${barber.full_name || 'barber'}`} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
          alt={barber.full_name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Updated Social Overlay with valid icons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
          <div className="bg-white p-2 text-black hover:bg-[#FF4D1C] hover:text-white transition cursor-pointer">
            <Globe size={16} />
          </div>
          <div className="bg-white p-2 text-black hover:bg-[#FF4D1C] hover:text-white transition cursor-pointer">
            <MessageSquare size={16} />
          </div>
          <div className="bg-white p-2 text-black hover:bg-[#FF4D1C] hover:text-white transition cursor-pointer">
            <Camera size={16} />
          </div>
        </div>
      </div>

      <div className="p-8 text-center">
        <div className="flex justify-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-[#FF4D1C] text-[#FF4D1C]" />)}
        </div>
        <h4 className="text-[#FF4D1C] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Professional</h4>
        <h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#FF4D1C] transition-colors">
          {barber.full_name || "Senior Barber"}
        </h3>
        <p className="text-gray-500 text-xs font-bold leading-5 uppercase tracking-widest mb-6">
          {barber.bio?.substring(0, 40) || "Expert grooming services"}...
        </p>
        <button 
          onClick={() => window.location.href = `/book/${barber.id}`}
          className="border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FF4D1C] hover:border-[#FF4D1C] transition-all"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
}