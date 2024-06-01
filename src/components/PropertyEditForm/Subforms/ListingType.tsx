import FormRadioField from "@/components/fields/formfields/FormRadioField";
import { ListingType as ListingTypeT, PropertyTypes } from "@prisma/client";
import { Box } from "@mui/material";
import { listingTypeField, propertyTypeField } from "../PropertyEditForm";
import FormDropdownField from "@/components/fields/formfields/FormDropdownField";

const ListingType = (): JSX.Element => {
    return (
        <Box>
            <FormRadioField
                name={listingTypeField}
                options={Object.values(ListingTypeT)}
                required
            />

            <Box width={"200px"}>
                <FormDropdownField
                    name={propertyTypeField}
                    label="Property type"
                    options={propertyTypeOptions}
                    required
                />
            </Box>
        </Box>
    );
};

export default ListingType;

export type PropertyTypeOption = { value: PropertyTypes; label: string };

export const propertyTypeOptions: PropertyTypeOption[] = [
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "coop", label: "Coop" },
    { value: "house", label: "House" },
    { value: "multi_family_home", label: "Multifamily home" },
    { value: "duplex", label: "Duplex" },
    { value: "triplex", label: "Triplex" },
    { value: "townhouse", label: "Townhouse" },
    // { value: "land", label: "Land" },
    // { value: "commercial_property", label: "Commercial Property" },
    // { value: "industrial_property", label: "Industrial Property" },
];

export const getPropertyTypeOption = (
    propType: PropertyTypes | null
): PropertyTypeOption | null => {
    if (propType === null) {
        return null;
    }

    return propertyTypeOptions.find((p) => p.value === propType) ?? null;
};
