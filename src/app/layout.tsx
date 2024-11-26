import "@/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Inter } from 'next/font/google';
import GlobalContextProvider from "./_contexts/store";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Disable auto-adding CSS

const dmSans = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
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
