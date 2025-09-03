"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to dashboard when admin page is accessed
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#450209] border-t-transparent mx-auto mb-6"></div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <p className="text-lg font-semibold text-gray-700">
            Redirecting to Dashboard...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we set up your admin portal
          </p>
        </div>
      </div>
    </div>
  );
}
