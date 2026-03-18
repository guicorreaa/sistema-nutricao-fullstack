"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Role = "ROLE_ADMIN" | "ROLE_CLIENTE" | null;

interface UserData {
  usuario_id: string;
  email: string;
  role: Role;
}

export function useAuthGuard(expectedRole?: Role) {
  const [userRole, setUserRole] = useState<Role>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Se estiver na página de alterar senha, ignora o guard
    if (pathname === "/alterarSenha" || pathname === "/") {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("https://api.nutrianaprado.com.br/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("Falha ao autenticar (provável token expirado).");
          router.push("/login");
          return; // <- importante para não continuar
        }

        const user = await res.json();

        if (expectedRole && user.role !== expectedRole) {
          router.push("/login");
          return;
        }

        setUserRole(user.role);
        setUserData(user);
      } catch (error) {
        console.warn("Falha ao autenticar (provável token expirado ou erro de rede).");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [expectedRole, router, pathname]);

  return { userRole, userData, loading };
}
