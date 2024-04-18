import { days } from "milliseconds";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import { isNil } from "lodash";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { UserId } from "@/opaqueIdTypes";
import prismaClient from "@/lib/db";

const theme: NextAuthOptions["theme"] = {
    colorScheme: "auto",
    logo: "/logoDark.svg",
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
                include: {
                    permissions: true,
                },
            });

            if (user !== null) {
                token.id = user.id as UserId;
                token.role =
                    user.permissions !== null &&
                    user.permissions.admin_view === true
                        ? "admin"
                        : "user";
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
    events: {
        createUser: async ({ user }) => {
            // try {
            //     //Permissions is an optional object in prisma type, so we have to create it
            //     const permission = await prisma.permissions.findFirst({
            //         where: {
            //             userId: user.id,
            //         },
            //     });
            //     if (permission === null) {
            //         await prisma.permissions.create({
            //             data: { user: { connect: { id: user.id } } },
            //         });
            //     }
            //     return;
            // } catch (e) {
            //     console.error(e);
            //     return;
            // }
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const getAuthSession = (
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) => {
    return getServerSession(...args, authOptions);
};
