"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers";
import "./global.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your app description here" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <title>Anaa Developers Ltd </title>
      </Head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <Providers>
            <Toaster richColors position="top-center" />
            <CssBaseline />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
