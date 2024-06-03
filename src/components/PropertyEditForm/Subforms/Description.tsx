"use client";

import FormTextArea from "@/components/fields/formfields/FormTextArea";
import { Box } from "@mui/material";
import { descriptionField } from "../PropertyEditForm";

const Description = (): JSX.Element => {
    return (
        <Box>
            <FormTextArea
                name={descriptionField}
                label="Describe your property in great detail"
                minRows={5}
                placeholder="Charming 3-bedroom, 2-bathroom house with open-plan living, modern kitchen, cozy fireplace, landscaped backyard, and convenient location near schools and shopping..."
            />
        </Box>
    );
};

export default Description;
