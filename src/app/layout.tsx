import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { InstallableContextProvider } from "@/contexts/InstallableContext";
import InstallPopUp from "@/components/InstallPopUp";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Topbar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Fallstack 2024",
  title: "Fallstack 2024",
  description:
    "Website do evento Fallstack 2024. O evento decorrerá nos dias 26 e 27 de novembro no Instituto Superior de Engenharia do Porto. O evento é organizado pelo Núcleo de Estudantes de Informática do ISEP (NEI-ISEP).",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-svh">
      <body className={inter.className}>
        <AuthContextProvider>
          <InstallableContextProvider>
            <ThemeProvider>
              <SkeletonTheme baseColor="#eaeaea" highlightColor="#bfbfbf">
                <Topbar />
                <main>{children}</main>
                <ToastContainer position="bottom-right" />
                <InstallPopUp />
              </SkeletonTheme>
            </ThemeProvider>
          </InstallableContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
