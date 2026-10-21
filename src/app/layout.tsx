import type { Metadata, Viewport } from "next";
import { Inconsolata, Kantumruy_Pro, Sacramento } from "next/font/google";
import { LanguageProvider } from "@/components/layout/language-provider";
import { TouchFeedback } from "@/components/layout/touch-feedback";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Handwritten script for headings and accents.
const script = Sacramento({
  variable: "--font-script-face",
  subsets: ["latin"],
  weight: "400",
});

const khmer = Kantumruy_Pro({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LATA Bee | Naturally Sourced Cambodian Honey",
  description:
    "A locally sourced honey solution that supports rural beekeepers, protects bee habitats, and promotes sustainable production.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf3" },
    { media: "(prefers-color-scheme: dark)", color: "#1c170e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inconsolata.variable} ${script.variable} ${khmer.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <ThemeProvider>
          <TouchFeedback />
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
