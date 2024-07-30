import Button from "@/components/ui/button/Button";
import usePublishProperty from "@/lib/hooks/properties/usePublishProperty";
import useUnpublishProperty from "@/lib/hooks/properties/useUnpublishProperty";
import { Box } from "@mui/material";
import { FormState } from "react-hook-form";
import { PropertyForm } from "../PropertyEditForm";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import { useBoolean } from "usehooks-ts";
import useToast from "@/components/ui/Toast/useToast";

interface Props {
    formState: FormState<PropertyForm>;
    property: NonNullable<GetPropertyRes>;
}

const Preview = (props: Props): JSX.Element => {
    const publish = usePublishProperty();
    const unpublish = useUnpublishProperty();
    const toast = useToast();
    const loading = useBoolean();

    const callPublish = async () => {
        if (!props.formState.isValid) {
            toast.error("Form is incomplete");
            return;
        }

        if (props.property.published) {
            toast.error("Property is already published");
            return;
        }

        try {
            await publish(props.property.id);

            loading.setTrue();
        } catch {
            toast.error("Failed to publish");
        } finally {
            loading.setFalse();
        }
    };

    const callUnpublish = async () => {
        if (props.property.published === false) {
            toast.error("Property is already unpublished");
            return;
        }

        try {
            await unpublish(props.property.id);

            loading.setTrue();
        } catch {
            toast.error("Failed to unpublish");
        } finally {
            loading.setFalse();
        }
    };

    return (
        <Box display="flex">
            <Box></Box>

            <Box>
                {props.property.published ? (
                    <Button onClick={callPublish}>Unpublish</Button>
                ) : (
                    <Button
                        disabled={props.formState.isValid === false}
                        onClick={callUnpublish}
                    >
                        Publish
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Preview;
