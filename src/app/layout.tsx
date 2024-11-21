import type { Metadata } from "next";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { InstallableContextProvider } from "@/contexts/InstallableContext";
import InstallPopUp from "@/components/InstallPopUp";
import Topbar from "@/components/TopBar";

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
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <AuthContextProvider>
          <InstallableContextProvider>
            <SkeletonTheme baseColor="#eaeaea" highlightColor="#bfbfbf">
              <Topbar />
              <main>{children}</main>
              <ToastContainer position="bottom-right" />
              <InstallPopUp />
            </SkeletonTheme>
          </InstallableContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
