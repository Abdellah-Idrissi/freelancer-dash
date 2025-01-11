import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import dark_favicon from "../../public/favicon-dark.ico";
import light_favicon from "../../public/favicon-light.ico";
import { RtkProvider } from "@/components/providers/RtkProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";

const mainFont = DM_Sans({ subsets: ["latin"] });

const secondFont = Playfair_Display({ subsets: ["latin"] , variable:'--second-font'});

const futurA = localFont({
  src: [
    {
      path: "../fonts/FuturaCyrillicBook.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/FuturaCyrillicMedium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable:'--futura-font'
});

export const metadata: Metadata = {
  title: "Freelancer Dash",
  description: "Freelancer Dash is a fullstack dashboard",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: dark_favicon.src,
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      url: light_favicon.src,
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${secondFont.variable} ${futurA.variable}`}>
      <ClerkProvider>
        <body
          suppressHydrationWarning={true}
          className={`${mainFont.className} bg-bgColor text-textColor transition-colors duration-200 `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RtkProvider>
              {children}
              <Toaster closeButton />
              
            </RtkProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
