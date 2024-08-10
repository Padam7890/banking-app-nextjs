import type { Metadata } from "next";
import { Inter , IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] , variable:'--font-inter'});
const ibm_plex_serif = IBM_Plex_Serif({ 
  subsets: ["latin"] ,
  weight:['400','700'],
  variable:'--font-ibm-plex-serif'

});

export const metadata: Metadata = {
  title: "PDT Bank",
  description: "PDT Bank is Modern Banking Platfrom",
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibm_plex_serif.variable}`}>{children}</body>
    </html>
  );
}
