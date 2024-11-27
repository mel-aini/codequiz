import { HydrateClient } from "@/trpc/server";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  return (
    <HydrateClient>
        <main className="main">
          <HeroSection />
        </main>
    </HydrateClient>
  );
}
