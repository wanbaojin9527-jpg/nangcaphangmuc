
import React from 'react';
import { Printer, User, CreditCard, Calendar, RefreshCw, Shield, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ContractData } from '../types';

interface Props {
  data: ContractData;
  setData: (data: ContractData) => void;
  onPrint: () => void;
  onReset: () => void;
  isSigned: boolean;
}

const Sidebar: React.FC<Props> = ({ data, setData, onPrint, onReset, isSigned }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, balanceImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData({ ...data, balanceImage: null });
  };

  return (
    <div className="h-full bg-slate-900 text-white p-6 shadow-xl border-r border-slate-800 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[#d4af37] contract-header flex items-center gap-2">
          <div className="w-8 h-8 bg-[#d4af37] rounded flex items-center justify-center text-slate-900">
             <Printer size={18} />
          </div>
          Quản Lý Hợp Đồng
        </h1>
        <p className="text-xs text-slate-400 mt-2 italic">Dành cho Khách hàng Thượng lưu</p>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
            <User size={14} className="text-[#d4af37]" />
            Họ Tên Khách Hàng
          </label>
          <input
            type="text"
            name="customerName"
            value={data.customerName}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
            <CreditCard size={14} className="text-[#d4af37]" />
            Hạn Mức Đề Xuất
          </label>
          <input
            type="text"
            name="limitAmount"
            value={data.limitAmount}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:outline-none focus:border-[#d4af37] transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
            <ImageIcon size={14} className="text-[#d4af37]" />
            Chứng Thực Số Dư
          </label>
          {!data.balanceImage ? (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full bg-slate-800 border border-slate-700 border-dashed rounded p-4 text-center text-xs text-slate-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
                Tải ảnh số dư ngân hàng
              </div>
            </div>
          ) : (
            <div className="relative rounded overflow-hidden group">
              <img src={data.balanceImage} alt="Balance proof" className="w-full h-24 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <button 
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={12} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[9px] text-center uppercase font-bold tracking-tighter">
                Đã tải lên
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
            <Calendar size={14} className="text-[#d4af37]" />
            Ngày Lập Hợp Đồng
          </label>
          <input
            type="text"
            name="contractDate"
            value={data.contractDate}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>
      </div>

      <div className="pt-6 space-y-3 mt-auto">
        <button
          onClick={onPrint}
          className="w-full bg-[#d4af37] hover:bg-[#b89a30] text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4af37]/20"
        >
          <Printer size={18} />
          XUẤT FILE PDF
        </button>
        
        <button
          onClick={onReset}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors border border-slate-700"
        >
          <RefreshCw size={14} />
          LÀM MỚI TOÀN BỘ
        </button>
      </div>

      <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <h4 className="text-[10px] font-bold uppercase text-[#d4af37] mb-2 tracking-widest flex items-center gap-2">
          <Shield size={12} /> HƯỚNG DẪN KÝ TÊN
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          Khách hàng vui lòng tải ảnh chụp số dư tài khoản ngân hàng và cuộn xuống cuối trang hợp đồng để thực hiện ký tên điện tử.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
