
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This page is a redirector.
export default function ComptePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main login page
    router.replace('/login');
  }, [router]);

  // Render nothing, or a loading spinner
  return null;
}
