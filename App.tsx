
import React, { useState } from 'react';
import Contract from './components/Contract';
import SuccessModal from './components/SuccessModal';
import { APP_CONFIG, ContractData } from './config';
import { Printer, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ContractData>(APP_CONFIG.defaultData);
  const [signature, setSignature] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSign = (signatureData: string) => {
    setSignature(signatureData);
    setShowSuccess(true);
  };

  const handleUpdateData = (newData: Partial<ContractData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const resetAll = () => {
    setData(APP_CONFIG.defaultData);
    setSignature(null);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Floating Controls */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 no-print">
        <button
          onClick={handlePrint}
          className="bg-[#1a365d] hover:bg-[#234575] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 group"
          // Fix: Changed printButton to printBtn to match config.ts
          title={APP_CONFIG.labels.printBtn}
        >
          <Printer size={24} />
          <span className="absolute right-16 bg-white text-[#1a365d] px-3 py-1 rounded shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-200">
            {/* Fix: Changed printButton to printBtn to match config.ts */}
            {APP_CONFIG.labels.printBtn}
          </span>
        </button>
        <button
          onClick={resetAll}
          className="bg-white hover:bg-slate-50 text-slate-400 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 group border border-slate-200"
          // Fix: Changed resetButton to resetBtn to match config.ts
          title={APP_CONFIG.labels.resetBtn}
        >
          <RefreshCw size={24} />
          <span className="absolute right-16 bg-white text-slate-600 px-3 py-1 rounded shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-200">
            {/* Fix: Changed resetButton to resetBtn to match config.ts */}
            {APP_CONFIG.labels.resetBtn}
          </span>
        </button>
      </div>

      {/* Contract Preview Area */}
      <div className="w-full flex-1 p-4 md:p-10 flex justify-center items-start overflow-x-auto">
        <div className="bg-white shadow-2xl transition-transform duration-300">
           <Contract 
            data={data} 
            signature={signature} 
            onSign={handleSign} 
            onUpdateData={handleUpdateData}
           />
        </div>
      </div>

      {/* Success Animation/Modal */}
      {showSuccess && (
        <SuccessModal 
          customerName={data.customerName} 
          limitAmount={data.limitAmount}
          onClose={() => setShowSuccess(false)} 
        />
      )}
    </div>
  );
};

export default App;
