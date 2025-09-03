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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-600">Redirecting to Dashboard...</p>
    </div>
  );
}
