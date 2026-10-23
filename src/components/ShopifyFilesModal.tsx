import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, FileCode, BookOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SHOPIFY_THEME_FILES, ShopifyThemeFile } from '../data/shopifyThemeCode';

export const ShopifyFilesModal: React.FC = () => {
  const { isShopifyCodeOpen, closeShopifyCode } = useStore();
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isShopifyCodeOpen) return null;

  const currentFile = SHOPIFY_THEME_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.filename.split('/').pop() || 'shopify_theme_file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#0E0A08] text-[#F4ECDD] shadow-2xl border border-[#B8935A]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B8935A]/30 flex items-center justify-between bg-[#1A120D] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2B1A12] border border-[#B8935A]/30 text-[#B8935A]">
              <FileCode size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl text-[#F4ECDD]">
                  Shopify Online Store 2.0 Theme Deliverables
                </h3>
                <span className="text-[10px] bg-[#B8935A]/20 text-[#B8935A] px-2 py-0.5 border border-[#B8935A]/40 uppercase tracking-widest font-mono">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-[#E6D8C3]/70 font-light mt-0.5">
                Target Store: <a href="https://no5e827smb2hm24p-77128073414.shopifypreview.com/" target="_blank" rel="noopener noreferrer" className="text-[#B8935A] hover:underline inline-flex items-center gap-1">no5e827smb2hm24p-77128073414.shopifypreview.com <ExternalLink size={10} /></a>
              </p>
            </div>
          </div>

          <button
            onClick={closeShopifyCode}
            className="p-1.5 text-[#F4ECDD]/60 hover:text-[#F4ECDD] transition-colors cursor-pointer"
            aria-label="Close Shopify Code Inspector"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2-Column Explorer: Left Sidebar File List, Right Code Viewer */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
          
          {/* File Navigation Tree */}
          <div className="md:col-span-4 bg-[#140E0A] border-r border-[#B8935A]/25 p-4 space-y-2 overflow-y-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8935A] font-semibold block px-2 pb-2 border-b border-[#B8935A]/20">
              Theme Files & Documentation
            </span>

            <div className="space-y-1">
              {SHOPIFY_THEME_FILES.map((file, idx) => (
                <button
                  key={file.filename}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                    selectedFileIndex === idx
                      ? 'bg-[#2B1A12] text-[#B8935A] border-l-2 border-[#B8935A] font-semibold'
                      : 'text-[#E6D8C3]/70 hover:bg-[#1E1611] hover:text-[#F4ECDD]'
                  }`}
                >
                  <span className="truncate">{file.filename}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-black/40 text-[#E6D8C3]/50">
                    {file.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-[#B8935A]/20 px-2 space-y-2 text-[11px] text-[#E6D8C3]/70">
              <span className="font-semibold text-[#B8935A] block">Installation Instructions:</span>
              <p>1. Open your Shopify Admin for store 77128073414.</p>
              <p>2. Go to <strong>Online Store</strong> → <strong>Themes</strong> → <strong>Edit Code</strong>.</p>
              <p>3. Create new files in their respective folders (<code className="text-[#B8935A]">sections/</code>, <code className="text-[#B8935A]">snippets/</code>, <code className="text-[#B8935A]">assets/</code>) and paste the code.</p>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="md:col-span-8 bg-[#0E0A08] flex flex-col overflow-hidden">
            
            {/* File Info Bar */}
            <div className="px-5 py-3 bg-[#1C140F] border-b border-[#B8935A]/20 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#B8935A] font-semibold">
                  {currentFile.filename}
                </span>
                <span className="text-[11px] text-[#E6D8C3]/60 block">
                  {currentFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-xs font-medium text-[#F4ECDD] border border-[#B8935A]/40 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-[#B8935A]" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-[#B8935A] hover:bg-[#c9a46b] text-xs font-medium text-[#0E0A08] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Pre container */}
            <div className="flex-1 p-5 overflow-auto bg-[#0A0706] text-[#E6D8C3] font-mono text-xs leading-relaxed selection:bg-[#B8935A]/40 selection:text-white">
              <pre className="whitespace-pre">{currentFile.code}</pre>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#140E0A] border-t border-[#B8935A]/25 flex items-center justify-between text-xs text-[#E6D8C3]/60">
          <span>Ovelo Online Store 2.0 Architectural Suite</span>
          <button
            onClick={closeShopifyCode}
            className="hover:text-[#F4ECDD] underline cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
