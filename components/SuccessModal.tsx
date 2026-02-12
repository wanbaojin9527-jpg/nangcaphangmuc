
import React, { useEffect, useState } from 'react';
import { PartyPopper, Check, X } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface Props {
  customerName: string;
  limitAmount: string;
  onClose: () => void;
}

const SuccessModal: React.FC<Props> = ({ customerName, limitAmount, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[40px] p-10 md:p-14 shadow-2xl max-w-lg w-full text-center transform transition-all duration-500 scale-100 animate-in fade-in zoom-in">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-slate-300 hover:text-slate-600 transition-colors"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        {/* Gold Check Circle */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-[#d4af37] rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(212,175,55,0.4)]">
            <Check size={48} strokeWidth={3} />
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl font-bold text-[#1a365d] mb-6 contract-header leading-tight tracking-tight px-4 uppercase">
          {APP_CONFIG.success.title}
        </h2>
        
        {/* Description Text */}
        <div className="space-y-4 mb-10 px-2 text-center">
          <p className="text-slate-500 text-lg leading-relaxed">
            {APP_CONFIG.success.greeting} <span className="font-bold text-[#1a365d]">{customerName}</span>,
          </p>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm mx-auto">
            {APP_CONFIG.success.message}
          </p>
          
          {/* Amount Display */}
          <div className="bg-[#fefce8] border-2 border-[#d4af37] py-6 px-4 rounded-[20px] shadow-sm mt-6">
            <p className="text-[#1a365d] text-3xl font-bold tracking-widest flex items-center justify-center gap-3">
              {limitAmount} <span className="text-xs font-bold tracking-widest uppercase opacity-70">VNĐ</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4">
          <button 
            onClick={onClose}
            className="w-full bg-[#1a365d] hover:bg-[#234575] text-white font-bold py-5 rounded-2xl shadow-[0_10px_40px_rgba(26,54,93,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-wide"
          >
            <PartyPopper size={24} /> {APP_CONFIG.success.buttonLabel}
          </button>
        </div>

        {/* Pagination Dots at bottom */}
        <div className="mt-10 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 2 ? 'bg-[#d4af37] w-10' : 'bg-slate-100 w-8'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
