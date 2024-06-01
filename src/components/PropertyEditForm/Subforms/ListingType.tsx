import FormRadioField from "@/components/fields/formfields/FormRadioField";
import Button from "@/components/ui/button/Button";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import { formProps } from "@/utils/constants/formProps";
import { Box } from "@mui/material";
import { ListingType as ListingTypeT } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    property: NonNullable<GetPropertyRes>;
} & (
    | {
          nextPage: () => void;
          previousPage: () => void;
      }
    | {
          nextPage?: undefined;
          previousPage: () => void;
      }
    | {
          nextPage: () => void;
          previousPage?: undefined;
      }
);

const listingTypeField = "listingType";

interface Form {
    [listingTypeField]: ListingTypeT | null;
}

const ListingType = ({
    property,
    nextPage,
    previousPage,
}: Props): JSX.Element => {
    const methods = useForm<Form>({
        ...formProps,
        defaultValues: {
            [listingTypeField]: property.listing_type,
        },
    });

    const { formState } = methods;

    return (
        <div>
            <FormProvider {...methods}>
                <FormRadioField
                    name={listingTypeField}
                    options={Object.values(ListingTypeT)}
                    required
                />
            </FormProvider>

            <Box display="flex" justifyContent={"space-between"}>
                {previousPage ? (
                    <Button onClick={previousPage}>Previous Page</Button>
                ) : (
                    <Button disabled>Previous Page</Button>
                )}
                {nextPage ? (
                    <Button onClick={nextPage} disabled={!formState.isValid}>
                        Next Page
                    </Button>
                ) : (
                    <Button disabled>Next Page</Button>
                )}
            </Box>
        </div>
    );
};

export default ListingType;
