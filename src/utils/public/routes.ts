import { PropertyId, UserId } from "@/opaqueIdTypes";

//Routes
export const accompaniment = "accompaniment";
export const admin = "admin";
export const api = "api";

export const create_new_listing = "create_new_listing";
export const properties = "properties";
export const create_property = "create_property";
export const get_property = "get_property";
export const edit_listing = "edit_listing";

export const address_search = "address_search";
export const Q_address_search_freeform_query = "address_search_freeform_query";

//Dynamic routes
export const $propertyid = "propertyid";

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
    [properties]: {
        [create_property]: {
            $: u(api, properties, create_property),
        },
        [get_property]: {
            [$propertyid]: (propertyId: PropertyId) => {
                return {
                    $: u(api, properties, get_property, propertyId),
                };
            },
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
    [edit_listing]: {
        [$propertyid]: (propertyId: PropertyId) => {
            console.log("propertyId:", propertyId);
            console.log("Generated URL:", u(edit_listing, propertyId));

            return {
                $: u(edit_listing, propertyId),
            };
        },
    },
};

export default routes;
