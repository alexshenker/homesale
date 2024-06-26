"use client";

import FormFileField from "@/components/fields/formfields/FormFileField";
import { Box, Stack } from "@mui/material";
import {
    creatorConfirmedPermissionField,
    deedDocumentField,
    ownerFirstnameField,
    ownerIDBackField,
    ownerIDFrontField,
    ownerLastnameField,
    ownerMiddlenameField,
} from "../PropertyEditForm";
import FormCheckboxField from "@/components/fields/formfields/FormCheckboxField";
import Text from "@/components/ui/text/Text";
import { useState } from "react";
import LinkText from "@/components/ui/text/LinkText/LinkText";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import { format } from "date-fns";
import Space from "@/components/ui/Space";
import FormTextField from "@/components/fields/formfields/FormTextField";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const Documents = (props: Props): JSX.Element => {
    return (
        <Box>
            <Stack>
                <FormCheckboxField
                    name={creatorConfirmedPermissionField}
                    disabled={
                        props.property
                            .creator_confirmed_management_permission === true
                    }
                    label={
                        <Box maxWidth={"300px"}>
                            <Text>Are you the owner of this property?</Text>

                            <Text>
                                If not, do you have permission from the owner/s
                                to manage it?
                            </Text>

                            <Text type="danger">
                                *Note, once checked & saved, this cannot be
                                undone*
                            </Text>
                        </Box>
                    }
                    options={confirmPermissionOptions}
                />
                {props.property.creator_confirmed_management_permission &&
                    props.property
                        .creator_confirmed_management_permission_on_date && (
                        <Text>
                            Confirmed on{" "}
                            {format(
                                props.property
                                    .creator_confirmed_management_permission_on_date,
                                "MMMM do, yyyy"
                            )}
                        </Text>
                    )}
            </Stack>

            <Space />

            <Box>
                <Text>
                    Provide the owner's information as it appears on the Deed
                </Text>
                <Space h={5} />
                <Stack width={"300px"} gap={1}>
                    <FormTextField
                        name={ownerFirstnameField}
                        label="Owner's First Name"
                        required
                    />

                    <FormTextField
                        name={ownerMiddlenameField}
                        label="Owner's Middle Name"
                    />

                    <FormTextField
                        name={ownerLastnameField}
                        label="Owner's Last Name"
                        required
                    />
                </Stack>
            </Box>

            <Space />

            <Box width="100%" maxWidth={"300px"} minWidth="175px">
                <FormFileField
                    name={deedDocumentField}
                    label="Upload Property Deed"
                />
            </Box>

            <Space />

            <Box display="flex" flexWrap={"wrap"} gap={"8px"} maxWidth="608px">
                <Box width={"300px"}>
                    <FormFileField
                        name={ownerIDFrontField}
                        label="Owner ID Front"
                    />
                </Box>

                <Box width={"300px"}>
                    <FormFileField
                        name={ownerIDBackField}
                        label="Owner ID Back"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Documents;

export const confirmPermissionOptions = [
    { label: "Yes, I am the owner or have permission from the owner/s" },
] as const;

export type ConfirmPermissionOption = typeof confirmPermissionOptions;
