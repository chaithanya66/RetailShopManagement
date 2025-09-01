"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function mainpage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return null;
}
