"use client";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UnsavedChangesModal({
  isOpen,
  onClose,
  onConfirm,
}: UnsavedChangesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-sm w-full relative z-[60] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center space-y-4">
          {/* Warning graphic */}
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Warning Text */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 text-lg">Perubahan Belum Disimpan</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Anda memiliki perubahan pada formulir ini. Apakah Anda yakin ingin membatalkan dan membuang semua perubahan?
            </p>
          </div>

          {/* Actions buttons */}
          <div className="pt-2 flex gap-3 text-sm">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              Lanjutkan Isi
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer"
            >
              Buang Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
