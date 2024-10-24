import "@/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { DM_Sans } from '@next/font/google';
import GlobalContextProvider from "./_contexts/store";

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: "CodeQuiz",
  description: "Test your programming knowledge by playing CodeQuiz",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <GlobalContextProvider>
              {children}
              <div id='portal' />
          </GlobalContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
