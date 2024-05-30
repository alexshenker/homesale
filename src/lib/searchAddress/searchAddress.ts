import routes, {
    absoluteUrl,
    address_search,
    api,
} from "@/utils/public/routes";
import z from "zod";

const HouseNumber = z.string().refine((v) => /^\d+$/.test(v), {
    message: "house number must be an integer string",
});

const PostalCode = z
    .string()
    .length(5)
    .refine((v) => /^\d+$/.test(v), {
        message: "postal code must be an integer string",
    });

const NominatimAddress = z.object({
    country: z.string(),
    county: z.string().optional(),
    borough: z.string().optional(),
    city: z.string().optional(),
    house_number: HouseNumber.optional(),
    postcode: PostalCode.optional(),
    road: z.string().optional(),
    state: z.string(),
});

const NominatimPlace = z.object({
    address: NominatimAddress,
    type: z.string(), //house, //residential, ...etc
    place_id: z.number().int(),
});

const NominatimResponse = NominatimPlace.array();

export type NominatimResponse = z.infer<typeof NominatimResponse>;

const searchAddress = async (
    searchQuery: string
): Promise<NominatimResponse> => {
    if (searchQuery.length < 2) {
        return [];
    }

    const res = await fetch(
        absoluteUrl(routes[api][address_search](searchQuery).$)
    );

    if (!res.ok) {
        throw new Error(`[${searchAddress}]: Failed to search address`);
    }

    const data = await res.json();

    const parsed = NominatimResponse.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(
            `[${searchAddress}]: Failed to parse: ${JSON.stringify(data.error)}`
        );
    }
};

export default searchAddress;
