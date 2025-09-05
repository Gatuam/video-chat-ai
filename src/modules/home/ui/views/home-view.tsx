"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const trpc = useTRPC();
    const messaging = useQuery(trpc.hello.queryOptions({
      text : 'dfgfdhfghlmfhl;kfghlkrdlrk;'
    }))
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (session) {
    return (
      <div className="w-full h-screen flex flex-col text-accent justify-center items-center ">
        Login as {session?.user?.name}
        <Button
          variant={"secondary"}
          className=" cursor-pointer"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/auth/sign-in"),
              },
            })
          }
        >
          Logout
        </Button>
        {messaging.data?.greeting}
      </div>
    );
  }
}
