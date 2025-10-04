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

  // Mostra um loader enquanto o redirecionamento está sendo processado no cliente
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <p className="ml-4 text-lg">Redirecionando...</p>
    </div>
  );
};

export default HomeRedirect;