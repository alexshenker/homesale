import { UserId } from "@/opaqueIdTypes";

//Routes
export const accompaniment = "accompaniment";
export const admin = "admin";
export const api = "api";

export const currentuser = "currentuser";
export const users = "users";

//Dynamic routes
export const $userid = "userid";

export const u = (...args: string[]): string => {
    return `/${args.join("/")}`;
};

export const absoluteUrl = (path: string): string => {
    return `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${path}`;
};

//Base routes
const API = {
    [users]: {
        $: u(api, users),
        [currentuser]: {
            $: u(api, users, currentuser),
            [$userid]: (userId: UserId) => ({
                $: u(api, users, currentuser, userId),
            }),
        },
    },
};

const routes = {
    $: "/",
    [api]: API,
};

export default routes;
