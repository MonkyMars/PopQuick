import "./globals.scss";
import React from "react";

export const metadata = {
  title: "PopQuick",
  description: "Connect and share with new friends on PopQuick - the social platform that brings people together. Join our vibrant community for instant messaging and networking.",
  keywords: [
    "social media",
    "popquick",
    "community",
    "networking",
    "social platform",
    "connect",
    "share",
    "messaging"
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
