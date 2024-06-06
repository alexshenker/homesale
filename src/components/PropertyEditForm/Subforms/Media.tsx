import FileField from "@/components/fields/fileField/FileField";
import FormFileField from "@/components/fields/formfields/FormFileField";
import { imgExtensions } from "@/utils/constants/extensions";
import { Box } from "@mui/material";
import { FC, useState } from "react";
import { mainPhotoSrcField } from "../PropertyEditForm";

interface Props {}

const Media = (props: Props): JSX.Element => {
    return (
        <Box>
            <FormFileField name={mainPhotoSrcField} accept={imgExtensions} />
        </Box>
    );
};

export default Media;
