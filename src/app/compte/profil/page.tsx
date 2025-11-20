
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This page is a redirector.
export default function CompteProfilPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main dashboard page
    router.replace('/dashboard');
  }, [router]);

  // Render nothing, or a loading spinner
  return null;
}
