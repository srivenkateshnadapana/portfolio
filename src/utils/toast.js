export const copyEmailAndToast = (e, email = "nadapanasrivenkatesh1@gmail.com") => {
  // Try copying to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).catch(() => {});
  } else {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(textarea);
  }

  // Remove existing toast if present
  const existingToast = document.getElementById("email-toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.id = "email-toast";
  
  // High-end glassmorphism style classes
  toast.className = "fixed bottom-10 left-6 right-6 md:left-auto md:right-10 z-[10000] flex items-center gap-3 px-5 py-3.5 bg-black/90 border border-white/10 backdrop-blur-md text-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fade-in pointer-events-none";
  toast.style.fontFamily = "'Outfit', 'Inter', sans-serif";
  toast.style.width = "max-content";
  toast.style.maxWidth = "calc(100vw - 48px)";

  toast.innerHTML = `
    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3);" class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
      <span class="text-green-400 font-bold text-sm">✓</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-bold text-[#f4c430] uppercase tracking-widest">Email Copied!</span>
      <span class="text-xs text-white/50 mt-0.5">${email}</span>
    </div>
  `;

  document.body.appendChild(toast);

  // Fade out and remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px) scale(0.95)";
    toast.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => {
      toast.remove();
    }, 450);
  }, 2500);
};
