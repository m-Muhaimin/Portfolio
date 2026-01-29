import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { RESUME_DATA } from "@/data/resume-data";
import { PostHogProvider } from "./providers";

import "./globals.css";
import React from "react";

// Updated Metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL(RESUME_DATA.personalWebsiteUrl),
  title: {
    default: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
    template: `%s | ${RESUME_DATA.name}`,
  },
  description: RESUME_DATA.summary,
  authors: [{ name: RESUME_DATA.name, url: RESUME_DATA.personalWebsiteUrl }],
  creator: RESUME_DATA.name,
  openGraph: {
    title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
    description: RESUME_DATA.summary,
    url: RESUME_DATA.personalWebsiteUrl,
    siteName: RESUME_DATA.name,
    images: [
      {
        url: "/website_ss.png",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name} - ${RESUME_DATA.about}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
    description: RESUME_DATA.summary,
    creator: "@muhaimin",
    images: ["/website_ss.png"],
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
  alternates: {
    canonical: RESUME_DATA.personalWebsiteUrl,
  },
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    jobTitle: RESUME_DATA.about,
    url: RESUME_DATA.personalWebsiteUrl,
    description: RESUME_DATA.summary,
    image: `${RESUME_DATA.personalWebsiteUrl}${RESUME_DATA.avatarUrl}`,
    sameAs: RESUME_DATA.contact.social.map((social) => social.url),
    knowsAbout: Object.values(RESUME_DATA.skills).flat(),
    alumniOf: RESUME_DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PostHogProvider>
          {children}
          <Analytics /> {/* Vercel Analytics */}
        </PostHogProvider>
      </body>
    </html>
  );
}
