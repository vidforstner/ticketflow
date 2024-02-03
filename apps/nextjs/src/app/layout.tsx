import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { Toaster } from "@acme/ui/toast";

import { env } from "~/env";
import Navbar from "../components/navbar";

import "~/app/globals.css";

//https://github.com/clerk/javascript/blob/main/packages/localizations/src/en-US.ts
const localization = {
  socialButtonsBlockButton: "Nadaljuj z {{provider|titleize}}",
  dividerText: "ali",
  formFieldLabel__firstName: "Ime",
  formFieldLabel__lastName: "Priimek",
  formFieldLabel__emailAddress: "Email",
  formFieldLabel__password: "Geslo",
  formButtonPrimary: "Naprej",
  signUp: {
    start: {
      title: "Registracija",
      subtitle: "Ustvari račun za nadaljevanje",
      actionText: "Že imaš račun?",
      actionLink: "Prijava",
    },
    emailLink: {
      title: "Verify your email",
      subtitle: "to continue to {{applicationName}}",
      formTitle: "Verification link",
      formSubtitle: "Use the verification link sent to your email address",
      resendButton: "Didn't receive a link? Resend",
      verified: {
        title: "Successfully signed up",
      },
      loading: {
        title: "Signing up...",
      },
      verifiedSwitchTab: {
        title: "Successfully verified email",
        subtitle: "Return to the newly opened tab to continue",
        subtitleNewTab: "Return to previous tab to continue",
      },
    },
    emailCode: {
      title: "Verify your email",
      subtitle: "to continue to {{applicationName}}",
      formTitle: "Verification code",
      formSubtitle: "Enter the verification code sent to your email address",
      resendButton: "Didn't receive a code? Resend",
    },
    phoneCode: {
      title: "Verify your phone",
      subtitle: "to continue to {{applicationName}}",
      formTitle: "Verification code",
      formSubtitle: "Enter the verification code sent to your phone number",
      resendButton: "Didn't receive a code? Resend",
    },
    continue: {
      title: "Fill in missing fields",
      subtitle: "to continue to {{applicationName}}",
      actionText: "Have an account?",
      actionLink: "Sign in",
    },
  },
  signIn: {
    start: {
      title: "Prijava",
      subtitle: "Prijavi se v svoj račun",
      actionText: "Nimaš računa?",
      actionLink: "Registracija",
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Ticketflow",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-black font-sans text-foreground text-white antialiased",
            GeistSans.variable,
            GeistMono.variable,
          )}
        >
          <Navbar>{props.children}</Navbar>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
