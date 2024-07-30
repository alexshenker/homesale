import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import Text from "../ui/text/Text";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import toFullAddress from "@/utils/public/toFullAddress";
import toUSD from "@/utils/public/toUSD";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const PropertyDetails = ({ property }: Props): JSX.Element => {
    useEffect(() => {
        if (property.listing_type === "rent" && property.salePrice !== null) {
            throw new Error("Rent property has sale price");
        }

        if (property.listing_type === "sell" && property.rentPrice !== null) {
            throw new Error("Sell property has rent price");
        }
    }, [property]);

    return (
        <Box padding={2}>
            {property.rentPrice ? (
                <Text variant="h5">{toUSD(property.rentPrice)} / month</Text>
            ) : property.salePrice ? (
                <Text variant="h5">{toUSD(property.salePrice, 0)}</Text>
            ) : (
                <></>
            )}
            <Text variant="h6">{toFullAddress(property)}</Text>
        </Box>
    );
};

export default PropertyDetails;
