import { Box, Divider } from "@mui/material";
import Image from "next/image";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import PropertyDetails from "./PropertyDetails";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const PropertyView = ({ property }: Props): JSX.Element => {
    return (
        <Box>
            <Box padding={2} flex={1}>
                {property.primaryPhoto && (
                    <Box
                        position={"relative"}
                        minHeight={"300px"}
                        width={"100%"}
                        height={"100%"}
                    >
                        <Image
                            src={property.primaryPhoto}
                            alt="primary photo"
                            fill
                            objectFit="contain"
                        />
                    </Box>
                )}
            </Box>

            <Divider orientation="vertical" flexItem />

            <PropertyDetails property={property} />
        </Box>
    );
};

export default PropertyView;
