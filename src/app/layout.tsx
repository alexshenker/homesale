import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Stack } from "@mui/material";
import company from "@/utils/constants/company";
import TanstackProvider from "@/components/providers/TanstackProvider";
import toClassName from "@/utils/public/toClassName";

import ToastProvider from "@/components/ui/Toast/ToastProvider";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
    title: {
        default: company,
        template: "%s",
    },
    description: "Connecting home sellers and buyers",
    keywords: ["home", "rent", "apartment"],
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
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
                                        paddingBottom: "20px",
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
