import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "Shravan Kumar Satapathy | Cloud Computing & DevOps Portfolio",
  description: "Cloud Computing & DevOps Enthusiast | Postman API Fundamentals Student Expert | AI-Enabled Student | Seeking Innovative Roles",
  keywords: "Cloud Computing, DevOps, AWS, GCP, CI/CD, Docker, Kubernetes, Python, Automation, AI",
  authors: [{ name: "Shravan Kumar Satapathy" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Shravan Kumar Satapathy | Cloud Computing & DevOps Portfolio",
    description: "Explore my portfolio showcasing expertise in cloud infrastructure, DevOps automation, and AI-driven solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shravan Kumar Satapathy | Cloud Computing & DevOps Portfolio",
    description: "Cloud Computing & DevOps Enthusiast specializing in AWS, automation, and AI-driven solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <ErrorReporter />
        <CustomCursor />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}