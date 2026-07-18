"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  paketTitle: string;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  paketTitle,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-sm w-full relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 text-lg">Hapus Paket Edukasi?</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Apakah Anda yakin ingin menghapus paket <b>&ldquo;{paketTitle}&rdquo;</b>? Tindakan ini bersifat permanen.
            </p>
          </div>

          <div className="pt-2 flex gap-3 text-sm">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition shadow-md shadow-red-600/10 active:scale-95 cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
