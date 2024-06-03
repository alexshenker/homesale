import { Box } from "@mui/material";
import FormDropdownField from "@/components/fields/formfields/FormDropdownField";
import {
    acresField,
    basementField,
    bathroomsField,
    bedroomsField,
    lastRoofReplacementYearField,
    numberOfFloorsField,
    propertyTypeField,
    squareFeetField,
    yearBuiltField,
} from "../PropertyEditForm";
import Space from "@/components/ui/Space";
import Text from "@/components/ui/text/Text";
import FormAmountField from "@/components/fields/formfields/FormAmountField";
import { range } from "lodash";
import FormRadioField from "@/components/fields/formfields/FormRadioField";
import Wrap from "@/components/Wrap";
import { PropertyTypes } from "@prisma/client";

const PropertyDetails = (): JSX.Element => {
    return (
        <Box maxWidth={"600px"}>
            <Wrap cols={2} xsCols={1}>
                <Box maxWidth={"250px"}>
                    <FormDropdownField
                        name={propertyTypeField}
                        label="Property type"
                        options={propertyTypeOptions}
                        required
                    />

                    <Space />

                    <FormAmountField
                        name={squareFeetField}
                        label="Square Footage"
                        endAdornment={
                            <Box padding={1}>
                                <Text fontSize={"12px"}>sq/ft</Text>
                            </Box>
                        }
                    />

                    <Space />

                    <FormAmountField
                        name={acresField}
                        label="Number of Acres"
                    />

                    <Space />

                    <FormDropdownField
                        label="Bedrooms"
                        name={bedroomsField}
                        options={bedroomOptions}
                    />

                    <Space />

                    <FormDropdownField
                        label="Bathrooms"
                        name={bathroomsField}
                        options={bathroomOptions}
                    />
                </Box>

                <Box maxWidth={"250px"}>
                    <FormDropdownField
                        label="Floors"
                        name={numberOfFloorsField}
                        options={floorOptions}
                    />

                    <Space />

                    <FormRadioField
                        name={basementField}
                        options={["No", "Yes"]}
                        row
                        label="Is there a basement?"
                    />

                    <Space />

                    <FormDropdownField
                        label="Year Built"
                        name={yearBuiltField}
                        options={yearOptions}
                    />

                    <Space />

                    <FormDropdownField
                        label="Last Roof Replacement Year"
                        name={lastRoofReplacementYearField}
                        options={yearOptions}
                    />
                </Box>
            </Wrap>
        </Box>
    );
};

export default PropertyDetails;

const maxBedroom = 10;
const bedroomOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, maxBedroom].map((b) => {
    const label = b === 0 ? "Studio" : b === maxBedroom ? `${b}+` : `${b}`;
    return {
        value: b,
        label: label,
    };
});

export type BedroomOption = (typeof bedroomOptions)[number];

export const getBedroomOption = (num: number | null): BedroomOption | null => {
    if (num === null) {
        return null;
    }

    return bedroomOptions.find((b) => b.value === num) ?? null;
};

const maxBathroom = 10;
const bathroomOptions = [
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    maxBathroom,
].map((b) => {
    return {
        value: b,
        label: b === maxBathroom ? `${b}+` : `${b}`,
    };
});

export type BathroomOption = (typeof bathroomOptions)[number];

export const getBathroomOption = (
    num: number | null
): BathroomOption | null => {
    if (num === null) {
        return null;
    }

    return bathroomOptions.find((b) => b.value === num) ?? null;
};

export type YearOption = { label: string; value: number };

export const yearOptions: YearOption[] = range(
    1800,
    new Date().getFullYear() + 1,
    1
)
    .reverse()
    .map((y) => ({ label: `${y}`, value: y }));

export const getYearOption = (year: number | null): YearOption | null => {
    if (year === null) {
        return null;
    }

    return yearOptions.find((y) => y.value === year) ?? null;
};

export type FloorOption = { label: string; value: number };

const maxFloor = 5;
export const floorOptions: FloorOption[] = [1, 2, 3, 4, maxFloor].map((f) => {
    return {
        label: f === maxFloor ? `${f}+` : `${f}`,
        value: f,
    };
});

export const getFloorOption = (floor: number | null): FloorOption | null => {
    if (floor === null) {
        return null;
    }

    return floorOptions.find((y) => y.value === floor) ?? null;
};

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
