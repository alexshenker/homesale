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
    return (
        <html lang="en">
            <body className={toClassName(inter.className, "relative")}>
                <SessionProvider>
                    <TanstackProvider>
                        <ToastProvider>
                            <div
                                className={
                                    "min-h-screen flex flex-col items-center"
                                }
                            >
                                <Stack
                                    maxWidth={1000}
                                    width="100%"
                                    height="100%"
                                    borderRadius={"20px"}
                                    style={{
                                        paddingTop: "40px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                    }}
                                    flexGrow={1}
                                >
                                    <Navbar />

                                    <Stack component="main" flexGrow={1}>
                                        {children}
                                    </Stack>
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
