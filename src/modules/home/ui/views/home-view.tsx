"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Video, Bot, Shield, Globe, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    title: "Free AI Calls",
    description:
      "Connect instantly with AI-powered customer service agents at no cost.",
    icon: <Video className="w-6 h-6 text-accent" />,
  },
  {
    title: "Smart Customer Support",
    description:
      "Our AI agents can handle queries, resolve issues, and provide guidance efficiently.",
    icon: <Bot className="w-6 h-6 text-accent" />,
  },
  {
    title: "Quick Deployment",
    description:
      "Set up your customer service AI in seconds and start assisting your clients immediately.",
    icon: <Rocket className="w-6 h-6 text-accent" />,
  },
  {
    title: "Secure & Private",
    description:
      "All customer interactions are encrypted and stored securely for your peace of mind.",
    icon: <Shield className="w-6 h-6 text-accent" />,
  },
  {
    title: "Global Support",
    description:
      "Assist customers from anywhere in the world with multilingual AI capabilities.",
    icon: <Globe className="w-6 h-6 text-accent" />,
  },
  {
    title: "Instant Messaging",
    description:
      "Provide fast chat support alongside AI calls to keep customers engaged.",
    icon: <MessageSquare className="w-6 h-6 text-accent" />,
  },
];

export function HomeView() {
  const isMobile = useIsMobile();

  return (
    <main className=" text-accent-foreground flex flex-col items-center justify-center px-2">
      <header className="w-full flex justify-between items-center bg-accent/5 backdrop-blur-3xl px-8 py-3 border-b border-primary/10">
        <h1 className="text-xl md:text-2xl font-bold">Customer-AI</h1>
        <nav>
          <Link href="/agents">
            <Button variant="outline">My Agents</Button>
          </Link>
        </nav>
      </header>

      <div className="w-full h-full flex flex-col items-center justify-center mt-0 md:mt-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-20 max-w-2xl">
          <Badge className="mb-4">AI Customer Service</Badge>
          <h2 className="text-xl md:text-5xl font-extrabold tracking-tight text-accent-foreground">
            Free AI Calls & Customer Support
          </h2>
          <p className="mt-4 text-sm md:text-lg text-accent-foreground">
            Let your AI agents handle customer queries, provide instant assistance,
            and improve satisfaction—completely free.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/agents">
              <Button size="default">🚀 Start Assisting</Button>
            </Link>
          </div>
        </section>

        <section className="mt-10 md:mt-15 px-6 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features
              .slice(0, isMobile ? 2 : features.length)
              .map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon} {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{feature.description}</CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
