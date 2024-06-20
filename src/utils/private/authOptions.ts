import { days } from "milliseconds";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import { isNil } from "lodash";

import { UserId } from "@/opaqueIdTypes";
import prismaClient from "@/lib/db";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";

const theme: NextAuthOptions["theme"] = {
    colorScheme: "auto",
    logo: "/logo.jpg",
};

const providers: NextAuthOptions["providers"] = [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            },
        },
    }),
];

const callbacks: NextAuthOptions["callbacks"] = {
    jwt: async ({ token }) => {
        if (isNil(token.email)) {
            token.id = null;

            return token;
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (user !== null) {
                token.id = user.id as UserId;
            }

            return token;
        } catch (e) {
            console.error(`NextAuth JWT Error: ${e}`);
            return token;
        }
    },
    session: ({ session, token }) => {
        session.user = {
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role,
        };

        return session;
    },
};

export const maxSessionAge = days(7);

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers,
    theme,
    callbacks,
    session: {
        strategy: "jwt",
        maxAge: maxSessionAge,
    },
    jwt: {
        maxAge: maxSessionAge,
    },
};

export default authOptions;

export const getAuthSession = (
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) => {
    return getServerSession(...args, authOptions);
};
