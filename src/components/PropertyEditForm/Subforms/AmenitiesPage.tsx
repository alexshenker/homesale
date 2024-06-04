"use client";

import Checkbox from "@/components/fields/Checkbox";
import FormCheckboxField from "@/components/fields/formfields/FormCheckboxField";
import amenityToLabel from "@/utils/constants/amenityToLabel";
import { Box, Stack } from "@mui/material";
import { Amenities } from "@prisma/client";
import { amenitiesField, otherAmenitiesField } from "../PropertyEditForm";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";
import FormTextArea from "@/components/fields/formfields/FormTextArea";
import Space from "@/components/ui/Space";

interface Props {}

const AmenitiesPage = (props: Props): JSX.Element => {
    return (
        <Box>
            <Box maxWidth="300px">
                <FormTextArea
                    name={otherAmenitiesField}
                    label="Additional Amenities"
                    placeholder="Any amenities that aren't listed below..."
                    minRows={2}
                />
            </Box>

            <Space />

            <Box
                gap={3}
                display="flex"
                flexWrap="wrap"
                justifyContent={"start"}
                maxWidth={"750px"}
            >
                {amenityGroups.map((g) => {
                    return (
                        <FormCheckboxField
                            name={amenitiesField}
                            options={groupToOptions(g)}
                            label={g}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default AmenitiesPage;

const amenityGroups = [
    "Laundry",
    "Cooling",
    "Heating",
    "Appliances",
    "Outdoor",
    "Storage",
    "Accessibility",
    "Other",
] as const;

type AmenityGroup = (typeof amenityGroups)[number];

const getAmenityGroup = (a: Amenities): AmenityGroup => {
    const group = amenityGroups.find((g) => a.startsWith(g));

    if (group !== undefined) {
        return group;
    }

    throw new Error(`Amenity '${a}' has no relevant group`);
};

const amenityOptions = Object.values(Amenities).map((amenity) => {
    return {
        group: getAmenityGroup(amenity),
        label: amenityToLabel[amenity],
        value: amenity,
    };
});

export type AmenityOption = (typeof amenityOptions)[number];

export const getAmenityOptionsGrouped = (
    amenities: Amenities[]
): AmenityOption[] => {
    return amenities.map((a) => {
        return {
            group: getAmenityGroup(a),
            label: amenityToLabel[a],
            value: a,
        };
    });
};

const groupToOptions = (group: AmenityGroup): AmenityOption[] => {
    switch (group) {
        case "Laundry": {
            return amenityOptions.filter((o) => o.group === "Laundry");
        }
        case "Cooling": {
            return amenityOptions.filter((o) => o.group === "Cooling");
        }
        case "Heating": {
            return amenityOptions.filter((o) => o.group === "Heating");
        }
        case "Appliances": {
            return amenityOptions.filter((o) => o.group === "Appliances");
        }
        case "Outdoor": {
            return amenityOptions.filter((o) => o.group === "Outdoor");
        }
        case "Storage": {
            return amenityOptions.filter((o) => o.group === "Storage");
        }
        case "Accessibility": {
            return amenityOptions.filter((o) => o.group === "Accessibility");
        }
        case "Other": {
            return amenityOptions.filter((o) => o.group === "Other");
        }
        default: {
            return exhaustiveSwitch(group);
        }
    }
};
