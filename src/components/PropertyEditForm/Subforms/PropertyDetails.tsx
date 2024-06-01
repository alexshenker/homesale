import { Box } from "@mui/material";
import FormDropdownField from "@/components/fields/formfields/FormDropdownField";
import {
    bathroomsField,
    bedroomsField,
    squareFeetField,
} from "../PropertyEditForm";
import FormTextField from "@/components/fields/formfields/FormTextField";
import Space from "@/components/ui/Space";
import Text from "@/components/ui/text/Text";

const PropertyDetails = (): JSX.Element => {
    return (
        <Box>
            <Box width="125px">
                <FormTextField
                    name={squareFeetField}
                    label="Square Footage"
                    rules={{
                        validate: {
                            isNumber: (v) => {
                                const numberPattern = /^(0|[1-9]\d*)(\.\d+)?$/;
                                return numberPattern.test(v)
                                    ? true
                                    : "Please enter a valid number";
                            },
                        },
                    }}
                    endAdornment={
                        <Box padding={1}>
                            <Text fontSize={"12px"}>sq/ft</Text>
                        </Box>
                    }
                />

                <Space />

                <FormDropdownField
                    label="Bedrooms"
                    name={bedroomsField}
                    options={bedroomsOptions}
                    disableClearable
                />

                <Space />

                <FormDropdownField
                    label="Bathrooms"
                    name={bathroomsField}
                    options={bathroomOptions}
                    disableClearable
                />
            </Box>
        </Box>
    );
};

export default PropertyDetails;

const bedroomsOptions = [
    { value: 0, label: "Studio" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10+" },
] as const;

export type BedroomOption = (typeof bedroomsOptions)[number];

export const getBedroomOption = (num: number | null): BedroomOption | null => {
    if (num === null) {
        return null;
    }

    return bedroomsOptions.find((b) => b.value === num) ?? null;
};

const bathroomOptions = [
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
    { value: 2.5, label: "2.5" },
    { value: 3, label: "3" },
    { value: 3.5, label: "3.5" },
    { value: 4, label: "4" },
    { value: 4.5, label: "4.5" },
    { value: 5, label: "5" },
    { value: 5.5, label: "5.5" },
    { value: 6, label: "6" },
    { value: 6.5, label: "6.5" },
    { value: 7, label: "7" },
    { value: 7.5, label: "7.5" },
    { value: 8, label: "8" },
    { value: 8.5, label: "8.5" },
    { value: 9, label: "9" },
    { value: 9.5, label: "9.5" },
    { value: 10, label: "10+" },
];

export type BathroomOption = (typeof bathroomOptions)[number];

export const getBathroomOption = (
    num: number | null
): BathroomOption | null => {
    if (num === null) {
        return null;
    }

    return bathroomOptions.find((b) => b.value === num) ?? null;
};
