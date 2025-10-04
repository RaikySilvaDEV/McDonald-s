"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface HomeRedirectProps {
  slug?: string | null;
}

const HomeRedirect = ({ slug }: HomeRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      router.replace(`/${slug}`);
    }
  }, [slug, router]);

  return null; // ou um componente de loading
};

export default HomeRedirect;