"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data : session} = authClient.useSession();
  const onSubmit = ()=> {
    authClient.signUp.email({
      email,
      name,
      password,

    },{
      onError: ()=> {
        toast.error('wtf')
      },
      onSuccess: ()=> {
        toast.success('HELLO')
      }
    })  
  }
  if(session){
    return (
      <div className="w-full h-screen flex flex-col text-accent justify-center items-center bg-accent-foreground">
        Login as {session?.user?.name}
        <Button
        variant={'secondary'}
        className=" cursor-pointer"
        onClick={()=> authClient.signOut()}
        >
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className=" w-full h-screen flex flex-col text-accent justify-center items-center bg-accent-foreground">
      <Card className="w-md p-3 py-6">
        <Input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
        onClick={()=>onSubmit()}
        className=""> 
          Submit
        </Button>
      </Card>
    </div>
  );
}
