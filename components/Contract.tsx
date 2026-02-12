
import React, { useState, useRef } from 'react';
import { Shield, Gift, ArrowUp, PenTool, RotateCcw, FileCheck, Upload, Trash2 } from 'lucide-react';
import { ContractData, APP_CONFIG } from '../config';

interface Props {
  data: ContractData;
  signature: string | null;
  onSign: (signature: string) => void;
  onUpdateData: (data: Partial<ContractData>) => void;
}

const Contract: React.FC<Props> = ({ data, signature, onSign, onUpdateData }) => {
  const [isSigning, setIsSigning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1a365d';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      onSign(dataUrl);
      setIsSigning(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateData({ balanceImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (field: keyof ContractData, value: string) => {
    onUpdateData({ [field]: value });
  };

  const getBenefitIcon = (index: number) => {
    const icons = [<Shield className="w-6 h-6 mx-auto mb-2 text-[#d4af37]" />, <Gift className="w-6 h-6 mx-auto mb-2 text-[#d4af37]" />, <ArrowUp className="w-6 h-6 mx-auto mb-2 text-[#d4af37]" />];
    return icons[index] || icons[0];
  };

  return (
    <div className="relative w-[210mm] min-h-[297mm] bg-white p-[25mm] text-[#1a365d] overflow-hidden select-none">
      {/* Decorative Border */}
      <div className="absolute inset-4 border-[1px] border-[#d4af37] opacity-40 pointer-events-none"></div>
      <div className="absolute inset-5 border-[2px] border-[#d4af37] opacity-60 pointer-events-none"></div>

      {/* Watermark */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none rotate-12`} style={{ opacity: APP_CONFIG.assets.watermarkOpacity }}>
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 20C40 20 32 28 32 38C32 45 35 50 40 53V65C40 68 42 70 45 70H55C58 70 60 68 60 65V53C65 50 68 45 68 38C68 28 60 20 50 20ZM50 35C48 35 47 34 47 32C47 30 48 29 50 29C52 29 53 30 53 32C53 34 52 35 50 35Z" />
          <path d="M50 75C40 75 30 80 25 85C23 87 25 90 28 90H72C75 90 77 87 75 85C70 80 60 75 50 75Z" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start mb-12">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3 mb-1">
            <img 
              src={APP_CONFIG.assets.logoUrl} 
              alt="Brand Logo" 
              className="h-14 w-auto object-contain"
            />
            <div className="h-10 w-[1px] bg-slate-200"></div>
            <span className="text-xl font-bold tracking-tight contract-header text-[#1a365d] uppercase">
              {data.brandName}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold mt-1">
            {APP_CONFIG.assets.subTitle}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[#d4af37] tracking-widest uppercase">Mã hợp đồng</p>
          <p className="text-sm font-mono font-bold text-[#1a365d]">{data.contractId}</p>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="contract-header text-4xl font-bold uppercase tracking-widest text-[#1a365d] mb-2">
          {APP_CONFIG.headings.mainTitle}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-[#d4af37]"></div>
          <span className="text-[#d4af37] font-semibold italic text-sm">{APP_CONFIG.assets.programName}</span>
          <div className="h-[1px] w-12 bg-[#d4af37]"></div>
        </div>
      </div>

      {/* Parties Info */}
      <div className="grid grid-cols-2 gap-8 mb-8 relative z-10 bg-slate-50/50 p-6 border-l-4 border-[#d4af37]">
        <div className="text-left">
          <h3 className="text-[10px] uppercase font-bold text-[#d4af37] mb-2 tracking-widest">{APP_CONFIG.headings.partyA}</h3>
          <p className="font-bold text-lg">{data.brandName}</p>
          <p className="text-xs text-slate-500">Mã số thuế: 0312345678</p>
        </div>
        <div className="text-left">
          <h3 className="text-[10px] uppercase font-bold text-[#d4af37] mb-2 tracking-widest">{APP_CONFIG.headings.partyB}</h3>
          <input 
            type="text" 
            value={data.customerName}
            onChange={(e) => handleTextChange('customerName', e.target.value)}
            className="w-full font-bold text-lg text-[#1a365d] uppercase bg-transparent border-none focus:outline-none focus:bg-[#d4af37]/5 rounded px-1 -ml-1 transition-colors"
          />
          <p className="text-xs text-slate-500">Mã định danh khách hàng: CC-USR-999</p>
        </div>
      </div>

      {/* Body Content */}
      <div className="space-y-5 relative z-10 text-justify text-sm leading-relaxed">
        <section>
          <h2 className="font-bold uppercase text-[#1a365d] mb-2 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="text-[#d4af37]">01.</span> {APP_CONFIG.sections.section1.title}
          </h2>
          <p>{APP_CONFIG.sections.section1.content}</p>
        </section>

        <section>
          <h2 className="font-bold uppercase text-[#1a365d] mb-2 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="text-[#d4af37]">02.</span> {APP_CONFIG.sections.section2.title}
          </h2>
          <div className="font-semibold text-[#1a365d] mb-2 italic flex items-center gap-1 flex-wrap">
            "{APP_CONFIG.sections.section2.preContent}
            <input 
              type="text" 
              value={data.limitAmount}
              onChange={(e) => handleTextChange('limitAmount', e.target.value)}
              className="inline-block w-40 font-bold bg-transparent border-none focus:outline-none focus:bg-[#d4af37]/5 rounded transition-colors text-center no-print"
            />
            <span className="hidden print:inline">{data.limitAmount}</span>
            {APP_CONFIG.sections.section2.postContent}"
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {APP_CONFIG.sections.section2.items.map((item, idx) => (
              <li key={idx} className={`text-[#3b82f6] ${idx === 1 ? "font-bold" : "font-medium"}`}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-bold uppercase text-[#1a365d] mb-3 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="text-[#d4af37]">03.</span> {APP_CONFIG.sections.section3.title}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {APP_CONFIG.sections.section3.benefits.map((benefit, idx) => (
              <div key={idx} className="p-3 border border-slate-100 rounded-lg text-center bg-white shadow-sm">
                {getBenefitIcon(idx)}
                <p className="text-[10px] font-bold uppercase mb-1">{benefit.title}</p>
                <p className="text-[9px] text-slate-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Area */}
        <section className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-6 group relative">
          <div className="flex-shrink-0 text-center">
            <FileCheck className="w-8 h-8 text-[#d4af37] mx-auto mb-1" />
            <p className="text-[8px] font-bold uppercase text-slate-400">{APP_CONFIG.labels.verificationTitle}</p>
          </div>
          
          <div className="flex-1 min-h-[80px] flex flex-col justify-center">
            {!data.balanceImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-300 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-white hover:border-[#d4af37] transition-all no-print"
              >
                <Upload size={20} className="text-slate-400 mb-1" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{APP_CONFIG.labels.uploadBtn}</span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            ) : (
              <div className="relative inline-block text-left">
                <p className="text-[10px] text-slate-500 italic mb-2 text-left">{APP_CONFIG.labels.verificationSub}</p>
                <img src={data.balanceImage} alt="Proof" className="h-20 w-auto rounded border border-white shadow-sm mix-blend-multiply" />
                <button 
                  onClick={() => onUpdateData({ balanceImage: null })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity no-print"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
            {!data.balanceImage && <p className="print:block hidden italic text-red-500 font-bold">{APP_CONFIG.labels.missingImagePrint}</p>}
          </div>

          <div className="text-right flex-shrink-0">
             <div className={`inline-block p-1 border-2 rounded transform -rotate-12 transition-colors ${data.balanceImage ? 'border-[#d4af37] text-[#d4af37] opacity-80' : 'border-slate-300 text-slate-300 opacity-40'}`}>
                <p className="text-[8px] font-black uppercase tracking-tighter">{data.balanceImage ? APP_CONFIG.headings.verifiedStamp : APP_CONFIG.headings.awaitingStamp}</p>
             </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold uppercase text-[#1a365d] mb-2 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="text-[#d4af37]">04.</span> {APP_CONFIG.sections.section4.title}
          </h2>
          <p>{APP_CONFIG.sections.section4.content}</p>
        </section>

        <section>
          <h2 className="font-bold uppercase text-[#1a365d] mb-2 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="text-[#d4af37]">05.</span> {APP_CONFIG.sections.section5.title}
          </h2>
          <p>{APP_CONFIG.sections.section5.content}</p>
        </section>
      </div>

      {/* Signature Area */}
      <div className="mt-12 grid grid-cols-2 gap-10 relative z-10">
        <div className="text-center relative">
          <p className="font-bold text-sm uppercase mb-20 text-[#1a365d]">{APP_CONFIG.headings.representativeA}</p>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-90">
             <img 
              src={APP_CONFIG.assets.stampUrl} 
              alt="Company Stamp" 
              className="w-40 h-auto mix-blend-multiply transform rotate-6"
            />
          </div>

          <div className="w-32 h-[1px] bg-slate-300 mx-auto mb-2"></div>
          <p className="text-[10px] uppercase font-bold text-[#d4af37]">{APP_CONFIG.headings.sealSignedText}</p>
        </div>

        <div className="text-center relative">
          <p className="font-bold text-sm uppercase mb-4 text-[#1a365d]">{APP_CONFIG.headings.representativeB}</p>
          
          <div className="h-28 flex items-center justify-center mb-2 relative">
            {signature ? (
              <img src={signature} alt="Signature" className="max-h-full max-w-full mix-blend-multiply" />
            ) : (
              <button 
                onClick={() => setIsSigning(true)}
                className="no-print group flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#d4af37] rounded-lg hover:bg-[#d4af37]/5 transition-colors cursor-pointer"
              >
                <PenTool className="w-6 h-6 text-[#d4af37] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase text-[#d4af37]">
                  {APP_CONFIG.labels.signHereBtn}
                </span>
              </button>
            )}
          </div>

          <div className="w-32 h-[1px] bg-slate-300 mx-auto mb-2"></div>
          <p className="font-bold text-sm uppercase">{data.customerName}</p>
        </div>
      </div>

      {/* Signature Pad Modal */}
      {isSigning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 no-print p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-[#d4af37] animate-in fade-in zoom-in duration-300 text-center">
            <h3 className="text-[#1a365d] font-bold mb-4 uppercase tracking-widest">Ký tên điện tử</h3>
            <div className="relative border border-slate-200 rounded overflow-hidden mb-4">
              <canvas 
                ref={canvasRef}
                width={400}
                height={200}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-full bg-slate-50 cursor-crosshair touch-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={clearCanvas} className="flex-1 bg-slate-100 py-2 rounded font-bold text-xs uppercase text-slate-600 hover:bg-slate-200 transition-colors">Xóa</button>
              <button onClick={saveSignature} className="flex-1 bg-[#1a365d] text-white py-2 rounded font-bold text-xs uppercase hover:bg-[#234575] transition-colors">Xác nhận</button>
              <button onClick={() => setIsSigning(false)} className="flex-1 bg-slate-200 py-2 rounded font-bold text-xs uppercase text-slate-500">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 px-[25mm] flex justify-between items-center text-[10px] text-slate-400">
        <p>© 2024 {data.brandName} - {APP_CONFIG.labels.footerNote}</p>
        <div className="flex items-center gap-1 group">
           <span className="no-print opacity-0 group-hover:opacity-100 transition-opacity">Sửa ngày:</span>
           <input 
            type="text" 
            value={data.contractDate}
            onChange={(e) => handleTextChange('contractDate', e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:bg-[#d4af37]/5 rounded px-1 transition-colors text-right font-mono"
          />
        </div>
      </div>
    </div>
  );
};

export default Contract;
