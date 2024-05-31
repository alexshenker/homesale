import { UserId } from "@/opaqueIdTypes";

//Routes
export const accompaniment = "accompaniment";
export const admin = "admin";
export const api = "api";

export const currentuser = "currentuser";
export const users = "users";
export const create_new_listing = "create_new_listing";
export const properties = "properties";
export const create = "create";

export const address_search = "address_search";
export const Q_address_search_freeform_query = "address_search_freeform_query";

//Dynamic routes
export const $userid = "userid";

export const u = (...args: string[]): string => {
    return `/${args.join("/")}`;
};

function Q(url: string, params: { [key: string]: string[] }): string {
    if (Object.keys(params).length === 0) {
        return url;
    }

    const queryString = Object.keys(params)
        .map((key) => {
            return params[key].map((val) => `${key}=${val}`).join("&");
        })
        .join("&");

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${queryString}`;
}

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
    [properties]: {
        [create]: {
            $: u(api, properties, create),
        },
    },
    [address_search]: (searchQuery?: string) => {
        if (searchQuery) {
            return {
                $: Q(u(api, address_search), {
                    [Q_address_search_freeform_query]: [searchQuery],
                }),
            };
        } else {
            return {
                $: u(api, address_search),
            };
        }
    },
};

const routes = {
    $: "/",
    [api]: API,
    [create_new_listing]: {
        $: u(create_new_listing),
    },
};

export default routes;
