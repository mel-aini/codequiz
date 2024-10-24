import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from '@/components/ui/button'
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
        <main className="min-h-screen container px-4 md:px-6 mx-auto flex justify-center items-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to CodeQuiz
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Test your coding knowledge with our interactive quizzes. Choose a language and start learning!
              </p>
            </div>
            <Link href={'/dashboard'}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </main>
    </HydrateClient>
  );
}
