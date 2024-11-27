
import QuizModal from "@/components/quiz-modal";
import { type Metadata } from "next";
import Header from "@/components/header";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export const metadata: Metadata = {
  title: "CodeQuiz | Dashboard"
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/')
  }
  return (
    <SidebarProvider>
    <AppSidebar />
    <main className="relative w-full overflow-hidden">
      <Header />
      <section className="container">
        {children}
        <QuizModal />
      </section>
    </main>
  </SidebarProvider>
  );
}
