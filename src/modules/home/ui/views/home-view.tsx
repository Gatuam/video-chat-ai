"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomeView() {

  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (session) {
    return (
      <div>
       hi
      </div>
    );
  }
}
