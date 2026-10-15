import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllDevs | Build Circles",
  description: "Discover ideas and people to build with.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
