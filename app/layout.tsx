import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Model Arena | Bob's Lab",
  description: "Visual analysis of AI model tradeoffs: cost, accuracy, speed, context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
