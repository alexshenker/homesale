import { PropertyId, UserId } from "@/opaqueIdTypes";

//Routes
export const accompaniment = "accompaniment";
export const admin = "admin";
export const api = "api";

export const create_new_listing = "create_new_listing";
export const properties = "properties";
export const create_property = "create_property";
export const update_property = "update_property";
export const get_property = "get_property";
export const edit_listing = "edit_listing";
export const get_users_properties = "get_users_properties";
export const get_signed_urls = "get_signed_urls";
export const upload_property_documents = "upload_property_documents";
export const buy = "buy";
export const rent = "rent";

export const manage = "manage";

export const address_search = "address_search";
export const Q_address_search_freeform_query = "address_search_freeform_query";

//Dynamic routes
export const $propertyid = "propertyid";
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
    [get_signed_urls]: {
        [upload_property_documents]: {
            $: u(api, get_signed_urls, upload_property_documents),
        },
    },
    [properties]: {
        [create_property]: {
            $: u(api, properties, create_property),
        },
        [update_property]: {
            $: u(api, properties, update_property),
        },
        [get_property]: {
            [$propertyid]: (propertyId: PropertyId) => {
                return {
                    $: u(api, properties, get_property, propertyId),
                };
            },
        },
        [get_users_properties]: {
            [$userid]: (userId: UserId) => {
                return {
                    $: u(api, properties, get_users_properties, userId),
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
            return {
                $: u(edit_listing, propertyId),
            };
        },
    },
    [manage]: {
        $: u(manage),
    },
    [buy]: {
        $: u(buy),
    },
    [rent]: {
        $: u(rent),
    },
};

export default routes;
