import FileField from "@/components/fields/fileField/FileField";
import FormFileField from "@/components/fields/formfields/FormFileField";
import { imgExtensions } from "@/utils/constants/extensions";
import { Box } from "@mui/material";
import { FC, useState } from "react";
import { mainPhotoSrcField } from "../PropertyEditForm";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";

interface Props {
    property: NonNullable<GetPropertyRes>;
}

const Media = (props: Props): JSX.Element => {
    const [primaryPhoto, setPrimaryPhoto] = useState<File | null>(null);

    return (
        <Box>
            <FileField
                value={primaryPhoto}
                onChange={setPrimaryPhoto}
                accept={imgExtensions}
                label="test"
            />
        </Box>
    );
};

export default Media;
