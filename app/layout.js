import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "ITL Conference '26 | From Hurdles to Horizons: The Evolving ITL Landscape",
  description: "Join the largest gathering of Internationally Trained Lawyers (ITLs) in Canada. April 23-25, 2026 in Toronto, Ontario. Featuring panel discussions, CPD sessions, workshops, networking opportunities, and an awards gala.",
  keywords: [
    "ITL Conference",
    "Internationally Trained Lawyers",
    "ITL Conference 2026",
    "Toronto legal conference",
    "ITL Network",
    "Global Lawyers of Canada",
    "legal professionals Canada",
    "ITL networking",
    "legal conference Toronto",
    "internationally trained lawyers Canada",
    "ITL NCA NetworkS",
    "JOY ITL Initiative",
    "legal career development",
    "ITL support",
    "legal practice Canada"
  ],
  authors: [{ name: "ITL Conference" }],
  creator: "ITL Conference Organizers",
  publisher: "ITL Conference",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://itlconference.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ITL Conference '26 | From Hurdles to Horizons: The Evolving ITL Landscape",
    description: "Join the largest gathering of Internationally Trained Lawyers (ITLs) in Canada. April 23-25, 2026 in Toronto, Ontario.",
    url: "https://itlconference.ca",
    siteName: "ITL Conference '26",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ITL Conference '26",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITL Conference '26 | From Hurdles to Horizons",
    description: "Join the largest gathering of Internationally Trained Lawyers (ITLs) in Canada. April 23-25, 2026 in Toronto, Ontario.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes if available
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
