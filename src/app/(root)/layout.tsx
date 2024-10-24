
import QuizModal from "@/components/quiz-modal";
import { type Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Header from "@/components/header";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CodeQuiz | Dashboard"
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/login')
  }
  return (
      // <SidebarProvider>
        // <AppSidebar />
        <section className="container mx-auto px-5 sm:px-0">
          {/* <SidebarTrigger /> */}
          <Header />
          {children}
          <QuizModal />
        </section>
      // </SidebarProvider>
  );
}
