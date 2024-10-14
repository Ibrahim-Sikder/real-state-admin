"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <Providers>
            <Toaster />
            <CssBaseline />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
