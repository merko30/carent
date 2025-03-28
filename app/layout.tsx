import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/header/Header";
import AuthProvider from "@/providers/Auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "carent",
  description:
    "Tražiš ili iznajmljujes automobil za kratko vrijeme? CaRent je odgovor na sve tvoje potrebe za automobilom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster
            toastOptions={{
              position: "bottom-center",
              icon: undefined,
              success: {
                style: {
                  background: "var(--color-green-50)",
                  color: "var(--color-green-900)",
                  border: "1px solid var(--color-green-900)",
                },
              },
              error: {
                style: {
                  background: "var(--color-red-50)",
                  color: "var(--color-red-900)",
                  border: "1px solid var(--color-red-900)",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
