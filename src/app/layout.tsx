import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Stack } from "@mui/material";
import company from "@/utils/constants/company";
import TanstackProvider from "@/components/providers/TanstackProvider";
import toClassName from "@/utils/public/toClassName";

import ToastProvider from "@/components/ui/Toast/ToastProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { getAuthSession } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: company,
        template: "%s",
    },
    description:
        "Piano accompaniment app designed for stringed instruments such as violin, viola, and cello to enhance practicing and performing",
    keywords: ["Piano Accompaniment", "Sheet Music"],
    icons: {
        icon: "/favicon.ico",
    },
    manifest: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/site.webmanifest`,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAuthSession();

    return (
        <html lang="en">
            <body className={toClassName(inter.className, "relative")}>
                <SessionProvider session={session}>
                    <TanstackProvider>
                        <ToastProvider>
                            <div
                                className={
                                    "flex flex-col min-h-screen items-center"
                                }
                                style={{
                                    paddingTop: "40px",
                                }}
                            >
                                <Stack
                                    maxWidth={900}
                                    width={"100%"}
                                    borderRadius={"20px"}
                                >
                                    <Navbar />

                                    <Stack flexGrow={1}>{children}</Stack>
                                </Stack>
                            </div>
                            <Footer />
                        </ToastProvider>
                    </TanstackProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
