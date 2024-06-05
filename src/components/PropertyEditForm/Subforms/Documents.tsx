"use client";

import FormFileField from "@/components/fields/formfields/FormFileField";
import { Box, Stack } from "@mui/material";
import {
    PropertyForm,
    creatorConfirmedPermissionField,
    deedDocumentField,
    ownerIDBackField,
    ownerIDFrontField,
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
    const [enablePermissionEdit, setEnablePermissionEdit] = useState(false);

    return (
        <Box>
            <Stack>
                <FormCheckboxField
                    name={creatorConfirmedPermissionField}
                    disabled={
                        enablePermissionEdit === false ||
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
                            {props.property
                                .creator_confirmed_management_permission !==
                                true && (
                                <LinkText
                                    onClick={() =>
                                        setEnablePermissionEdit(
                                            !enablePermissionEdit
                                        )
                                    }
                                    sx={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    Edit
                                </LinkText>
                            )}
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

            <Box width="100%" maxWidth={"300px"} minWidth="175px">
                <FormFileField
                    name={deedDocumentField}
                    label="Upload Property Deed"
                />
            </Box>

            <Space />

            <Box display="flex" flexWrap={"wrap"} gap={1} maxWidth="500px">
                <Box width={"45%"}>
                    <FormFileField
                        name={ownerIDFrontField}
                        label="Owner ID Front"
                    />
                </Box>

                <Box width={"45%"}>
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
