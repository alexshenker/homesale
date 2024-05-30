import routes, {
    absoluteUrl,
    address_search,
    api,
} from "@/utils/public/routes";
import z from "zod";

const featureTypes = [
    "country",
    "region",
    "postcode",
    "district",
    "place",
    "locality",
    "neighborhood",
    "street",
    "address",
] as const;

const FeatureType = z.enum(featureTypes);
type FeatureType = (typeof featureTypes)[number];

const Properties = z.object({
    mapbox_id: z.string(), //Same exact string as MapboxPlace.id
    feature_type: FeatureType,
    name: z.string(), //228 Johnson avenue
    place_formatted: z.string(), //Brooklyn, New York 11231, United States
    full_address: z.string(), //name & place_formatted combined
});

const MapboxPlace = z.object({
    id: z.string(), //Same exact string as MapboxPlace.properties.mapbox_id
    properties: Properties,
    type: z.string(), //Feature
});

const MapboxResponse = z.object({
    type: z.string(),
    features: MapboxPlace.array(),
    attribution: z.string(),
});

export type MapboxResponse = z.infer<typeof MapboxResponse>;

const searchAddress = async (searchQuery: string): Promise<MapboxResponse> => {
    const res = await fetch(
        absoluteUrl(routes[api][address_search](searchQuery).$)
    );

    if (!res.ok) {
        throw new Error(`[${searchAddress}]: Failed to search address`);
    }

    const data = await res.json();

    const parsed = MapboxResponse.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(
            `[${searchAddress}]: Failed to parse: ${JSON.stringify(data.error)}`
        );
    }
};

export default searchAddress;
