import { UserId } from "@/opaqueIdTypes";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DATABASE_URL: string;

            NEXTAUTH_URL: string;
            NEXT_PUBLIC_NEXTAUTH_URL: string;
            NEXTAUTH_SECRET: string;

            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_ANALYTICS_MEASUREMENT_ID: string;

            WASABI_BUCKET_NAME: string;
            WASABI_ACCESS_KEY: string;
            WASABI_SECRET_KEY: string;

            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
            STRIPE_SECRETE_KEY: string;
        }
    }

    type OmitMod<Obj, Key extends keyof Obj> = {
        [K in keyof Obj as K extends Key ? never : K]: Obj[K];
    };
}

declare module "next-auth/jwt" {
    type JWT = DefaultJWT & {
        id: UserId | null;
    };
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: DefaultSession["user"] & {
            id: UserId | null;
            role: Role | null;
        };
    }
}

export {};
