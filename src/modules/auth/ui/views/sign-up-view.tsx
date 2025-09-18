"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { TbBrandGithub } from "react-icons/tb";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader, Loader2, OctagonAlertIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const SignupView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fromSchema = z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email(),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof fromSchema>) => {
    setError(null);
    setLoading(false);
    try {
      setLoading(true);
      const res = await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/agents",
        },
        {
          onSuccess: () => {
            toast.success("Sign up succefully");
            router.push("/");
          },
          onError: ({ error }) => {
            setError(error?.message || "Something went wrong!");
          },
        }
      );
    } catch (error) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex flex-col gap-6">
      <Card className=" overflow-hidden p-0 shadow-2xl">
        <CardContent className=" grid p-0 md:grid-cols-2">
          <div className=" flex flex-col  space-y-8 px-9 py-11">
            <div className=" mb-9 flex flex-col justify-center items-center">
              <h1 className=" text-2xl font-semibold text-center">
                Welcome from Video AI
              </h1>
              <p className=" text-muted-foreground/70 text-sm  tracking-tight">
                Sign up to get start
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className=" space-y-5">
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*****"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={loading}
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confrim Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*****"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <Alert className="  bg-destructive/15 border-none">
                    <OctagonAlertIcon className=" h-4 w-4 !text-destructive/80" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                {loading ? (
                  <div className=" w-full flex items-center justify-center text-center bg-muted-foreground/30 p-2 rounded-md">
                    <Loader className=" animate-spin" />
                  </div>
                ) : (
                  <Button disabled={loading} className=" w-full" type="submit">
                    SignUp
                  </Button>
                )}
                <div className="w-full space-y-2">
                  <Separator className=" bg-accent-foreground/20" />
                  <p className=" text-center text-sm text-accent-foreground/50">
                    Or continue with
                  </p>
                  <div className=" grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => {
                        authClient.signIn.social({
                          provider: "google",
                        });
                      }}
                      type="button"
                      variant={"outline"}
                    >
                      <FcGoogle />
                    </Button>
                    <Button
                      onClick={() => {
                        authClient.signIn.social({
                          provider: "github",
                        });
                      }}
                      type="button"
                      variant={"outline"}
                    >
                      <TbBrandGithub />
                    </Button>
                  </div>
                </div>

                <div className=" text-sm text-accent-foreground/50 text-center ">
                  Already an account yet ?{" "}
                  <Link
                    href={"/auth/sign-in"}
                    className=" underline text-sm text-blue-400"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          <div className=" bg-radial from-accent to-accent/80 relative hidden md:flex flex-col gap-y-3 items-center justify-center">
            <div className="absolute z-1  -right-25 top-[78%] h-[300px] w-[300px] opacity-25 rounded-full bg-[radial-gradient(circle_400px_at_10%_300px,#fbfbfb36,#000)] animate-spin [animation-duration:7s] "></div>
            <div className="absolute z-1  -top-59 -left-0  h-[300px] w-[300px] opacity-25 rounded-full bg-[radial-gradient(circle_400px_at_10%_300px,#fbfbfb36,#000)] animate-spin [animation-duration:7s] "></div>
            <img
              src={"/logo.png"}
              alt="logo"
              className=" size-50 object-cover opacity-60 animate-pulse"
            />
            <p className=" text-2xl font-semibold text-white">Video-AI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupView;
