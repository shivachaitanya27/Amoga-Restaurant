import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useRestaurant } from '../context/RestaurantContext';
import { Download, Printer, QrCode, ExternalLink } from 'lucide-react';

export const QRManagement: React.FC = () => {
  const { settings } = useRestaurant();
  const printRef = useRef<HTMLDivElement>(null);

  const menuUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/menu` 
    : 'https://amoga.in/menu';

  const handleDownload = () => {
    const svgElement = document.getElementById('amoga-admin-qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 80;
      canvas.height = img.height + 80;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 40, 40);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `Amoga-Table-QR.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Table QR Code Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Generate, download and print QR standees for your restaurant dining tables. Guests scan to view the 62-item menu on their phone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Preview Card */}
        <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
          <div ref={printRef} className="p-6 rounded-2xl bg-amoga-cream border-2 border-dashed border-amoga-burgundy/30 inline-block">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amoga-burgundy to-amoga-orange text-white flex items-center justify-center font-serif font-bold text-xl mx-auto mb-2 shadow-sm">
              A
            </div>
            <h3 className="font-serif text-xl font-bold text-amoga-burgundy">
              {settings.restaurantName}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amoga-orangeDark block mb-4">
              Mayuri Center, Khammam
            </span>

            <div className="bg-white p-4 rounded-xl shadow-inner inline-block mb-4">
              <QRCodeSVG
                id="amoga-admin-qr-svg"
                value={menuUrl}
                size={220}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#470717"
              />
            </div>

            <p className="font-bold text-xs text-slate-800 mb-0.5">
              Scan For Digital Menu &amp; Ordering
            </p>
            <p className="text-[10px] text-slate-500">
              Pick your dishes and order on WhatsApp!
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-800">
            QR Settings &amp; Actions
          </h3>

          <div className="text-xs space-y-2 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Target URL:</span>
              <span className="font-mono font-bold text-slate-800 truncate max-w-[180px]">{menuUrl}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Error Correction:</span>
              <span className="font-bold text-slate-800">High (Level H)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Format:</span>
              <span className="font-bold text-slate-800">PNG / SVG Print</span>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-amoga-gold" />
              <span>Download High-Res PNG</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table Tent Card</span>
            </button>

            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Test Target Menu Link</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

